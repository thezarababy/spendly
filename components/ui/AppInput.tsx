import { colors, radius, spacing } from "@/constants";
import React from "react";
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import AppText from "./AppText";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;

  error?: string;

  keyboardType?: KeyboardTypeOptions;

  editable?: boolean;

  multiline?: boolean;

  numberOfLines?: number;

  rightIcon?: React.ReactNode;

  autoCapitalize?: "none" | "sentences" | "words" | "characters";

  onPress?: () => void;
}

export default function AppInput({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  error,
  editable = true,
  multiline = false,
  numberOfLines = 1,
  rightIcon,
  autoCapitalize = "sentences",
  onPress,
}: Props) {
  return (
    <View style={styles.container}>
      <AppText variant="body" style={styles.label}>
        {label}
      </AppText>

      {onPress ? (
        <Pressable onPress={onPress} android_ripple={{ color: "transparent" }}>
          <View style={[styles.inputContainer, error && styles.error]}>
            <TextInput
              placeholder={placeholder}
              value={value}
              onChangeText={onChangeText}
              keyboardType={keyboardType}
              editable={editable}
              pointerEvents={editable ? "auto" : "none"}
              multiline={multiline}
              autoCapitalize={autoCapitalize}
              numberOfLines={numberOfLines}
              style={[
                styles.input,
                multiline && styles.multilineInput,
                styles.inputNoOutline,
              ]}
              underlineColorAndroid="transparent"
              placeholderTextColor={colors.textSecondary}
            />

            {rightIcon}
          </View>
        </Pressable>
      ) : (
        <View style={[styles.inputContainer, error && styles.error]}>
          <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            editable={editable}
            pointerEvents={editable ? "auto" : "none"}
            multiline={multiline}
            autoCapitalize={autoCapitalize}
            numberOfLines={numberOfLines}
            style={[
              styles.input,
              multiline && styles.multilineInput,
              styles.inputNoOutline,
            ]}
            underlineColorAndroid="transparent"
            placeholderTextColor={colors.textSecondary}
          />

          {rightIcon}
        </View>
      )}

      {error && (
        <AppText variant="caption" style={styles.error}>
          {error}
        </AppText>
      )}
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
  },
  input: {
    flex: 1,
    height: 52,
    fontSize: 16,
    color: colors.text,
  },
  error: {
    color: colors.danger,
    marginTop: 4,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
    paddingVertical: spacing.md,
  },
  inputNoOutline: {
    outlineWidth: 0,
    outlineColor: "transparent",
  },
});
