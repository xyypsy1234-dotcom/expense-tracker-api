import { mockExpenses } from "../data/mockExpenses.js";

export function getAllExpenses() {
  return mockExpenses;
}

export function createExpense(data: {
  title: string;
  category: string;
  amount: number;
  date: Date;
  note?: string;
}) {
  const newExpense = {
    id: crypto.randomUUID(),
    title: data.title,
    category: data.category,
    amount: data.amount,
    date: data.date,
    note: data.note ?? "",
  };
  mockExpenses.push(newExpense);
  return newExpense;
}

export function updateExpense(
  id: string,
  data: {
    title?: string;
    category?: string;
    amount?: number;
    date?: Date;
    note?: string;
  },
) {
  const index = mockExpenses.findIndex((expense) => expense.id === id);
  if (index === -1) {
    return null;
  }
  const existing = mockExpenses[index];
  if (!existing) {
    return null;
  }
  const updateExpense = {
    ...existing,
    title: data.title ?? existing.title,
    category: data.category ?? existing.category,
    amount: data.amount ?? existing.amount,
    date:data.date ??existing.date,
    note:data.note ?? existing.note,
  };
  mockExpenses[index]=updateExpense;
  return updateExpense;
}


export function deleteExpense(id: string){
  const index = mockExpenses.findIndex((expense)=>expense.id===id);
  if(index===-1){
    return false;
  }
  mockExpenses.splice(index,1);
  return true;
}