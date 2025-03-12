import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  date: Date;
  startTime: Date;
  endTime: Date;
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
  language: string;
  ageRequirement: number;
}
const eventSchema = new Schema<IEvent>(
  {
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
      required: true,
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
      enum: ["Music", "Theater", "Workshop"],
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
      default: true,
    },
    language: {
      type: String,
      required: true,
    },
    ageRequirement: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
