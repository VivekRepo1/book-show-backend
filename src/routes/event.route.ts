import { create, getAll, getOne } from "../controllers/events.controller";
import { Router } from "express";
import { upload } from "../middleware/multer.middleware";
import catchAsyncHandlerMiddleware from "../middleware/catchAsyncHandler.middleware";

const eventRouter = Router();

eventRouter.get("/", catchAsyncHandlerMiddleware(getAll));
eventRouter.get("/:id", catchAsyncHandlerMiddleware(getOne));

eventRouter.post(
  "/",
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  catchAsyncHandlerMiddleware(create),
);

export default eventRouter;
