import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";

import { colors, typography } from "@/constants";

type Variant = "heading" | "title" | "body" | "caption";

interface AppTextProps extends TextProps {
  variant?: Variant;
  style?: StyleProp<TextStyle>;
  color?: string;
}

export default function AppText({
  children,
  variant = "body",
  style,
  color,
  ...props
}: AppTextProps) {
  return (
    <Text
      style={[styles.base, styles[variant], style, color && { color }]}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
    fontFamily: typography.fontFamily.regular,
  },

  heading: {
    fontSize: typography.fontSize["3xl"],
    fontFamily: typography.fontFamily.bold,
  },

  title: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.semiBold,
  },

  body: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.regular,
  },

  caption: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.regular,
  },
});
