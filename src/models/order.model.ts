import { Schema, model } from "mongoose";
import TicketCategory from "./ticketCategory.model";
import Event from "./event.model";

export interface ITicketDetail {
  ticketCategoryId: string;
  qty: string;
  ticketPrice: number;
}

export interface IOrder {
  orderId: string;
  name: string;
  email: string;
  phone: string;
  // address: string;
  city: string;
  state: string;
  amount: number;
  currency: string;
  paymentStatus: string;
  paymentRemarks: {
    paymentAuthorized:Date,
    paymentCaptured:Date,
    paymentFailed:Date,
    paymentRefunded:Date,
    paymentDispute:Date,
    paymentDisputeOutcome:Date,
    },
  eventId: Schema.Types.ObjectId;
  tickets: ITicketDetail[];
  promotionalDiscount: number;
}

const orderSchema = new Schema<IOrder>(
  {
    orderId: {
      type: String,
      required: true,
      trim: true,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: Event,
      required: true,
    },
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
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    // address: {
    //   type: String,
    //   required: true,
    //   trim: true
    // },
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
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["INR"],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    paymentRemarks: {
      paymentAuthorized: {
        type: Date,
        default: null,
      },
      paymentCaptured: {
        type: Date,
        default: null,
      },
      paymentFailed: {
        type: Date,
        default: null,
      },
      paymentRefunded: {
        type: Date,
        default: null,
      },
      paymentDispute: {
        type: Date,
        default: null,
      },
      paymentDisputeOutcome: {
        type: Date,
        default: null,
      },
    },
    tickets: [
      {
        ticketCategoryId: {
          type: Schema.Types.ObjectId,
          ref: TicketCategory,
          required: true
        },
        qty: {
          type: Number,
          required: true
        },
        ticketPrice: {
          type: Number,
          required: true
        }
    }],
    promotionalDiscount: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true}
);

const Order = model("Order", orderSchema);

export default Order;
