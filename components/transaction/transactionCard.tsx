import { colors } from "@/constants/colors";
import { radius } from "@/constants/radius";
import { spacing } from "@/constants/spacing";
import { useTransactions } from "@/store/TransactionContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { Menu } from "react-native-paper";
import { CATEGORIES } from "../addTransaction/categoryModal";
import AppText from "../ui/AppText";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string; // YYYY-MM-DD
  notes?: string;
}

interface TransactionCardProps {
  transaction: Transaction;
}

const formatCardDate = (dateStr: string) => {
  if (!dateStr) return "";
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return dateStr;

  const today = new Date();
  const txDate = new Date(parts[0], parts[1] - 1, parts[2]);

  // Check if today
  if (
    txDate.getDate() === today.getDate() &&
    txDate.getMonth() === today.getMonth() &&
    txDate.getFullYear() === today.getFullYear()
  ) {
    return "Today";
  }

  // Check if yesterday
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (
    txDate.getDate() === yesterday.getDate() &&
    txDate.getMonth() === yesterday.getMonth() &&
    txDate.getFullYear() === yesterday.getFullYear()
  ) {
    return "Yesterday";
  }

  // General format
  return txDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const isIncome = transaction.type === "income";
  const { deleteTransaction, setEditingTransaction } = useTransactions();
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  // Match category to icon and color scheme
  const categoryConfig = CATEGORIES.find(
    (c) => c.label.toLowerCase() === transaction.category.toLowerCase(),
  ) || {
    icon: isIncome ? "arrow-up" : "arrow-down",
    color: "#F3F4F6",
    iconColor: "#6B7280",
  };

  const amountColor = isIncome ? colors.success : colors.danger;

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  const amountText = `${isIncome ? "+" : "-"}${formatCurrency(transaction.amount)}`;

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: categoryConfig.color },
          ]}
        >
          <Ionicons
            name={categoryConfig.icon as any}
            size={24}
            color={categoryConfig.iconColor}
          />
        </View>
        <View style={styles.textContainer}>
          <AppText variant="title" style={styles.titleText}>
            {transaction.title}
          </AppText>
          <AppText variant="caption">
            {formatCardDate(transaction.date)}
          </AppText>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <AppText
          variant="body"
          style={[styles.amountText, { color: amountColor }]}
        >
          {amountText}
        </AppText>

        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Pressable onPress={openMenu} style={styles.menuButton}>
              <Ionicons
                name="ellipsis-vertical"
                size={20}
                color={colors.textSecondary}
              />
            </Pressable>
          }
        >
          <Menu.Item
            onPress={() => {
              closeMenu();
              setEditingTransaction(transaction);
              router.push("/addTransaction");
            }}
            title="Edit"
          />
          <Menu.Item
            onPress={() => {
              closeMenu();
              Alert.alert(
                "Delete transaction",
                "Are you sure you want to delete this transaction?",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => deleteTransaction(transaction.id),
                  },
                ],
              );
            }}
            title="Delete"
          />
        </Menu>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "center",
  },
  titleText: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: colors.text,
    marginBottom: 2,
  },
  amountText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
  },
  rightContainer: {
    alignItems: "flex-end",
    gap: spacing.xs,
  },
  actionsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  actionButton: {
    padding: spacing.xs,
  },
  menuButton: {
    padding: spacing.xs,
  },
});
