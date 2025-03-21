import express, { Request, Response } from "express";

import reservationRouter from "./reservation.route";
import listYOurEventRouter from "./list-your-event.route";
import eventRouter from "./event.route";
import ticketCategoryRouter from "./ticketCategory.route";
import orderRouter from "./order.route";
import webhookRouter from "./razorpay.route";

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
  {
    path: "/event/:eventId/ticket-category",
    route: ticketCategoryRouter,
  },

  {
    path: "/order",
    route: orderRouter,
  },
  {
    path: "/razorpay",
    route: webhookRouter,
  },
];

defaultRoutes.forEach((route) => {
  //   apiV1Router.use(apiV1RateLimiter);
  apiV1Router.use(route.path, route.route);
});

export default apiV1Router;
