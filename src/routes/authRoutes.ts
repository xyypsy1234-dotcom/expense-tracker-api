import { Router } from "express";
import { validate } from "../middleware/validates.js";
import { registerSchema, loginSchema } from "../validations/authSchema.js";
import { register, login } from "../controllers/authController.js";

const router = Router();
router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

export default router;
