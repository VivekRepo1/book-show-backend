import { Request, NextFunction, Response } from "express";

/**
 * A function that takes a request, response, and next function as parameters.
 */
export default (catchAsyncHandler: Function) =>
  async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await catchAsyncHandler(request, response, next);
    } catch (error) {
      return next(error);
    }
  };
