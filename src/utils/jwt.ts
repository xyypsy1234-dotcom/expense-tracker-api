import jwt from "jsonwebtoken";
interface JwtPayload {
  userId: string;
}

export function generateToken(userId: string): string {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ userId }, JWT_SECRET as string, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): JwtPayload {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
