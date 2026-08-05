import React, { useState } from "react";
import {
  Pressable,
  SectionList,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { ScreenContainer } from "react-native-screens";
import { Ionicons } from "@expo/vector-icons";

import AppText from "@/components/ui/AppText";
import TransactionCard from "@/components/transaction/transactionCard";

import { colors } from "@/constants/colors";
import { radius } from "@/constants/radius";
import { spacing } from "@/constants/spacing";
import { useTransactions, Transaction } from "@/store/TransactionContext";

const formatCardDate = (dateStr: string) => {
  if (!dateStr) return "";
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return dateStr;
  
  const today = new Date();
  const txDate = new Date(parts[0], parts[1] - 1, parts[2]);
  
  if (
    txDate.getDate() === today.getDate() &&
    txDate.getMonth() === today.getMonth() &&
    txDate.getFullYear() === today.getFullYear()
  ) {
    return "Today";
  }
  
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (
    txDate.getDate() === yesterday.getDate() &&
    txDate.getMonth() === yesterday.getMonth() &&
    txDate.getFullYear() === yesterday.getFullYear()
  ) {
    return "Yesterday";
  }

  return txDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function TransactionsScreen() {
  const { transactions } = useTransactions();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "income" | "expense">("all");

  // Filtering transactions
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tx.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeFilter === "all" ? true : tx.type === activeFilter;
    return matchesSearch && matchesType;
  });

  // Helper to group by date
  const groupTransactions = (txList: Transaction[]) => {
    const groups: { [key: string]: Transaction[] } = {};
    
    // Sort transactions by date descending
    const sortedList = [...txList].sort((a, b) => b.date.localeCompare(a.date));

    sortedList.forEach((tx) => {
      const label = formatCardDate(tx.date);
      if (!groups[label]) {
        groups[label] = [];
      }
      groups[label].push(tx);
    });

    return Object.keys(groups).map((dateLabel) => ({
      title: dateLabel,
      data: groups[dateLabel],
    }));
  };

  const groupedSections = groupTransactions(filteredTransactions);

  return (
    <ScreenContainer style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <AppText variant="title" style={styles.headerTitle}>Transactions</AppText>
        <Pressable style={styles.headerIcon}>
          <Ionicons name="filter-outline" size={24} color={colors.text} />
        </Pressable>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          placeholder="Search transactions..."
          placeholderTextColor={colors.textLight}
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery("")} style={styles.clearButton}>
            <Ionicons name="close-circle" size={18} color={colors.textSecondary} />
          </Pressable>
        )}
      </View>

      {/* Filter Chips */}
      <View style={styles.filtersContainer}>
        <View style={styles.chipsRow}>
          <Pressable
            style={[styles.chip, activeFilter === "all" && styles.activeChip]}
            onPress={() => setActiveFilter("all")}
          >
            <AppText
              variant="body"
              style={[styles.chipText, activeFilter === "all" && styles.activeChipText]}
            >
              All
            </AppText>
          </Pressable>

          <Pressable
            style={[styles.chip, activeFilter === "income" && styles.activeChip]}
            onPress={() => setActiveFilter("income")}
          >
            <AppText
              variant="body"
              style={[styles.chipText, activeFilter === "income" && styles.activeChipText]}
            >
              Income
            </AppText>
          </Pressable>

          <Pressable
            style={[styles.chip, activeFilter === "expense" && styles.activeChip]}
            onPress={() => setActiveFilter("expense")}
          >
            <AppText
              variant="body"
              style={[styles.chipText, activeFilter === "expense" && styles.activeChipText]}
            >
              Expense
            </AppText>
          </Pressable>
        </View>

        <Pressable style={styles.calendarButton}>
          <Ionicons name="calendar-outline" size={20} color={colors.text} />
        </Pressable>
      </View>

      {/* Transactions SectionList */}
      {groupedSections.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconBackground}>
            <Ionicons name="receipt-outline" size={48} color={colors.textSecondary} />
          </View>
          <AppText variant="title" style={styles.emptyTitle}>No transactions found</AppText>
          <AppText variant="body" style={styles.emptySubtitle}>
            Try adjusting your search query or filter options to find what you are looking for.
          </AppText>
        </View>
      ) : (
        <SectionList
          sections={groupedSections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard transaction={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <AppText variant="body" style={styles.sectionTitle}>
                {title}
              </AppText>
            </View>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing["2xl"],
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  headerSpacer: {
    width: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: colors.text,
  },
  headerIcon: {
    padding: spacing.xs,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    marginHorizontal: spacing["2xl"],
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
    height: 48,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: colors.text,
    height: "100%",
  },
  clearButton: {
    padding: spacing.xs,
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: spacing["2xl"],
    marginBottom: spacing.xl,
  },
  chipsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    flex: 1,
  },
  chip: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  activeChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: "Inter_500Medium",
  },
  activeChipText: {
    color: colors.white,
    fontFamily: "Inter_600SemiBold",
  },
  calendarButton: {
    width: 42,
    height: 42,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing["2xl"],
    paddingBottom: spacing["5xl"],
  },
  sectionHeader: {
    backgroundColor: colors.background,
    paddingVertical: spacing.sm,
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: colors.textSecondary,
  },
  emptyContainer: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing["3xl"],
  },
  emptyIconBackground: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
});
