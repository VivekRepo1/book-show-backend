import express from "express";
import helmet from "helmet";
import cors from "cors";
import { config } from "dotenv";
// import cors from 'cors';

import apiV1Router from "./routes";
import { errorHandler } from "./middleware/errorMiddleware";

config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/api", apiV1Router);

app.use(errorHandler);

export default app;
