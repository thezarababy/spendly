import { colors } from "@/constants/colors";
import { radius } from "@/constants/radius";
import { spacing } from "@/constants/spacing";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "../ui/AppText";

interface TransactionToggleProps {
  value: "expense" | "income";
  onChange: (value: "expense" | "income") => void;
}

export default function TransactionToggle({
  value,
  onChange,
}: TransactionToggleProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onChange("expense")}
        style={[styles.button, value === "expense" && styles.activeExpenseButton]}
      >
        <AppText
          style={[styles.buttonText, value === "expense" && styles.activeExpenseText]}
        >
          Expense
        </AppText>
      </Pressable>

      <Pressable
        onPress={() => onChange("income")}
        style={[styles.button, value === "income" && styles.activeIncomeButton]}
      >
        <AppText
          style={[styles.buttonText, value === "income" && styles.activeIncomeText]}
        >
          Income
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.xs,
    gap: spacing.xs,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    flex: 1,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
  },
  activeExpenseButton: {
    backgroundColor: "#FEE2E2", // Light red
  },
  activeIncomeButton: {
    backgroundColor: "#E8F8EE", // Light green
  },
  buttonText: {
    color: colors.textSecondary,
    fontFamily: "Inter_500Medium",
  },
  activeExpenseText: {
    color: colors.expense,
    fontFamily: "Inter_600SemiBold",
  },
  activeIncomeText: {
    color: colors.income,
    fontFamily: "Inter_600SemiBold",
  },
});
