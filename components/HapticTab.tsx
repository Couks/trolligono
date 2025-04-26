import React from "react";
import { Pressable, StyleSheet, Platform } from "react-native";
import * as Haptics from "expo-haptics";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export function HapticTab({ children, style, onPress, ...props }: any) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const handlePress = (e: any) => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.(e);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.tab,
        {
          opacity: pressed ? 0.8 : 1,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
