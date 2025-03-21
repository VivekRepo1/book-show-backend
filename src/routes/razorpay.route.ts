import { Router } from "express";
import catchAsyncHandlerMiddleware from "../middleware/catchAsyncHandler.middleware";
import { webhook } from "../controllers/razorpay.controller";

const webhookRouter = Router();

webhookRouter.post("/", catchAsyncHandlerMiddleware(webhook))

export default webhookRouter;