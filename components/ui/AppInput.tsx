import React from "react";
import {
  TextInput,
  StyleSheet,
  View,
  KeyboardTypeOptions,
} from "react-native";

import AppText from "./AppText";

import {
  colors,
  radius,
  spacing,
} from "@/constants";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

export default function AppInput({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
}: Props) {
  return (
    <View style={styles.container}>
      <AppText
        variant="caption"
        style={styles.label}
      >
        {label}
      </AppText>

      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={styles.input}
        placeholderTextColor={colors.textSecondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },

  label: {
    marginBottom: spacing.sm,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.white,
    fontSize: 16,
    color: colors.text,
  },
});