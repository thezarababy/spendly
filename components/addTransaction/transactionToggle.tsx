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
        style={[styles.button, value === "expense" && styles.activeButton]}
      >
        <AppText
          style={[styles.buttonText, value === "expense" && styles.activeText]}
        >
          Expense
        </AppText>
      </Pressable>

      <Pressable
        onPress={() => onChange("income")}
        style={[styles.button, value === "income" && styles.activeButton]}
      >
        <AppText
          style={[styles.buttonText, value === "income" && styles.activeText]}
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
  activeButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.text,
  },
  activeText: {
    color: colors.white,
  },
});
