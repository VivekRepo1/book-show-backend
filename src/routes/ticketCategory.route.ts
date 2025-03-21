import { create, update, getAll, getOne } from "../controllers/ticketCategory.controller";
import { Router } from "express";
import catchAsyncHandlerMiddleware from "../middleware/catchAsyncHandler.middleware";


const ticketCategoryRouter = Router({mergeParams: true});

ticketCategoryRouter.get("/", catchAsyncHandlerMiddleware(getAll));
ticketCategoryRouter.get("/:categoryId", catchAsyncHandlerMiddleware(getOne));
ticketCategoryRouter.post("/create", catchAsyncHandlerMiddleware(create));
ticketCategoryRouter.patch("/:categoryId", catchAsyncHandlerMiddleware(update));

export default ticketCategoryRouter;
