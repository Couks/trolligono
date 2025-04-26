import { Tabs } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        headerStyle: {
          backgroundColor: colors.card,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 3,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTitleStyle: {
          color: colors.text,
          fontWeight: "600",
          fontSize: 18,
          letterSpacing: 0.5,
          textAlign: "center",
        },
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            height: 80,
            paddingBottom: 20,
          },
          android: {
            position: "relative",
            elevation: 0,
            height: 60,
            paddingTop: 10,
            paddingBottom: 10,
          },
          default: {},
        }),
        tabBarLabel: () => null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabItem}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={30}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="quiz-screen"
        options={{
          title: "Quiz Matemático",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabItem}>
              <MaterialIcons
                name={focused ? "star" : "star-outline"}
                size={30}
                color={color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="learn-screen"
        options={{
          title: "Aprenda Polígonos",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabItem}>
              <Ionicons
                name={focused ? "book" : "book-outline"}
                size={30}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
});
