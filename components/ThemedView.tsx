import React from "react";
import { View, ViewProps } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

interface ThemedViewProps extends ViewProps {
  variant?: "default" | "card" | "surface";
}

export function ThemedView({
  style,
  variant = "default",
  ...props
}: ThemedViewProps) {
  const colorScheme = useColorScheme() ?? "light";

  const getBackgroundColor = () => {
    switch (variant) {
      case "card":
        return Colors[colorScheme].card;
      case "surface":
        return Colors[colorScheme].surface;
      default:
        return Colors[colorScheme].background;
    }
  };

  return (
    <View
      style={[
        {
          backgroundColor: getBackgroundColor(),
        },
        style,
      ]}
      {...props}
    />
  );
}
