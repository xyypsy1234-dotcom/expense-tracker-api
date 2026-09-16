import type { Request, Response, NextFunction } from "express";
import {
  getAllExpenses,
  createExpense as createExpenseService,
  updateExpense as updateExpenseService,
  deleteExpense as deleteExpenseService,
} from "../services/expenseService.js";
import { AppError } from "../utils/AppError.js";
import type { CreateExpenseData } from "../validations/expenseSchema.js";

export async function getExpenses(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const expenses = await getAllExpenses();
    return res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
}

export async function createExpense(
  req: Request<{}, {}, CreateExpenseData>,
  res: Response,
  next: NextFunction,
) {
  try {
    const newExpense = await createExpenseService(req.body);
    return res.status(201).json({ newExpense });
  } catch (error) {
    next(error);
  }
}

export async function updatedExpense(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const updateExpense = await updateExpenseService(id, req.body);
    return res.status(200).json({ updateExpense });
  } catch (error) {
    next(error);
  }
}

export async function deleteExpense(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    await deleteExpenseService(id);
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    next(error);
  }
}
