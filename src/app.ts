import express from "express";
import helmet from "helmet";
import cors from "cors";

import apiV1Router from "./routes";
import { errorHandler } from "./middleware/errorMiddleware";
import { ApiError } from "./utils/ApiError";

const app = express();

// const corsOptions = {
//   origin: "https://x6vs1610-3000.inc1.devtunnels.ms/",
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

// Middleware
app.use(helmet());
app.use(cors());
app.use(
  express.json({
    verify: (req: any, _res: any, buf) => {
      if (req.headers["user-agent"].includes("Razorpay")) {
        req.rawBody = buf.toString();
      }
    },
  })
);
// app.use(cors(corsOptions));

// Routes
app.use("/api", apiV1Router);

app.use("/", () => {
  console.log("endpoint not found");
  throw new ApiError(404, "endpoint not found");
});

app.use(errorHandler);

export default app;
