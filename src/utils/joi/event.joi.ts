import Joi from "joi";

// Define TypeScript interface for the event
import { IEvent } from "models/event.model";

// Joi validation schema
const eventJoiSchema = Joi.object<IEvent>({
  title: Joi.string().trim().required(),
  startTime: Joi.date().required(),
  endTime: Joi.date().greater(Joi.ref("startTime")),
  venue: Joi.object({
    state: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
  }).required(),
  category: Joi.string().trim().required(),
  price: Joi.number().required(),
  description: Joi.string().trim().required(),
  termsAndConditions: Joi.array().items(Joi.string().trim()),
  images: Joi.object({
    banner: Joi.string().uri().required(),
    gallery: Joi.array().items(Joi.string().uri()),
  }).required(),
  organizer: Joi.object({
    name: Joi.string().trim().required(),
    contact: Joi.string().required(),
  }).required(),
  totalSeats: Joi.number().required(),
  availableSeats: Joi.number().min(0).required(),
  isActive: Joi.boolean().default(true),
  isPublic: Joi.boolean().default(true),
  language: Joi.string(),
  ageRequirement: Joi.number()
});

export { IEvent, eventJoiSchema };
