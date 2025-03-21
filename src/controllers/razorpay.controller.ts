import { Response } from "express"

import { ApiResponse } from "../utils/ApiResponse"
import { validateWebhook } from "../utils/razorpay.utils"
import { ApiError } from "../utils/ApiError";
import { convertUnixToNewDate } from "../utils/currentDate";
import Order from "../models/order.model";
import TicketCategory from "../models/ticketCategory.model";

export const webhook = async (req: any, res: Response) => {
    const rawBody = req.rawBody;
    const webhookSignature = req.headers["x-razorpay-signature"];
    if (!rawBody || !webhookSignature) {
        throw new ApiError(400, "could not validate host");
    }
    const isValid =  validateWebhook(rawBody, webhookSignature);

    if (!isValid) {
        throw new ApiError(400, "could not validate webhook credentials");
    }

    const {entity, event, account_id: accountId, contains, created_at: unixDate} = req.body;
    const createdAt = convertUnixToNewDate(unixDate);
    const orderId = req.body.payload?.payment?.entity?.order_id;
    console.log("entity", entity, "event", event, "accountId", accountId, "contains", contains, "createdAt", createdAt);
    console.log(orderId);
    
    if (!orderId) {
        throw new ApiError(400, "order id not available");
    }
    try {
        if (event === "payment.authorized") {
            await Order.findOneAndUpdate({orderId}, {$set: {"paymentRemarks.paymentAuthorized": createdAt}}, {runValidators: true})
        } else if(event === "payment.captured") {
            await Order.findOneAndUpdate({orderId}, {$set: {"paymentRemarks.paymentCaptured": createdAt}}, {runValidators: true})
        } else if(event === "payment.failed") {
            const order = await Order.findOneAndUpdate({orderId}, {$set: {"paymentRemarks.paymentFailed": createdAt}}, {runValidators: true, new: true})
            await Promise.all(
                order!.tickets.map(async (item: any) => {
                  const { ticketCategoryId, qty } = item;
                  const ticketCategory = await TicketCategory.findById(ticketCategoryId);
                  ticketCategory!.availableSeats+=qty;
                  await ticketCategory!.save();
                  return;
                })
              );
        } else if(event === "payment.refunded") {
            await Order.findOneAndUpdate({orderId}, {$set: {"paymentRemarks.paymentRefunded": createdAt}}, {runValidators: true})
        } else if(event === "payment.dispute") {
            await Order.findOneAndUpdate({orderId}, {$set: {"paymentRemarks.paymentDispute": createdAt}}, {runValidators: true})
        } else if(event === "payment.outcome") {
            await Order.findOneAndUpdate({orderId}, {$set: {"paymentRemarks.paymentDisputeOutcome.outcome": "win/loss", "paymentRemarks.paymentDisputeOutcome.date": createdAt}})
        }        
    } catch (error) {
    console.log(error);
    }

    // console.log(req.body.payload.payment.entity);
    // console.log("req.body.payload.payment.entity.order_id", req.body.payload.payment.entity.order_id);
    res.status(200).json(new ApiResponse(201, {}, "webhook working"))
}