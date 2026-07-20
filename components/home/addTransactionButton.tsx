import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable } from "react-native";

export default function AddTransactionButton() {
  const handlePress = () => {
    router.push("/addTransaction");
  };
  return (
    <Pressable>
      <Ionicons name="add" size={35} color={colors.white} />
    </Pressable>
  );
}
