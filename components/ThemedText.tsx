import React from "react";
import { Text, TextProps } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

interface ThemedTextProps extends TextProps {
  variant?: "default" | "secondary" | "heading" | "subheading" | "caption";
}

export function ThemedText({
  style,
  variant = "default",
  ...props
}: ThemedTextProps) {
  const colorScheme = useColorScheme() ?? "light";

  const getTextStyle = () => {
    const baseStyle = {
      color: Colors[colorScheme].text,
    };

    switch (variant) {
      case "heading":
        return {
          ...baseStyle,
          fontSize: 24,
          fontWeight: "700",
          letterSpacing: 0.5,
        };
      case "subheading":
        return {
          ...baseStyle,
          fontSize: 18,
          fontWeight: "600",
        };
      case "secondary":
        return {
          color: Colors[colorScheme].secondaryText,
          fontSize: 14,
        };
      case "caption":
        return {
          color: Colors[colorScheme].secondaryText,
          fontSize: 12,
        };
      default:
        return baseStyle;
    }
  };

  return <Text style={[getTextStyle(), style]} {...props} />;
}
