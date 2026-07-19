import { colors, radius, spacing } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "../ui/AppText";

export default function Balance() {
  const [isBalanceVisible, setIsBalanceVisible] = React.useState(true);
  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };
  return (
    <View style={styles.container}>
      <View style={styles.balanceHeader}>
        <AppText
          variant="title"
          color={colors.white}
          style={styles.balanceText}
        >
          Total Balance,
        </AppText>
        <Pressable onPress={toggleBalanceVisibility}>
          <Ionicons
            name={isBalanceVisible ? "eye-off-outline" : "eye-outline"}
            size={24}
            color={colors.white}
          />
        </Pressable>
      </View>

      <AppText variant="heading" color={colors.white} style={styles.balance}>
        {isBalanceVisible ? "₦150,000" : "****"}
      </AppText>
      <View style={styles.balanceFooter}>
        <Ionicons name="trending-up" size={16} color={colors.white} />
        <AppText
          variant="body"
          color={colors.textLight}
          style={{ marginLeft: spacing.sm }}
        >
          12% from last month
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryDark,
    margin: spacing.lg,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  balanceText: {
    marginBottom: spacing.sm,
  },
  balance: {
    marginBottom: spacing.sm,
  },
  balanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.sm,
  },
});
