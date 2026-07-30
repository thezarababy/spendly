import { z } from "zod";

export const transactionSchema = z.object({
  transactionType: z.enum(["expense", "income"]),

  title: z.string().trim().min(1, "Title is required"),

  amount: z.string().trim().min(1, "Amount is required"),

  category: z.string().trim().min(1, "Please select a category"),

  date: z.string().trim().min(1, "Please choose a date"),

  notes: z.string().optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
