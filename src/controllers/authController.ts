import type { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  checkEmailExists,
} from "../services/authService.js";
import { generateToken } from "../utils/jwt.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";

import { AppError } from "../utils/AppError.js";

const isProduction = process.env.NODE_ENV === "production";

export async function register(req: Request, res: Response) {
  const user = await registerUser(req.body);
  return res.status(201).json({
    message: "User registered successfully",
    user,
  });
}

export async function login(req: Request, res: Response) {
  const user = await loginUser(req.body);
  const token = generateToken(user.id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({
    message: "Login successful",
    user,
  });
}

export async function getMe(req: AuthRequest, res: Response) {
  if (!req.userId) {
    throw new Error("Authenticated user ID is missing");
  }
  const user = await getCurrentUser(req.userId);
  return res.status(200).json({
    user,
  });
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });

  return res.status(200).json({
    message: "Logout successful",
  });
}

export async function checkEmail(req: Request, res: Response) {
  const { email } = req.query;
  if (!email || typeof email !== "string") {
    throw new AppError("Email is required", 400);
  }
  const exists = await checkEmailExists(email);
  return res.status(200).json({ exists });
}
