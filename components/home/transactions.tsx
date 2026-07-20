import TransactionCard from "@/components/transaction/transactionCard";
import { spacing } from "@/constants/spacing";
import { transactions } from "@/data/transaction";
import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import AppText from "../ui/AppText";

export default function Transactions() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText variant="title">Recent Transactions</AppText>
        <Pressable>
          <AppText variant="body" color="colors.primary">
            See all
          </AppText>
        </Pressable>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
      />
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
});
