// src/middleware/errorHandler.ts
import { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  console.error(`Error at ${req.originalUrl}:`, err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.isOperational ? err.message : "Internal Error",
    errors: err.errors,
  });
};
