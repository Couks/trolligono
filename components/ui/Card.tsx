import React from "react";
import { StyleSheet, ViewProps, Pressable } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";

interface CardProps extends ViewProps {
  onPress?: () => void;
  elevated?: boolean;
}

export function Card({
  children,
  style,
  onPress,
  elevated = true,
  ...props
}: CardProps) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const cardContent = (
    <ThemedView
      variant="card"
      style={[
        styles.card,
        elevated && {
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        },
        { borderColor: colors.border },
        style,
      ]}
      {...props}
    >
      {children}
    </ThemedView>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [pressed && { opacity: 0.9 }]}
      >
        {cardContent}
      </Pressable>
    );
  }

  return cardContent;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
});
