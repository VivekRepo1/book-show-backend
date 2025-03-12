import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  eventName: string;
  eventVenue: string;
  city: string;
  state: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const listYourEventSchema = new Schema<IEvent>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    eventVenue: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ListYourEvent = mongoose.model<IEvent>(
  "ListYourEvent",
  listYourEventSchema,
);

export default ListYourEvent;
