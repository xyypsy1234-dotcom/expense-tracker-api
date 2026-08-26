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
export default router;
