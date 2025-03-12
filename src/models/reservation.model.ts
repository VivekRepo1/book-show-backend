import mongoose, { Document, Schema } from "mongoose";

// Enum for ticket status
export enum TicketStatus {
  PENDING = "pending",
  ATTENDED = "attended",
}

// Interface for ticket number object
export interface ITicket {
  seatNumber: string;
  status: TicketStatus;
  attendedAt?: Date;
  updatedAt: Date;
}

// Interface for the ticket document
export interface IReservation extends Document {
  name: string;
  mobileNumber: string;
  zone: string;
  tickets: ITicket[];
  ticketCategory: string;
  qrCode: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Schema for ticket number
const ticketSchema = new Schema<ITicket>({
  seatNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(TicketStatus),
    default: TicketStatus.PENDING,
  },
  attendedAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Main ticket schema
const reservationSchema = new Schema<IReservation>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    zone: {
      type: String,
      required: true,
    },
    tickets: [ticketSchema],
    ticketCategory: {
      type: String,
      required: true,
    },
    qrCode: {
      type: String, // Base64 string representation of the QR code image
      required: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Create and export the model
export const Reservation = mongoose.model<IReservation>(
  "Reservation",
  reservationSchema,
);
