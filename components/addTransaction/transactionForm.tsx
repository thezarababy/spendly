import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
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

const categories = [
  {
    id: "food",
    label: "Food",
    icon: "cart",
    color: "#FFF3E6",
    iconColor: "#FF8A00",
  },
  {
    id: "transport",
    label: "Transport",
    icon: "car",
    color: "#EAF4FF",
    iconColor: "#2388FF",
  },
  {
    id: "bills",
    label: "Bills",
    icon: "receipt",
    color: "#F3E8FF",
    iconColor: "#A855F7",
  },
  {
    id: "more",
    label: "More",
    icon: "ellipsis-horizontal",
    color: "#F5F5F5",
    iconColor: "#333",
  },
];

export default function TransactionForm({
  formData,
  setFormData,
}: TransactionFormProps) {
  const [showDatePicker, setShowDatePicker] = React.useState(false);

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
        <Pressable onPress={() => setShowDatePicker(true)}>
          <AppInput
            label="Category"
            placeholder="Select Category"
            value={formData.category}
            rightIcon={
              <Ionicons
                name="chevron-down"
                size={20}
                color={colors.textSecondary}
              />
            }
          />
        </Pressable>
      </View>

      <View style={styles.categoryGrid}>
        {categories.map((category) => (
          <Pressable
            key={category.id}
            style={styles.categoryItem}
            onPress={() =>
              setFormData({
                ...formData,
                category: category.label,
              })
            }
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: category.color,
                },
              ]}
            >
              <Ionicons
                name={category.icon as any}
                size={24}
                color={category.iconColor}
              />
            </View>

            <AppText variant="caption">{category.label}</AppText>
          </Pressable>
        ))}
      </View>
      <Pressable onPress={DateTimePicker}>
        <AppInput
          label="Date"
          value={formData.date.toLocaleDateString()}
          editable={false}
          rightIcon={
            <Ionicons
              name="calendar-outline"
              size={20}
              color={colors.textSecondary}
              style={styles.dateContent}
            />
          }
        />
      </Pressable>

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
    margin: spacing["2xl"],
  },
  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldContainer: {
    marginBottom: spacing.lg,
  },
  categoryGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  categoryItem: {
    alignItems: "center",
    gap: spacing.sm,
  },
  iconContainer: {
    width: 56,
    height: 56,

    borderRadius: 16,

    justifyContent: "center",
    alignItems: "center",
  },
  dateContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
});
