import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useSegments } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "./AppText";

export default function AppHeader() {
  const router = useRouter();
  const segments = useSegments();
  const current = segments[segments.length - 1] || "index";

  const title = (() => {
    if (current === "index" || current === "(tabs)") return "Home";
    if (current.toLowerCase() === "transactions") return "Transactions";
    if (current.toLowerCase() === "addtransaction") return "Add Transaction";
    return current.charAt(0).toUpperCase() + current.slice(1);
  })();

  const showBack = router.canGoBack();

  const rightIcon = (() => {
    if (current.toLowerCase() === "transactions") return "filter-outline";
    if (current === "index" || current === "(tabs)")
      return "notifications-outline";
    return null;
  })();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          if (showBack) router.back();
        }}
        style={styles.left}
      >
        <Ionicons
          name={showBack ? "chevron-back" : "menu"}
          size={24}
          color={colors.text}
        />
      </Pressable>

      <AppText variant="title" style={styles.title}>
        {title}
      </AppText>

      <Pressable
        onPress={() => {
          // placeholder for future actions
        }}
        style={styles.right}
      >
        {rightIcon && (
          <Ionicons name={rightIcon as any} size={22} color={colors.text} />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  left: {
    width: 40,
    alignItems: "flex-start",
  },
  right: {
    width: 40,
    alignItems: "flex-end",
  },
  title: {
    textAlign: "center",
  },
});
