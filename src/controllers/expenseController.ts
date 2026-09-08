import type { Request, Response, NextFunction } from "express";
import {
  getAllExpenses,
  createExpense as createExpenseService,
  updateExpense as updateExpenseService,
  deleteExpense as deleteExpenseService,
} from "../services/expenseService.js";
import { AppError } from "../utils/AppError.js";

export function getExpenses(req: Request, res: Response) {
  const expenses = getAllExpenses();
  return res.status(200).json(expenses);
}

export function createExpense(req: Request, res: Response) {
  const { title, category, amount, date, note } = req.body;
  const newExpense = createExpenseService({
    title,
    category,
    amount,
    date,
    note,
  });
  return res.status(201).json({ newExpense });
}

export function updateExpense(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const { title, category, amount, date, note } = req.body;
    const updateExpense = updateExpenseService(id, req.body);
    if (!updateExpense) {
      throw new AppError("Expense not found", 404);
    }
    return res.status(200).json({ updateExpense });
  } catch (error) {
    next(error);
  }
}

export function deleteExpense(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const deleted = deleteExpenseService(id);
    if (!deleted) {
      throw new AppError("Expense not found", 404);
    }
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    next(error);
  }
}
