import TransactionCard from "@/components/transaction/transactionCard";
import { spacing } from "@/constants/spacing";
import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import AppText from "../ui/AppText";
import { useTransactions } from "@/store/TransactionContext";
import { router } from "expo-router";
import { colors } from "@/constants/colors";

export default function Transactions() {
  const { transactions } = useTransactions();
  
  // Show only the 4 most recent transactions
  const recentTransactions = transactions.slice(0, 4);

  const handleSeeAll = () => {
    router.push("/(tabs)/Transactions");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText variant="title">Recent Transactions</AppText>
        <Pressable onPress={handleSeeAll}>
          <AppText variant="body" style={styles.seeAllText}>
            See all
          </AppText>
        </Pressable>
      </View>

      {recentTransactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <AppText variant="body" style={styles.emptyText}>
            No transactions yet.
          </AppText>
        </View>
      ) : (
        <FlatList
          data={recentTransactions}
          keyExtractor={(item) => item.id}
          scrollEnabled={false} // Since this is inside a parent ScrollView in HomeScreen
          renderItem={({ item }) => <TransactionCard transaction={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  seeAllText: {
    color: colors.primary,
    fontFamily: "Inter_600SemiBold",
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: "center",
  },
  emptyText: {
    color: colors.textSecondary,
  },
});
