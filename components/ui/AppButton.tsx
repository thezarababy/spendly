import React from "react";
import {
  Pressable,
  StyleSheet,
} from "react-native";

import AppText from "./AppText";

import {
  colors,
  radius,
  spacing,
} from "@/constants";

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export default function AppButton({
  title,
  onPress,
  disabled = false,
}: Props) {
  return (
    <Pressable
      style={[
        styles.button,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <AppText
        style={styles.text}
      >
        {title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
   
  },

  disabled: {
    opacity: 0.5,
  },

  text: {
    color: colors.white,
    fontFamily: "Inter_600SemiBold",
  },
});