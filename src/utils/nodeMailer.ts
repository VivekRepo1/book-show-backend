import nodemailer from "nodemailer";
import Handlebars from "handlebars";

import { emailTemplates } from "../constant";

interface EmailData {
  subject?: object;
  html?: object;
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.ethereal.email",
  port: Number(process.env.EMAIL_PORT) || 587,
  auth: {
    user: process.env.EMAIL_ADDRESS || "holden.little8@ethereal.email",
    pass: process.env.EMAIL_PASSWORD || "6D3G3dJu1wmskUyZD7",
  },
});

// Function to send an email
async function sendMail(
  type: keyof typeof emailTemplates,
  data: EmailData,
  recipientMail: string,
): Promise<void> {
  try {
    const subjectTemplate = Handlebars.compile(emailTemplates[type].subject);
    const textTemplate = Handlebars.compile(emailTemplates[type].text);
    const htmlTemplate = Handlebars.compile(emailTemplates[type].html);

    const subjectResult = subjectTemplate(data.subject || {});
    const textResult = textTemplate(data.html || {});
    const htmlResult = htmlTemplate(data.html || {});

    // Send mail
    await transporter.sendMail({
      from: `"Book Show 👻" <${process.env.EMAIL_ADDRESS}>`, // sender address
      to: recipientMail, // recipient email
      subject: subjectResult, // subject
      text: textResult, // plain text body
      html: htmlResult, // html body
    });

    console.log(`Email sent to ${recipientMail}`);
  } catch (error) {
    console.error("Error occurred while sending mail:", error);
    throw error;
  }
}

export { sendMail };
