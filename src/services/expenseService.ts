import { prisma } from "../lib/prisma.js";
import type {
  CreateExpenseData,
  UpdateExpenseData,
} from "../validations/expenseSchema.js";
import { AppError } from "../utils/AppError.js";

export async function getAllExpenses(userId: string) {
  const expenses = await prisma.expense.findMany({
    where: {
      userId,
    },
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

export async function createExpense(data: CreateExpenseData, userId: string) {
  const expense = await prisma.expense.create({
    data: {
      title: data.title,
      category: data.category,
      amount: data.amount,
      date: data.date,
      note: data.note,
      userId,
    },
  });
  return {
    ...expense,
    amount: Number(expense.amount),
    date: expense.date.toISOString(),
  };
}

export async function updateExpense(
  id: string,
  data: UpdateExpenseData,
  userId: string,
) {
  const existingExpense = await prisma.expense.findFirst({
    where: {
      id,
      userId,
    },
  });
  if (!existingExpense) {
    throw new AppError("Expense not found", 404);
  }
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

export async function deleteExpense(id: string, userId: string) {
  const existingExpense = await prisma.expense.findFirst({
    where: { id, userId },
  });
  if (!existingExpense) {
    throw new AppError("Expense not found", 404);
  }
  await prisma.expense.delete({
    where: {
      id,
    },
  });
}
