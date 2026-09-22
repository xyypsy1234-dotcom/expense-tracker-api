import type { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService.js";
import { generateToken } from "../utils/jwt.js";

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
  return res.status(200).json({
    message: "Login successful",
    user,
    token,
  });
}
