import React, { useState } from "react";
import { Pressable, StyleSheet, View, Platform, Alert } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";

import AppButton from "../ui/AppButton";
import AppInput from "../ui/AppInput";
import AppText from "../ui/AppText";
import TransactionToggle from "./transactionToggle";
import CategoryModal from "./categoryModal";
import DateTimePicker from "@react-native-community/datetimepicker";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { useTransactions } from "@/store/TransactionContext";

import {
  TransactionFormData,
  transactionSchema,
} from "@/app/lib/validation/transactionSchema";

const quickCategories = [
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

const getTodayString = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const formatDateDisplay = (dateStr: string) => {
  if (!dateStr) return "";
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return dateStr;
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const parseDateString = (dateStr: string): Date => {
  if (!dateStr) return new Date();
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return new Date();
  return new Date(parts[0], parts[1] - 1, parts[2]);
};

export default function TransactionForm() {
  const { addTransaction } = useTransactions();
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

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
      date: getTodayString(),
      notes: "",
    },
  });

  const onSubmit = (data: TransactionFormData) => {
    addTransaction({
      title: data.title.trim(),
      amount: parseFloat(data.amount),
      type: data.transactionType,
      category: data.category,
      date: data.date,
      notes: data.notes?.trim(),
    });

    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) {
      // Ignore haptics error on unsupported runtimes (like web simulator)
    }

    router.back();
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
              placeholder="Select category"
              value={value}
              editable={false}
              onPress={() => setModalVisible(true)}
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
              {quickCategories.map((category) => {
                const isSelected = value === category.label;
                const isMoreItem = category.id === "more";
                return (
                  <Pressable
                    key={category.id}
                    style={styles.categoryItem}
                    onPress={() => {
                      if (isMoreItem) {
                        setModalVisible(true);
                      } else {
                        onChange(category.label);
                      }
                    }}
                  >
                    <View
                      style={[
                        styles.iconContainer,
                        {
                          backgroundColor: category.color,
                        },
                        isSelected && {
                          borderWidth: 2,
                          borderColor: category.iconColor,
                        },
                      ]}
                    >
                      <Ionicons
                        name={category.icon as any}
                        size={24}
                        color={category.iconColor}
                      />
                    </View>

                    <AppText
                      variant="caption"
                      style={[
                        isSelected && {
                          color: colors.text,
                          fontFamily: "Inter_600SemiBold",
                        },
                      ]}
                    >
                      {category.label}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>

            <CategoryModal
              isVisible={modalVisible}
              onClose={() => setModalVisible(false)}
              onSelectCategory={onChange}
              selectedCategory={value}
            />
          </>
        )}
      />

      <Controller
        control={control}
        name="date"
        render={({ field: { value, onChange } }) => (
          <>
            <AppInput
              label="Date"
              placeholder="Select Date"
              value={formatDateDisplay(value)}
              editable={false}
              onPress={() => setShowDatePicker(true)}
              rightIcon={
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={colors.textSecondary}
                />
              }
              error={errors.date?.message}
            />

            {showDatePicker && (
              <DateTimePicker
                value={parseDateString(value)}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(Platform.OS === "ios");
                  if (selectedDate) {
                    const yyyy = selectedDate.getFullYear();
                    const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
                    const dd = String(selectedDate.getDate()).padStart(2, "0");
                    onChange(`${yyyy}-${mm}-${dd}`);
                  }
                }}
              />
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="notes"
        render={({ field: { value, onChange } }) => (
          <AppInput
            label="Notes (optional)"
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

      <View style={styles.buttonContainer}>
        <AppButton title="Save Transaction" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: spacing["2xl"],
  },
  categoryGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  categoryItem: {
    alignItems: "center",
    gap: spacing.xs,
    width: "22%",
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  buttonContainer: {
    marginTop: spacing.xl,
  },
});
