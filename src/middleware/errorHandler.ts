import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      details: err.details,
    });
  }
  if ((err as any).code === "P2025") {
    return res.status(404).json({
      error: "Expense not found",
    });
  }
  console.error(err);
  return res.status(500).json({
    error: "Internal Server Error",
  });
}
