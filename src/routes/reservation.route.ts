import { Router } from "express";
// import { getAll, create, getById } from "../controllers/reservation-controller";
import { getById } from "../controllers/reservation.controller";
import catchError from "../middleware/catchAsyncHandler.middleware";

const reservationRouter = Router();

// reservationRouter.get("/", getAll);
reservationRouter.get("/:id", catchError(getById));

// reservationRouter.post("/", create);

export default reservationRouter;
