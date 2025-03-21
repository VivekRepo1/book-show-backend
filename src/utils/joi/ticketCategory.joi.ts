import Joi from "joi";

import { ITicketCategory } from "../../models/ticketCategory.model";

export const ticketCategoryCreateSchema = Joi.object<ITicketCategory>({
  category: Joi.string().trim().required(),
  price: Joi.number().required(),
  totalSeats: Joi.number().required(),
  availableSeats: Joi.number().required(),
  isActive: Joi.boolean().default(false),
  disclaimer: Joi.string().trim().allow(null),
  eventId: Joi.string().required(),

});

interface ITicketCategoryUpdate extends ITicketCategory {
  categoryId: String;
}

export const ticketCategoryUpdateSchema = Joi.object<ITicketCategoryUpdate>({
  category: Joi.string().trim().optional().invalid(null),
  price: Joi.number().optional().invalid(null),
  totalSeats: Joi.number().optional().invalid(null),
  availableSeats: Joi.number().optional().invalid(null),
  isActive: Joi.boolean().optional().invalid(null),
  disclaimer: Joi.array().optional().invalid(null),
  categoryId: Joi.string().required()
});


