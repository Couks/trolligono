"use client";

import { useState } from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FontAwesome5 } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");

const questions = [
  {
    id: 1,
    question: "Qual é um polígono regular?",
    options: ["Quadrado", "Trapézio", "Círculo", "Linha"],
    correctAnswer: "Quadrado",
    explanation:
      "Um polígono regular tem todos os lados e ângulos iguais. O quadrado é um exemplo de polígono regular.",
  },
  {
    id: 2,
    question: "Qual é um polígono irregular?",
    options: [
      "Triângulo equilátero",
      "Trapézio",
      "Hexágono regular",
      "Círculo",
    ],
    correctAnswer: "Trapézio",
    explanation:
      "Um polígono irregular tem lados ou ângulos de diferentes medidas. O trapézio é um exemplo de polígono irregular.",
  },
  {
    id: 3,
    question: "Qual é um polígono de 5 lados?",
    options: ["Quadrado", "Pentágono", "Hexágono", "Círculo"],
    correctAnswer: "Pentágono",
    explanation:
      "O pentágono é um polígono com exatamente 5 lados e 5 vértices.",
  },
  {
    id: 4,
    question: "Qual é um polígono de 6 lados?",
    options: ["Quadrado", "Pentágono", "Hexágono", "Círculo"],
    correctAnswer: "Hexágono",
    explanation:
      "O hexágono é um polígono com exatamente 6 lados e 6 vértices.",
  },
  {
    id: 5,
    question: "Qual das seguintes opções NÃO é um polígono?",
    options: ["Quadrado", "Pentágono", "Hexágono", "Círculo"],
    correctAnswer: "Círculo",
    explanation:
      "Um polígono é uma figura fechada formada por segmentos de reta. O círculo tem uma borda curva, então não é um polígono.",
  },
];

export default function QuizScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  const openGift = () => {
    router.push({
      pathname: "/screens/gift-screen",
      params: { score: score.toString(), total: questions.length.toString() },
    });
  };

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  if (showResults) {
    return (
      <ThemedView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Card style={styles.resultsCard}>
            <ThemedText variant="heading" style={styles.resultsTitle}>
              Resultado do Quiz
            </ThemedText>

            <ThemedView style={styles.scoreContainer}>
              <ThemedView
                style={[
                  styles.scoreCircle,
                  {
                    backgroundColor: colors.surfaceHighlight,
                    borderColor: colors.primary,
                  },
                ]}
              >
                <ThemedText variant="heading" style={{ color: colors.primary }}>
                  {score}
                </ThemedText>
                <ThemedText variant="secondary">
                  de {questions.length}
                </ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedText variant="subheading" style={styles.resultMessage}>
              {score === questions.length
                ? "Excelente! Você acertou todas as questões!"
                : score >= questions.length / 2
                ? "Bom trabalho! Continue praticando."
                : "Continue estudando para melhorar seu conhecimento."}
            </ThemedText>

            {/* Gift button with animation */}
            <Button
              title="Abrir Presente!"
              onPress={openGift}
              style={styles.giftButton}
              icon={
                <FontAwesome5
                  name="gift"
                  size={16}
                  color="#FFF"
                  style={{ marginRight: 8 }}
                />
              }
            />

            <Button
              title="Tentar Novamente"
              onPress={resetQuiz}
              style={styles.actionButton}
              variant="outline"
            />

            <Button
              title="Voltar para Início"
              variant="text"
              onPress={() => router.push("/")}
              style={styles.actionButton}
            />
          </Card>
        </ScrollView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress indicator */}
        <ThemedView style={styles.progressIndicator}>
          {questions.map((_, index) => (
            <ThemedView
              key={index}
              style={[
                styles.progressDot,
                {
                  backgroundColor:
                    index === currentQuestionIndex
                      ? colors.primary
                      : index < currentQuestionIndex
                      ? colors.secondary
                      : colors.border,
                },
              ]}
            />
          ))}
        </ThemedView>

        <Card style={styles.questionCard}>
          <ThemedText variant="caption" style={styles.questionNumber}>
            Questão {currentQuestionIndex + 1} de {questions.length}
          </ThemedText>

          <ThemedText variant="subheading" style={styles.question}>
            {currentQuestion.question}
          </ThemedText>

          <ThemedView style={styles.options}>
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrectAnswer = option === currentQuestion.correctAnswer;

              let optionStyle = styles.option;
              const textStyle = {};

              if (isAnswered) {
                if (isSelected && isCorrect) {
                  optionStyle = { ...optionStyle, ...styles.correctOption };
                } else if (isSelected && !isCorrect) {
                  optionStyle = { ...optionStyle, ...styles.incorrectOption };
                } else if (isCorrectAnswer) {
                  optionStyle = { ...optionStyle, ...styles.correctOption };
                }
              } else if (isSelected) {
                optionStyle = { ...optionStyle, ...styles.selectedOption };
              }

              return (
                <ThemedView
                  key={option}
                  style={[
                    optionStyle,
                    {
                      borderColor:
                        isSelected && !isAnswered
                          ? colors.primary
                          : colors.border,
                    },
                  ]}
                  onTouchEnd={() => !isAnswered && handleAnswer(option)}
                >
                  <ThemedText style={textStyle}>{option}</ThemedText>

                  {isAnswered && isCorrectAnswer && (
                    <FontAwesome5
                      name="check-circle"
                      size={16}
                      color={colors.accent}
                      style={styles.optionIcon}
                    />
                  )}

                  {isAnswered && isSelected && !isCorrect && (
                    <FontAwesome5
                      name="times-circle"
                      size={16}
                      color="#FF6B6B"
                      style={styles.optionIcon}
                    />
                  )}
                </ThemedView>
              );
            })}
          </ThemedView>

          {isAnswered && (
            <ThemedView
              style={[
                styles.explanation,
                {
                  backgroundColor: isCorrect
                    ? "rgba(78, 205, 196, 0.1)"
                    : "rgba(255, 107, 107, 0.1)",
                  borderColor: isCorrect ? colors.accent : "#FF6B6B",
                },
              ]}
            >
              <ThemedText variant="secondary">
                {currentQuestion.explanation}
              </ThemedText>
            </ThemedView>
          )}

          {isAnswered && (
            <Button
              title={
                currentQuestionIndex < questions.length - 1
                  ? "Próxima Questão"
                  : "Ver Resultados"
              }
              onPress={handleNext}
              style={styles.nextButton}
            />
          )}
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
    alignItems: "center",
  },
  progressIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  questionCard: {
    width: "100%",
    padding: 20,
  },
  questionNumber: {
    marginBottom: 8,
  },
  question: {
    marginBottom: 24,
    textAlign: "center",
  },
  options: {
    width: "100%",
  },
  option: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedOption: {
    borderWidth: 2,
  },
  correctOption: {
    backgroundColor: "rgba(78, 205, 196, 0.1)",
    borderColor: "#4ECDC4",
    borderWidth: 2,
  },
  incorrectOption: {
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    borderColor: "#FF6B6B",
    borderWidth: 2,
  },
  optionIcon: {
    marginLeft: 8,
  },
  explanation: {
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
  },
  nextButton: {
    marginTop: 8,
  },
  resultsCard: {
    width: "100%",
    padding: 24,
    alignItems: "center",
  },
  resultsTitle: {
    marginBottom: 24,
    textAlign: "center",
  },
  scoreContainer: {
    marginBottom: 24,
    backgroundColor: "rgba(255, 255, 255, 0.0)",
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
  },
  resultMessage: {
    textAlign: "center",
    marginBottom: 32,
  },
  giftButton: {
    width: "100%",
    marginBottom: 16,
    backgroundColor: "#FF9F43",
  },
  actionButton: {
    width: "100%",
    marginBottom: 12,
  },
});
