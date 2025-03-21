import { Router } from "express";

import catchAsyncHandlerMiddleware from "../middleware/catchAsyncHandler.middleware";
import { create, getAll, getOne, update, getTickets, verifyPayment } from "../controllers/order.controller";

const orderRouter = Router({mergeParams: true});

orderRouter.get("/", catchAsyncHandlerMiddleware(getAll));
orderRouter.get("/:orderId", catchAsyncHandlerMiddleware(getOne));
orderRouter.get("/:orderId/tickets", catchAsyncHandlerMiddleware(getTickets));
orderRouter.post("/verify-payment", catchAsyncHandlerMiddleware(verifyPayment));
orderRouter.post("/create", catchAsyncHandlerMiddleware(create));
orderRouter.patch("/:orderId", catchAsyncHandlerMiddleware(update));

export default orderRouter;
