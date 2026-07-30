import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Ionicons } from "@expo/vector-icons";

import AppButton from "../ui/AppButton";
import AppInput from "../ui/AppInput";
import AppText from "../ui/AppText";
import TransactionToggle from "./transactionToggle";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";

import {
  TransactionFormData,
  transactionSchema,
} from "@/app/lib/validation/transactionSchema";

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
  onSave: () => void;
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

export default function TransactionForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),

    defaultValues: {
      transactionType: "expense",
      title: "",
      amount: "",
      category: "",
      date: "",
      notes: "",
    },
  });

  const onSubmit = (data: TransactionFormData) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="transactionType"
        render={({ field: { value, onChange } }) => (
          <TransactionToggle value={value} onChange={onChange} />
        )}
      />

      <Controller
        control={control}
        name="title"
        render={({ field: { value, onChange } }) => (
          <AppInput
            label="Title"
            placeholder="e.g. Groceries"
            value={value}
            onChangeText={onChange}
            error={errors.title?.message}
            autoCapitalize="words"
          />
        )}
      />
      <Controller
        control={control}
        name="amount"
        render={({ field: { value, onChange } }) => (
          <AppInput
            label="Amount"
            placeholder="e.g. 15000"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            error={errors.amount?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="category"
        render={({ field: { value, onChange } }) => (
          <>
            <AppInput
              label="Category"
              placeholder="Select Category"
              value={value}
              editable={false}
              onPress={() => {}}
              rightIcon={
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color={colors.textSecondary}
                />
              }
              error={errors.category?.message}
            />

            <View style={styles.categoryGrid}>
              {categories.map((category) => (
                <Pressable
                  key={category.id}
                  style={styles.categoryItem}
                  onPress={() => onChange(category.label)}
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
          </>
        )}
      />
      <Controller
        control={control}
        name="date"
        render={({ field: { value, onChange } }) => (
          <AppInput
            label="Date"
            placeholder="YYYY-MM-DD"
            value={value}
            onChangeText={onChange}
            rightIcon={
              <Ionicons
                name="calendar-outline"
                size={20}
                color={colors.textSecondary}
              />
            }
            error={errors.date?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="notes"
        render={({ field: { value, onChange } }) => (
          <AppInput
            label="Notes"
            placeholder="Add a note..."
            value={value ?? ""}
            onChangeText={onChange}
            multiline
            numberOfLines={4}
            error={errors.notes?.message}
            autoCapitalize="sentences"
          />
        )}
      />
      <AppButton title="Save Transaction" onPress={handleSubmit(onSubmit)} />
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
