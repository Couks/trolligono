"use client";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Welcome Section */}
        <ThemedView style={styles.header}>
          <ThemedText variant="heading">Olá, Estudante!</ThemedText>
          <ThemedText variant="secondary" style={styles.subtitle}>
            Continue sua jornada matemática
          </ThemedText>
        </ThemedView>

        {/* Featured Card */}
        <Card style={styles.featuredCard}>
          <ThemedView style={styles.featuredContent}>
            <ThemedView>
              <ThemedText variant="subheading">Quiz Diário</ThemedText>
              <ThemedText variant="secondary" style={styles.cardDescription}>
                Teste seus conhecimentos sobre polígonos
              </ThemedText>
              <Button
                title="Iniciar Quiz"
                variant="primary"
                size="small"
                style={styles.cardButton}
                icon={
                  <MaterialIcons name="play-arrow" size={16} color="#FFF" />
                }
                onPress={() => router.push("/quiz-screen")}
              />
            </ThemedView>
            <ThemedView style={styles.featuredGraphic}>
              <MaterialIcons name="category" size={48} color={colors.primary} />
            </ThemedView>
          </ThemedView>
        </Card>

        {/* Learning Resources */}
        <ThemedView style={styles.sectionHeader}>
          <ThemedText variant="subheading">Recursos de Aprendizado</ThemedText>
        </ThemedView>

        <Card
          style={styles.resourceCard}
          onPress={() => router.push("/learn-screen")}
        >
          <ThemedView style={styles.resourceContent}>
            <Ionicons name="book-outline" size={24} color={colors.primary} />
            <ThemedView style={styles.resourceText}>
              <ThemedText variant="subheading">Polígonos</ThemedText>
              <ThemedText variant="secondary">
                Aprenda sobre formas geométricas
              </ThemedText>
            </ThemedView>
            <MaterialIcons name="chevron-right" size={24} color={colors.icon} />
          </ThemedView>
        </Card>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    marginTop: 8,
    marginBottom: 24,
  },
  subtitle: {
    marginTop: 4,
  },
  featuredCard: {
    marginBottom: 24,
    padding: 0,
    overflow: "hidden",
  },
  featuredContent: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardDescription: {
    marginTop: 4,
    marginBottom: 16,
  },
  cardButton: {
    alignSelf: "flex-start",
  },
  featuredGraphic: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    opacity: 0.9,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  topicsContainer: {
    paddingBottom: 8,
  },
  topicCard: {
    width: width * 0.7,
    marginRight: 16,
    padding: 16,
  },
  topicIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  topicTitle: {
    marginBottom: 4,
  },
  topicDescription: {
    marginBottom: 16,
  },
  progressContainer: {
    height: 6,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 3,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    textAlign: "right",
  },
  resourceCard: {
    marginBottom: 16,
    padding: 0,
  },
  resourceContent: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  resourceText: {
    flex: 1,
    marginLeft: 16,
  },
});
