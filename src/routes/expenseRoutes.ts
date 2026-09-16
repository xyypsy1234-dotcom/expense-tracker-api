import { Router } from "express";
import {
  getExpenses,
  createExpense,
  updatedExpense,
  deleteExpense,
} from "../controllers/expenseController.js";
import {validate} from "../middleware/validates.js";
import { expenseSchema } from "../validations/expenseSchema.js";
import { updateExpenseSchema } from "../validations/expenseSchema.js";


const router = Router();
router.get("/", getExpenses);
router.post("/", validate(expenseSchema),createExpense);
router.put("/:id", validate(updateExpenseSchema), updatedExpense);
router.delete("/:id", deleteExpense);
export default router;
