import express, { Request, Response } from "express";
import reservationRouter from "./reservation-route";

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
];

defaultRoutes.forEach((route) => {
  //   apiV1Router.use(apiV1RateLimiter);
  apiV1Router.use(route.path, route.route);
});

export default apiV1Router;
