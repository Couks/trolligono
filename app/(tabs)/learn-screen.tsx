"use client";

import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

const polygons = [
  {
    id: 1,
    name: "Triângulo",
    sides: 3,
    description:
      "Um polígono com três lados e três ângulos. A soma dos ângulos internos é sempre 180°.",
    properties: [
      "Pode ser equilátero (todos os lados iguais)",
      "Pode ser isósceles (dois lados iguais)",
      "Pode ser escaleno (todos os lados diferentes)",
    ],
    icon: "change-history" as const,
  },
  {
    id: 2,
    name: "Quadrilátero",
    sides: 4,
    description:
      "Um polígono com quatro lados e quatro ângulos. A soma dos ângulos internos é sempre 360°.",
    properties: [
      "Inclui quadrados, retângulos, paralelogramos, losangos e trapézios",
      "Um quadrado tem todos os lados iguais e todos os ângulos retos",
      "Um retângulo tem todos os ângulos retos, mas lados opostos iguais",
    ],
    icon: "square" as const,
  },
  {
    id: 3,
    name: "Pentágono",
    sides: 5,
    description:
      "Um polígono com cinco lados e cinco ângulos. A soma dos ângulos internos é 540°.",
    properties: [
      "Pode ser regular (todos os lados e ângulos iguais) ou irregular",
      "Um pentágono regular tem ângulos internos de 108°",
      "Aparece em muitos símbolos e na natureza",
    ],
    icon: "pentagon" as const,
  },
  {
    id: 4,
    name: "Hexágono",
    sides: 6,
    description:
      "Um polígono com seis lados e seis ângulos. A soma dos ângulos internos é 720°.",
    properties: [
      "Pode ser regular (todos os lados e ângulos iguais) ou irregular",
      "Um hexágono regular tem ângulos internos de 120°",
      "Aparece em favos de mel e em muitas estruturas naturais",
    ],
    icon: "hexagon" as const,
  },
];

export default function LearnScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const [selectedPolygon, setSelectedPolygon] = useState(polygons[0]);

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText variant="heading" style={styles.title}>
          Polígonos
        </ThemedText>

        <ThemedText variant="secondary" style={styles.introduction}>
          Polígonos são figuras geométricas planas formadas por segmentos de
          reta conectados, onde cada segmento encontra exatamente dois outros
          segmentos, um em cada extremidade.
        </ThemedText>

        {/* Polygon selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.polygonSelector}
        >
          {polygons.map((polygon) => (
            <ThemedView
              key={polygon.id}
              style={[
                styles.polygonTab,
                selectedPolygon.id === polygon.id && {
                  backgroundColor: colors.surfaceHighlight,
                  borderColor: colors.primary,
                },
              ]}
              onTouchEnd={() => setSelectedPolygon(polygon)}
            >
              <MaterialIcons
                name={polygon.icon}
                size={20}
                color={
                  selectedPolygon.id === polygon.id
                    ? colors.primary
                    : colors.icon
                }
              />
              <ThemedText
                style={[
                  styles.polygonTabText,
                  selectedPolygon.id === polygon.id && {
                    color: colors.primary,
                  },
                ]}
              >
                {polygon.name}
              </ThemedText>
            </ThemedView>
          ))}
        </ScrollView>

        {/* Selected polygon details */}
        <Card style={styles.polygonCard}>
          <ThemedView style={styles.polygonHeader}>
            <ThemedView>
              <ThemedText variant="subheading">
                {selectedPolygon.name}
              </ThemedText>
              <ThemedText variant="secondary">
                {selectedPolygon.sides} lados
              </ThemedText>
            </ThemedView>
            <ThemedView
              style={[
                styles.polygonIcon,
                { backgroundColor: colors.surfaceHighlight },
              ]}
            >
              <MaterialIcons
                name={selectedPolygon.icon}
                size={32}
                color={colors.primary}
              />
            </ThemedView>
          </ThemedView>

          <ThemedText style={styles.polygonDescription}>
            {selectedPolygon.description}
          </ThemedText>

          <ThemedText variant="subheading" style={styles.propertiesTitle}>
            Propriedades
          </ThemedText>

          {selectedPolygon.properties.map((property, index) => (
            <ThemedView key={index} style={styles.propertyItem}>
              <MaterialIcons
                name="check-circle"
                size={16}
                color={colors.primary}
              />
              <ThemedText style={styles.propertyText}>{property}</ThemedText>
            </ThemedView>
          ))}

          <Button
            title="Exercícios Práticos"
            style={styles.exerciseButton}
            icon={<MaterialIcons name="edit" size={16} color="#FFF" />}
          />
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
  title: {
    marginBottom: 8,
  },
  introduction: {
    marginBottom: 24,
  },
  polygonSelector: {
    flexDirection: "row",
    marginBottom: 16,
  },
  polygonTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
  },
  polygonTabText: {
    marginLeft: 8,
    fontWeight: "500",
  },
  polygonCard: {
    marginBottom: 16,
  },
  polygonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.0)",
  },
  polygonIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  polygonDescription: {
    marginBottom: 16,
    lineHeight: 22,
  },
  propertiesTitle: {
    marginBottom: 12,
  },
  propertyItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  propertyText: {
    marginLeft: 8,
    flex: 1,
  },
  exerciseButton: {
    marginTop: 16,
  },
  formulaCard: {
    marginBottom: 16,
  },
  formula: {
    marginTop: 16,
  },
  formulaText: {
    fontWeight: "600",
    fontSize: 18,
    marginVertical: 8,
  },
});
