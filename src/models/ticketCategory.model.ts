import mongoose, { Schema, model } from "mongoose";

export interface ITicketCategory {
  category: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  isActive: boolean;
  disclaimer: string;
  eventId: mongoose.Schema.Types.ObjectId;
}

const ticketCategorySchema = new Schema<ITicketCategory>(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    disclaimer: {
      type: String,
      trim: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Event,
      required: true,
    },
  },
  { timestamps: true }
);

const TicketCategory = model("TicketCategory", ticketCategorySchema);

export default TicketCategory;
