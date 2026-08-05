import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string; // YYYY-MM-DD
  notes?: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  balance: number;
  totalIncome: number;
  totalExpenses: number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

const SEED_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    title: "Salary",
    amount: 175000,
    type: "income",
    category: "Salary",
    date: "2026-07-14",
    notes: "Monthly salary payment",
  },
  {
    id: "2",
    title: "Freelance Work",
    amount: 25000,
    type: "income",
    category: "Freelance",
    date: "2026-07-13",
    notes: "UI Design project client payment",
  },
  {
    id: "3",
    title: "Groceries",
    amount: 15000,
    type: "expense",
    category: "Food",
    date: "2026-07-13",
    notes: "Weekly grocery shopping",
  },
  {
    id: "4",
    title: "Transport",
    amount: 2500,
    type: "expense",
    category: "Transport",
    date: "2026-07-13",
    notes: "Cab fare to office",
  },
  {
    id: "5",
    title: "Electricity Bill",
    amount: 12000,
    type: "expense",
    category: "Bills",
    date: "2026-07-12",
    notes: "Prepaid electricity token purchase",
  },
  {
    id: "6",
    title: "Data Subscription",
    amount: 2000,
    type: "expense",
    category: "Bills",
    date: "2026-07-13",
    notes: "Monthly internet subscription package",
  },
  {
    id: "7",
    title: "Shopping",
    amount: 18500,
    type: "expense",
    category: "Shopping",
    date: "2026-07-11",
    notes: "Purchased new sneakers",
  },
];

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(SEED_TRANSACTIONS);

  const addTransaction = (newTx: Omit<Transaction, "id">) => {
    const transaction: Transaction = {
      ...newTx,
      id: Math.random().toString(36).substring(2, 9),
    };
    setTransactions((prev) => [transaction, ...prev]);
  };

  // Calculations
  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpenses = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        balance,
        totalIncome,
        totalExpenses,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
}
