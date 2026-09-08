import { z } from "zod";
export const expenseSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title should not exceed 50 characters"),
  category: z.string().min(1, "Category is required"),
  amount: z.coerce.number().positive("Amount must be greater than zero"),
  date: z.coerce.date(),
  note: z.string().optional(),
});

export const updateExpenseSchema = expenseSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provide",
  });
