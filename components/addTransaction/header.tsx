import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "../ui/AppText";

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => router.back()} style={styles.Pressable}>
        <Ionicons name="chevron-back" size={24} color={colors.text} />
      </Pressable>
      <AppText variant="heading">Add Transaction</AppText>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: spacing["2xl"],
  },
  Pressable: {
    padding: spacing.sm,
  },
  spacer: {
    width: spacing["2xl"],
  },
});
