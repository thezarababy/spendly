import { spacing } from "@/constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../ui/AppText";

export default function Header() {
  const greeting = "Good Morning";
  const userName = "Joy";
  return (
    <View style={styles.container}>
      <AppText variant="heading">
        {greeting} {userName} 👋
      </AppText>
      <AppText variant="body">Here's your summary</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: spacing.lg,
  },
});
