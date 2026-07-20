import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../ui/AppText";

interface TransactionCardProps {
  transaction: Transaction;
}

interface Transaction {
  id: string;
  amount: number;
  icon: string;
  title: string;
  date: string;
  description: string;
  type: "income" | "expense";
}
export default function TransactionCard({ transaction }: TransactionCardProps) {
  const isIncome = transaction.type === "income";

  const iconName = isIncome ? "arrow-up-circle" : "arrow-down-circle";

  const color = isIncome ? colors.success : colors.danger;
  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  }
  const amount = `${isIncome ? "+" : "-"}${formatCurrency(transaction.amount)}`;

  return (
    <View style={Styles.container}>
      <View style={Styles.iconContainer}>
        <View>
          <Ionicons name={iconName} size={30} color={color} />
        </View>
        <View>
          <AppText variant="title">{transaction.title}</AppText>
          <AppText variant="caption">{transaction.date}</AppText>
        </View>
      </View>

      <View>
        <AppText variant="body" style={{ color }}>
          {amount}
        </AppText>
      </View>
    </View>
  );
}
const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    fontSize: 24,
  },
});
