import type { Request, Response, NextFunction } from "express";
import {
  getAllExpenses,
  createExpense as createExpenseService,
  updateExpense as updateExpenseService,
  deleteExpense as deleteExpenseService,
} from "../services/expenseService.js";
import type {
  CreateExpenseData,
  UpdateExpenseData,
} from "../validations/expenseSchema.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";

export async function getExpenses(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.userId) {
      throw new Error("Authenticate user ID is missing");
    }
    const expenses = await getAllExpenses(req.userId);
    return res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
}

export async function createExpense(
  req: AuthRequest<{}, {}, CreateExpenseData>,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.userId) {
      throw new Error("AUthenticated user ID is missing");
    }
    const newExpense = await createExpenseService(req.body, req.userId);
    return res.status(201).json({ newExpense });
  } catch (error) {
    next(error);
  }
}

export async function updatedExpense(
  req: AuthRequest<{ id: string }, {}, UpdateExpenseData>,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.userId) {
      throw new Error("Authenticate user ID is missing");
    }
    const { id } = req.params;
    const updateExpense = await updateExpenseService(id, req.body, req.userId);
    return res.status(200).json({ updateExpense });
  } catch (error) {
    next(error);
  }
}

export async function deleteExpense(
  req: AuthRequest<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.userId) {
      throw new Error("Authenticate user ID is missing");
    }
    const { id } = req.params;
    await deleteExpenseService(id, req.userId);
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    next(error);
  }
}
