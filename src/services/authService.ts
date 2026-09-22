import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";
import type { RegisterInput, LoginInput } from "../validations/authSchema.js";

export async function registerUser(data: RegisterInput) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (existingUser) {
    throw new AppError("Email already registered", 409);
  }
  const hashedPassword = await bcrypt.hash(data.password, 12);
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export async function loginUser(data: LoginInput) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
