import { radius, spacing } from "@/constants";
import { colors } from "@/constants/colors";
import { shadows } from "@/constants/shadow";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../ui/AppText";

export default function Income() {
  return (
    <View style={styles.container}>
      <AppText variant="title" style={styles.title}>
        Income
      </AppText>
      <AppText variant="heading">₦200,000</AppText>
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
    margin: "auto",
  },
  title: {
    marginBottom: spacing.sm,
  },
});
