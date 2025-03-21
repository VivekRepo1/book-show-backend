import { create, getAll, getOne, update, shareSocial, deleteEvent } from "../controllers/events.controller";
import { Router } from "express";
import { upload } from "../middleware/multer.middleware";
import catchAsyncHandlerMiddleware from "../middleware/catchAsyncHandler.middleware";

const eventRouter = Router();

eventRouter.get("/", catchAsyncHandlerMiddleware(getAll));
eventRouter.get("/share-social", catchAsyncHandlerMiddleware(shareSocial));
eventRouter.get("/:id", catchAsyncHandlerMiddleware(getOne));
// eventRouter.get("/filtered", catchAsyncHandlerMiddleware(filteredEvent));

eventRouter.post(
  "/",
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  catchAsyncHandlerMiddleware(create),
);
eventRouter.patch(
  "/:id",
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  catchAsyncHandlerMiddleware(update),
);

eventRouter.delete("/:id", catchAsyncHandlerMiddleware(deleteEvent));
export default eventRouter;
