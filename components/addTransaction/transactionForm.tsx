import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import AppInput from "../ui/AppInput";
import AppText from "../ui/AppText";

interface TransactionFormData {
  title: string;
  amount: string;
  notes: string;
  category: string;
  date: Date;
  transactionType: "expense" | "income";
}

interface TransactionFormProps {
  formData: TransactionFormData;
  setFormData: React.Dispatch<React.SetStateAction<TransactionFormData>>;
}

export default function TransactionForm({
  formData,
  setFormData,
}: TransactionFormProps) {
  function onPress(_: GestureResponderEvent): void {
    setFormData((current) => ({
      ...current,
      category: current.category || "Uncategorized",
    }));
  }

  return (
    <View style={styles.container}>
      <AppInput
        placeholder="e.g Groceries"
        label="Title"
        value={formData.title}
        onChangeText={(text) =>
          setFormData({
            ...formData,
            title: text,
          })
        }
      />
      <AppInput
        placeholder=" e.g 15000"
        label="Amount"
        value={formData.amount}
        onChangeText={(text) =>
          setFormData({
            ...formData,
            amount: text,
          })
        }
      />
      <View>
        <AppText variant="body">Category</AppText>

        <Pressable style={styles.selector} onPress={onPress}>
          <AppText>{formData.category || "Select Category"}</AppText>

          <Ionicons
            name="chevron-down"
            size={20}
            color={colors.textSecondary}
          />
        </Pressable>
      </View>

      <View style={styles.fieldContainer}>
        <AppText variant="body">Date</AppText>

        <Pressable
          style={styles.selector}
          onPress={() => {
            // We'll open the date picker later
          }}
        >
          <View style={styles.dateContent}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={colors.textSecondary}
            />

            <AppText>{formData.date.toLocaleDateString()}</AppText>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.textSecondary}
          />
        </Pressable>
      </View>
      <AppInput
        placeholder="add notes"
        label="Notes"
        value={formData.notes}
        onChangeText={(text) =>
          setFormData({
            ...formData,
            notes: text,
          })
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldContainer: {
    marginBottom: spacing.lg,
  },
  dateContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
});
