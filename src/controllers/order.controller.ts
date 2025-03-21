import { Request, Response } from "express";
import Order from "../models/order.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { orderJoiSchema } from "../utils/joi/order.joi";
import { razorpay } from "../services/razorpay.service";
import { validatePayment } from "../utils/razorpay.utils";
import { generateEventTicketBuffer } from "../services/generateTicket.service";
import { sendMail } from "../utils/nodeMailer";
import TicketCategory from "../models/ticketCategory.model";

export const create = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      phone,
      city,
      // address,
      state,
      eventId,
      tickets,
      promotionalDiscount,
    } = req.body;

    let amount = 0;
    const { error } = orderJoiSchema.validate(req.body, { abortEarly: false });

    if (error) {
      throw new ApiError(
        400,
        "Error in data validation",
        error.details.map((err) => err.message)
      );
    }

    const ticketAvailability = await Promise.all(
      tickets.map(async (item: any) => {
        const { ticketCategoryId, qty, price } = item;
        amount += qty * price;
        const ticketCategory = await TicketCategory.findById(ticketCategoryId);
        if (!ticketCategory) {
          throw new ApiError(
            400,
            `Please verify if ticketId ${ticketCategoryId} exists`
          );
        }
        if (ticketCategory.eventId !== eventId) {
          throw new ApiError(400, "ticket belongs to different event");
        }
        if (ticketCategory.availableSeats < qty) {
          return false;
        }
        return ticketCategory;
      })
    );

    const allAvailable = ticketAvailability.every((item) => item);
    if (!allAvailable) {
      throw new ApiError(
        400,
        "Order could not be processed due to ticket unavailability."
      );
    }

    await Promise.all(
      ticketAvailability.map(async (ticketCategory, index) => {
        const { qty } = tickets[index];
        ticketCategory.availableSeats -= qty;
        await ticketCategory.save();
      })
    );

    const options: any = {
      amount: amount * 100,
      currency: "INR",
    };

    const response = await razorpay.orders.create(options);
    const { id: orderId } = response;

    const order = await Order.create({
      orderId,
      name,
      email,
      phone,
      city,
      state,
      amount,
      tickets,
      eventId,
      promotionalDiscount,
    });

    if (!order) {
      throw new ApiError(500, "server error while creating order");
    }

    res
      .status(200)
      .json(new ApiResponse(200, order, "order created successfully"));
  } catch (error) {
    console.log("error while creating order", error);
    throw new ApiError(500, "server error while creating order");
  }
};

export const update = async (req: Request, res: Response) => {
  console.log(req.params);
  //   TODO:
  res.status(201).json(new ApiResponse(201, {}, "Order created successfully"));
};

export const getAll = async (req: Request, res: Response) => {
  console.log(req.params);
  //   TODO:
  res.status(201).json(new ApiResponse(201, {}, "Order created successfully"));
};

export const getOne = async (req: Request, res: Response) => {
  console.log(req.params);
  //   TODO:
  res.status(201).json(new ApiResponse(201, {}, "Order created successfully"));
};

export const getTickets = async (req: Request, res: Response) => {
  const { orderId } = req.params;

  if (!orderId) {
    throw new ApiError(400, "order id is required");
  }

  const order = await Order.findById(orderId)
    .populate({
      path: "tickets.ticketCategoryId",
      model: "TicketCategory",
      select: "category price disclaimer", // Select only required fields
    })
    .populate({
      path: "eventId",
      model: "Event",
      select: "title startTime venue organizer", // Select only required fields
    });

  console.log(order);
  if (!order) {
    throw new ApiError(400, "order could not be found");
  }

  const { name, email, phone, tickets } = order;
  const { title: eventTitle, startTime, venue } = order.eventId as any;

  const ticketData = await Promise.all(
    tickets.map(async (ticket) => {
      const { qty, ticketPrice } = ticket;
      console.log(ticket);
      const {category} = ticket.ticketCategoryId as any;
      const ticketData =  {
        category,
        qty,
        ticketPrice,
        qrData: "https://bookshow.online/ticket/12345",
      };

      return ticketData;
    })

  );

  const responseObj = {name, email, phone, eventTitle, startTime, venue, ticketData}

  res
    .status(200)
    .json(new ApiResponse(201, responseObj, "tickets fetched successfully"));
};



export const verifyPayment = async (req: Request, res: Response) => {
  const { orderId, paymentId, signature } = req.body;
  const status = validatePayment(orderId, paymentId, signature);

  if (!status) {
    throw new ApiError(400, "payment could not be verified");
  }

  const order = await Order.findOne({ orderId });
  if (!order) {
    throw new ApiError(400, "no corresponding order found");
  }

  order.paymentStatus = "success";
  order.save();


  
  const ticketData = {
    title: "Opportunities in E-commerce",
    date: "21th Dec, 2024",
    time: "10:00 AM",
    venue: "Ch. Ranbir Singh Auditorium, GJU, Hisar",
    name: "Md Rizwan",
    mobile: "9876543456",
    tickets: "1",
    amount: "499",
    qrData: "https://bookshow.online/ticket/12345",
  };

  const ticketBuffer = await generateEventTicketBuffer(ticketData);

  const attachments = [
    {
      filename: "event-ticket.png",
      content: ticketBuffer,
    },
  ];

  await sendMail(
    "successfulBooking",
    {
      subject: { event: "" },
      html: { event: "", name: "", platformProvider: "" },
    },
    "gargdeepanshu40@gmail.com",
    attachments
  );

  res
    .status(200)
    .json(new ApiResponse(201, order, "payment verified successfully"));
};
// Example Data
// const eventData = {
//   title: 'Opportunities in E-commerce',
//   date: '21th Dec, 2024',
//   time: '10:00 AM',
//   venue: 'Ch. Ranbir Singh Auditorium, GJU, Hisar',
//   name: 'Md Rizwan',
//   mobile: '9876543456',
//   tickets: '1',
//   amount: '499',
//   qrData: 'https://bookshow.online/ticket/12345',
// };
