import express, { Request, Response } from "express";

import reservationRouter from "./reservation.route";
import listYOurEventRouter from "./list-your-event.route";
import eventRouter from "./event.route";

const apiV1Router = express.Router();

apiV1Router.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Healthy check completed successfully",
  });
});

const defaultRoutes = [
  {
    path: "/reservation",
    route: reservationRouter,
  },
  {
    path: "/list-your-event",
    route: listYOurEventRouter,
  },
  {
    path: "/event",
    route: eventRouter,
  },
];

defaultRoutes.forEach((route) => {
  //   apiV1Router.use(apiV1RateLimiter);
  apiV1Router.use(route.path, route.route);
});

export default apiV1Router;
