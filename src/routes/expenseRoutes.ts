import { Router } from "express";
import { mockExpenses } from "../data/mockExpenses.js";

const router = Router();
router.get("/", (req, res) => {
  res.status(200).json(mockExpenses);
});

router.post("/", (req, res) => {
  const { title, category, amount, date, note } = req.body;
  if (!title || !category || amount === undefined || !date) {
    return res.status(400).json({
      error: "Title,category,amount and date  are required",
    });
  }
  const newExpense = {
    id: crypto.randomUUID(),
    title,
    category,
    amount: Number(amount),
    date: new Date(date),
    note: note ?? "",
  };
  mockExpenses.push(newExpense);
  return res.status(201).json(newExpense);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, category, amount, date, note } = req.body;
  const index = mockExpenses.findIndex((expense) => expense.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Expense not found" });
  }
  const existing = mockExpenses[index];
  if (!existing) {
    return res.status(404).json({ error: "Expense not found" });
  }
  const updateExpense = {
    ...existing,
    title: title ?? existing.title,
    category: category ?? existing.category,
    amount: amount !== undefined ? Number(amount) : existing.amount,
    date: date ? new Date(date) : existing.date,
    note: note ?? existing.note,
  };
  mockExpenses[index] = updateExpense;
  return res.status(200).json(updateExpense);
});


export default router;
