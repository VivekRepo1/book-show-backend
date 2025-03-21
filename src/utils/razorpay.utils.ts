import crypto from "crypto";
import { ApiError } from "./ApiError";

export const validatePayment = (razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string) => {
try {
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEYSECRET!);
    hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`);
    const generatedSignature =  hmac.digest("hex");
    if (generatedSignature === razorpaySignature) {
      return true;
    }
  
    return false;
  
} catch (error) {
  throw new ApiError(500, "server error in payment verification");
}};


export const validateWebhook = async (webhookBody: string, webhookSignature: string) => {

try {
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!);
    hmac.update(webhookBody);
    const generatedSignature = hmac.digest("hex")
  
    if (generatedSignature === webhookSignature) {
      return true;
    }
  
    return false;
  
} catch (error) {
  throw new ApiError(500, "server error in razorpay webhook verification");
}}
