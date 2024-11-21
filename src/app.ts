import express from "express";
import helmet from "helmet";
import { config } from "dotenv";
// import cors from 'cors';
import { errorHandler } from "./middleware/errorMiddleware";
import apiV1Router from "./routes";
config();

const app = express();

// Middleware
app.use(helmet());
// app.use(cors());
app.use(express.json());

// Routes
app.use("/api", apiV1Router);

app.use(errorHandler);

export default app;
