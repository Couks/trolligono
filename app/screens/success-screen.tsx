"use client";
import { StyleSheet, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/ui/Button";
import { FontAwesome5 } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function SuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const imageUrl = params.imageUrl as string;

  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <ThemedView
        style={[
          styles.iconContainer,
          { backgroundColor: "rgba(78, 205, 196, 0.1)" },
        ]}
      >
        <FontAwesome5 name="check-circle" size={64} color={colors.accent} />
      </ThemedView>

      <ThemedText variant="heading" style={styles.title}>
        Resposta Correta!
      </ThemedText>

      <ThemedText variant="secondary" style={styles.message}>
        Muito bem! Você acertou a questão. Continue assim para dominar os
        conceitos matemáticos.
      </ThemedText>

      {imageUrl && (
        <ThemedView style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.rewardImage}
            resizeMode="contain"
          />
          <ThemedText variant="caption" style={styles.imageCaption}>
            Seu prêmio pelo bom desempenho!
          </ThemedText>
        </ThemedView>
      )}

      <Button
        title="Continuar"
        onPress={() => router.replace("/(tabs)")}
        style={styles.button}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    minWidth: 200,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
    backgroundColor: "#FFF",
    padding: 8,
  },
  rewardImage: {
    width: "100%",
    height: "100%",
  },
  imageCaption: {
    textAlign: "center",
    marginTop: 8,
  },
});
