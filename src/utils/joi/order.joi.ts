import Joi from "joi";

import { IOrder, ITicketDetail } from "../../models/order.model";



export const ticketDetailSchema = Joi.object<ITicketDetail>({
  ticketCategoryId: Joi.string().required(),
  qty: Joi.number().required(),
  ticketPrice: Joi.number().required()
})

export const orderJoiSchema = Joi.object<IOrder>({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  // address: Joi.string().trim().required(),
  city: Joi.string().trim().required(),
  state: Joi.string().trim().required(),
  amount: Joi.number().required(),
  paymentStatus: Joi.string().valid("pending", "success", "failed").default("pending"),
  eventId: Joi.string().required(),
  tickets: Joi.array().items(ticketDetailSchema),
  promotionalDiscount: Joi.number().required(),
})

