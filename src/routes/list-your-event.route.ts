import { registerEventController } from "../controllers/list-your-event.controller";
import { Router } from "express";

const listYourEventRouter = Router();

listYourEventRouter.post("/registerEvent", registerEventController);

export default listYourEventRouter;
