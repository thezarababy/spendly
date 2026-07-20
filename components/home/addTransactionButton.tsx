import { radius } from "@/constants";
import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export default function AddTransactionButton() {
  const handlePress = () => {
    router.push("/addTransaction");
  };
  return (
    <Pressable style={Styles.container} onPress={handlePress}>
      <Ionicons name="add" size={35} color={colors.white} />
    </Pressable>
  );
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    marginTop: spacing["5xl"],
    position: "absolute",
    right: spacing.xl,
    bottom: spacing.xs,
    borderRadius: radius.full,
    padding: spacing.sm,
  },
});
