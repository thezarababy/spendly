import { spacing } from "@/constants";
import { View } from "react-native";
import Expenses from "./expenses";
import Income from "./income";

export default function Summary() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: spacing.lg,
      }}
    >
      <Income />
      <Expenses />
    </View>
  );
}
