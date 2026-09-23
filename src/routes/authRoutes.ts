import { Router } from "express";
import { validate } from "../middleware/validates.js";
import { registerSchema, loginSchema } from "../validations/authSchema.js";
import {
  register,
  login,
  getMe,
  logout,
} from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();
router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);
router.get("/me", requireAuth, getMe);
router.post("/logout", requireAuth, logout);

export default router;
