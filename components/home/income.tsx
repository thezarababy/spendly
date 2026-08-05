import { radius, spacing } from "@/constants";
import { colors } from "@/constants/colors";
import { shadows } from "@/constants/shadow";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../ui/AppText";
import { useTransactions } from "@/store/TransactionContext";

export default function Income() {
  const { totalIncome } = useTransactions();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <View style={styles.container}>
      <AppText variant="title" style={styles.title}>
        Income
      </AppText>
      <AppText variant="heading" style={styles.amountText}>{formatCurrency(totalIncome)}</AppText>
      <Ionicons
        name="arrow-up-circle-outline"
        size={30}
        color={colors.success}
        style={styles.icon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...shadows.lg,
    borderColor: colors.border,
    borderWidth: 1,
    padding: spacing.lg,
    borderRadius: radius.lg,
    width: "48%",
  },
  icon: {
    marginTop: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
  },
  title: {
    marginBottom: spacing.sm,
    color: colors.textSecondary,
  },
  amountText: {
    color: colors.success,
  },
});
