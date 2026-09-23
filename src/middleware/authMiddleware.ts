import type { Request, Response, NextFunction } from "express";

import { verifyToken } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";

export interface AuthRequest extends Request {
  userId?: string;
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.authorization;

  const bearerToken = authorization?.startsWith("Bearer")
    ? authorization.split(" ")[1]
    : undefined;

  const token = req.cookies?.token || bearerToken;

  if (!token) {
    throw new AppError("Authentication required", 401);
  }

  try {
    const payload = verifyToken(token);
    req.userId = payload.userId;
    next();
  } catch {
    throw new AppError("Invalid or expired token", 401);
  }
}
