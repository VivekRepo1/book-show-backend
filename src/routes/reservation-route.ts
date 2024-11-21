import { Router } from "express";
import { getAll, create, getById } from "../controllers/reservation-controller";

const reservationRouter = Router();

reservationRouter.get("/", getAll);
reservationRouter.get("/:id", getById);

reservationRouter.post("/", create);

export default reservationRouter;
