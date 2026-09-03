import type { Request, Response } from "express";
import {
  getAllExpenses,
  createExpense as createExpenseService,
  updateExpense as updateExpenseService,
  deleteExpense as deleteExpenseService,
} from "../services/expenseService.js";

export function getExpenses(req: Request, res: Response) {
  const expenses = getAllExpenses();
  return res.status(200).json(expenses);
}

export function createExpense(req: Request, res: Response) {
  const { title, category, amount, date, note } = req.body;
  if (!title || !category || amount === undefined || !date) {
    return res
      .status(400)
      .json({ error: "Title, category, amount,and date are required" });
  }
  const newExpense = createExpenseService({
    title,
    category,
    amount: Number(amount),
    date: new Date(date),
    note,
  });
  return res.status(201).json({ newExpense });
}

export function updateExpense(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const { title, category, amount, date, note } = req.body;
  const updateExpense = updateExpenseService(id, {
    title,
    category,
    amount: amount !== undefined ? Number(amount) : undefined,
    date: date ? new Date(date) : undefined,
    note,
  });
  if (!updateExpense) {
    return res.status(404).json({ error: "Expense not found" });
  }
  return res.status(200).json({ updateExpense });
}

export function deleteExpense(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const deleted = deleteExpenseService(id);
  if (!deleted) {
    return res.status(404).json({ error: "Expense not found" });
  }
  return res.status(200).json({ message: "Expense deleted successfully" });
}
