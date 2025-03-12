import { Request, Response } from "express";
import { google } from "googleapis";
import nodemailer from "nodemailer";

const CREDENTIALS_PATH = "./src/credentials.json";

const SHEET_ID = "1lZ_S7SANZcbR-5Cso4sRWuWpDLOqHRl_u6JckgSEk1o"; // Replace with your actual Google Sheet ID

const authenticateGoogleSheets = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
};

const ADMIN_EMAIL = "bjatinkaushik@gmail.com"; // Replace with recipient email
const SENDER_EMAIL = ".jatin221003@gmail.com"; // Replace with sender email
const SENDER_PASSWORD = "bgpq ftor tdhr iifw"; // Use an app password for security

const sendEmailNotification = async (eventDetails: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Event Registration" <${SENDER_EMAIL}>`,
    to: ADMIN_EMAIL,
    subject: "New Event Registration Request",
    text: `Request for listing a new event:\n\n${eventDetails}`,
  };

  await transporter.sendMail(mailOptions);
};

export const registerEventController = async (req: Request, res: Response) => {
  try {
    const {
      city,
      email,
      endDate,
      eventName,
      eventVenue,
      name,
      phoneNumber,
      startDate,
      state,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !phoneNumber ||
      !eventName ||
      !eventVenue ||
      !city ||
      !state ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Authenticate and get the Google Sheets instance
    const sheets = await authenticateGoogleSheets();

    // Define the data to be added
    const values = [
      [
        name,
        email,
        phoneNumber,
        eventName,
        eventVenue,
        city,
        state,
        startDate,
        endDate,
        new Date().toISOString(),
      ],
    ];

    // Append data to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:J",
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });

    const eventDetails = `
    Name: ${name}
    Email: ${email}
    Phone: ${phoneNumber}
    Event: ${eventName}
    Venue: ${eventVenue}
    City: ${city}
    State: ${state}
    Start Date: ${startDate}
    End Date: ${endDate}
  `;

    // Send email notification
    await sendEmailNotification(eventDetails);

    return res.status(201).json({
      success: true,
      message: "Event registered successfully in Google Sheets",
    });
  } catch (error) {
    console.error("Error registering event:", error);
    return res.status(500).json({
      success: false,
      message: "Error in registering Event",
    });
  }
};
