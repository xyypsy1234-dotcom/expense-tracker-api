import { prisma } from "../lib/prisma.js";
import type {
  CreateExpenseData,
  UpdateExpenseData,
} from "../validations/expenseSchema.js";

export async function getAllExpenses() {
  const expenses = await prisma.expense.findMany({
    orderBy: {
      date: "desc",
    },
  });
  return expenses.map((expense) => ({
    ...expense,
    amount: Number(expense.amount),
    date: expense.date.toISOString(),
  }));
}

export async function createExpense(data: CreateExpenseData) {
  const expense = await prisma.expense.create({
    data: {
      title: data.title,
      category: data.category,
      amount: data.amount,
      date: data.date,
      note: data.note,
    },
  });
  return {
    ...expense,
    amount: Number(expense.amount),
    date: expense.date.toISOString(),
  };
}

export async function updateExpense(id: string, data: UpdateExpenseData) {
  const expense = await prisma.expense.update({
    where: {
      id,
    },
    data,
  });
  return {
    ...expense,
    amount: Number(expense.amount),
    date: expense.date.toISOString(),
  };
}

export async function deleteExpense(id: string) {
  await prisma.expense.delete({
    where: {
      id,
    },
  });
}
