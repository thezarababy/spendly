import { colors } from "@/constants/colors";
import { radius } from "@/constants/radius";
import { spacing } from "@/constants/spacing";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import AppText from "../ui/AppText";

const { height } = Dimensions.get("window");

export interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
  iconColor: string;
}

export const CATEGORIES: Category[] = [
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
    id: "shopping",
    label: "Shopping",
    icon: "basket",
    color: "#FFEAEA",
    iconColor: "#FF4D4D",
  },
  {
    id: "salary",
    label: "Salary",
    icon: "briefcase",
    color: "#E8F8EE",
    iconColor: "#00C853",
  },
  {
    id: "freelance",
    label: "Freelance",
    icon: "laptop",
    color: "#E6F9FF",
    iconColor: "#00B4D8",
  },
  {
    id: "health",
    label: "Health",
    icon: "heart",
    color: "#FFF0F0",
    iconColor: "#FF4B4B",
  },
  {
    id: "entertainment",
    label: "Entertainment",
    icon: "play-circle",
    color: "#FFF0F7",
    iconColor: "#EA4C89",
  },
  {
    id: "others",
    label: "Others",
    icon: "ellipsis-horizontal",
    color: "#F5F5F5",
    iconColor: "#666",
  },
];

interface CategoryModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectCategory: (label: string) => void;
  selectedCategory: string;
}

export default function CategoryModal({
  isVisible,
  onClose,
  onSelectCategory,
  selectedCategory,
}: CategoryModalProps) {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <View style={styles.dragIndicator} />
            <View style={styles.titleRow}>
              <AppText variant="title">Select Category</AppText>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </Pressable>
            </View>
          </View>

          <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => {
              const isSelected = selectedCategory === item.label;
              return (
                <Pressable
                  style={[
                    styles.categoryItem,
                    isSelected && styles.selectedCategoryItem,
                  ]}
                  onPress={() => {
                    onSelectCategory(item.label);
                    onClose();
                  }}
                >
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: item.color },
                      isSelected && { borderWidth: 2, borderColor: item.iconColor },
                    ]}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={28}
                      color={item.iconColor}
                    />
                  </View>
                  <AppText
                    variant="caption"
                    style={[
                      styles.categoryLabel,
                      isSelected && {
                        color: colors.text,
                        fontFamily: "Inter_600SemiBold",
                      },
                    ]}
                  >
                    {item.label}
                  </AppText>
                </Pressable>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  contentContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius["2xl"],
    borderTopRightRadius: radius["2xl"],
    maxHeight: height * 0.7,
    minHeight: height * 0.45,
    paddingBottom: spacing["3xl"],
  },
  header: {
    alignItems: "center",
    paddingTop: spacing.md,
    paddingHorizontal: spacing["2xl"],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dragIndicator: {
    width: 36,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginBottom: spacing.md,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: spacing.lg,
  },
  closeButton: {
    padding: spacing.xs,
  },
  listContent: {
    padding: spacing.xl,
    alignItems: "center",
  },
  categoryItem: {
    width: "30%",
    marginHorizontal: "1.5%",
    marginVertical: spacing.md,
    alignItems: "center",
    gap: spacing.xs,
  },
  selectedCategoryItem: {
    transform: [{ scale: 1.05 }],
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryLabel: {
    marginTop: spacing.xs,
    textAlign: "center",
  },
});
