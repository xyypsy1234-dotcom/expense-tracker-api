import { Router } from "express";
import {
  getExpenses,
  createExpense,
  updatedExpense,
  deleteExpense,
} from "../controllers/expenseController.js";
import { validate } from "../middleware/validates.js";
import { expenseSchema } from "../validations/expenseSchema.js";
import { updateExpenseSchema } from "../validations/expenseSchema.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();
router.get("/", requireAuth, getExpenses);
router.post("/", requireAuth, validate(expenseSchema), createExpense);
router.put("/:id", requireAuth, validate(updateExpenseSchema), updatedExpense);
router.delete("/:id", requireAuth, deleteExpense);
export default router;
