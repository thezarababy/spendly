import { colors } from "@/constants/colors";
import { radius } from "@/constants/radius";
import { spacing } from "@/constants/spacing";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "../ui/AppText";

export default function TransactionToggle() {
  const [transactionType, setTransactionType] = React.useState<
    "expense" | "income"
  >("expense");

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setTransactionType("expense")}
        style={[
          styles.button,
          transactionType === "expense" && styles.activeButton,
        ]}
      >
        <AppText
          style={[
            styles.buttonText,
            transactionType === "expense" && styles.activeText,
          ]}
        >
          {" "}
          Expense
        </AppText>
      </Pressable>
      <Pressable
        onPress={() => setTransactionType("income")}
        style={[
          styles.button,
          transactionType === "income" && styles.activeButton,
        ]}
      >
        <AppText
          style={[
            styles.buttonText,
            transactionType === "income" && styles.activeText,
          ]}
        >
          {" "}
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
