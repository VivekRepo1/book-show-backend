import express from "express";
import helmet from "helmet";
import cors from "cors";
import { config } from "dotenv";

import apiV1Router from "./routes";
import { errorHandler } from "./middleware/errorMiddleware";

config();

const app = express();

const corsOptions = {
  origin: ['http://45.79.121.211', 'http://localhost:3000'],
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization',
};

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/api", apiV1Router);

app.use(errorHandler);

export default app;
