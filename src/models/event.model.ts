import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export interface IEvent extends Document {
  bookingUrl: string,
  title: string;
  date: Date;
  startTime: Date;
  endTime?: Date;
  venue: {
    state: string;
    address: string;
    city: string;
  };
  category: string;
  price: number;
  description: string;
  termsAndConditions: string[];
  images: {
    banner: string;
    gallery: string[];
  };
  organizer: {
    name: string;
    contact: string;
  };
  totalSeats: number;
  availableSeats: number;
  isActive: boolean;
  isPublic: boolean;
  language?: string;
  ageRequirement?: number;
}
const eventSchema = new Schema<IEvent>(
  {
    bookingUrl: {
      type: String,
      default: uuidv4(),
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
    },
    venue: {
      state: {
        type: String,
        required: true,
        trim: true,
      },
      address: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
    },
    category: {
      type: String,
      enum: ["Music", "Theater", "Workshop", "Sports", "Comedy", "Conference", "Exhibition", "Festival", "Online", "Movies", "Nightlife", "Lifestyle"],
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    termsAndConditions: [
      {
        type: String,
        trim: true,
      },
    ],
    images: {
      banner: {
        type: String,
        required: true,
      },
      gallery: [
        {
          type: String,
        },
      ],
    },
    organizer: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      contact: {
        type: String,
        required: true,
      },
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
    isPublic: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
    },
    ageRequirement: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
