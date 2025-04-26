"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Animated,
  Easing,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/ui/Button";
import { FontAwesome5 } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");

type GiftImage = {
  url: string;
  source: "dog" | "onePiece";
};

export default function GiftScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const score = Number(params.score || 0);
  const total = Number(params.total || 5);

  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const [gift, setGift] = useState<GiftImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [error, setError] = useState("");

  // Animation values
  const giftScale = useRef(new Animated.Value(1)).current;
  const giftRotate = useRef(new Animated.Value(0)).current;
  const giftOpacity = useRef(new Animated.Value(1)).current;
  const imageScale = useRef(new Animated.Value(0)).current;
  const confettiOpacity = useRef(new Animated.Value(0)).current;
  const confettiPosition = useRef(new Animated.Value(0)).current;

  // Helper function to choose which API to use based on the score
  const chooseApiBasedOnScore = () => {
    // If score is more than 60%, show One Piece character, otherwise show dog
    return score / total >= 0.6 ? "onePiece" : "dog";
  };

  // Fetch image from APIs
  const fetchImage = async () => {
    setIsLoading(true);
    setError("");

    try {
      const api = chooseApiBasedOnScore();

      if (api === "dog") {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        if (data.status === "success") {
          setGift({
            url: data.message,
            source: "dog",
          });
        } else {
          throw new Error("Failed to fetch dog image");
        }
      } else {
        // One Piece API
        // Using a random character ID between 1-50 since we don't have direct API docs
        const characterId = Math.floor(Math.random() * 50) + 1;
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/21/characters`
        );
        const data = await response.json();

        if (data.data && data.data.length > 0) {
          const randomCharacter =
            data.data[Math.floor(Math.random() * data.data.length)];
          setGift({
            url:
              randomCharacter.character.images.jpg.image_url ||
              "https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/One_Piece_Logo.svg/1280px-One_Piece_Logo.svg.png",
            source: "onePiece",
          });
        } else {
          throw new Error("Failed to fetch One Piece character");
        }
      }
    } catch (err) {
      console.error("Error fetching gift image:", err);
      setError("Não foi possível carregar o presente. Tente novamente!");
      // Fallback image in case of error
      setGift({
        url: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
        source: chooseApiBasedOnScore(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Animation sequence for opening the gift
  const openGift = () => {
    // Animation sequence
    Animated.sequence([
      // Step 1: Scale up the gift slightly
      Animated.timing(giftScale, {
        toValue: 1.1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.bounce,
      }),

      // Step 2: Shake the gift
      Animated.sequence([
        Animated.timing(giftRotate, {
          toValue: 0.05,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(giftRotate, {
          toValue: -0.05,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(giftRotate, {
          toValue: 0.05,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(giftRotate, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),

      // Step 3: Explode the gift (fade out and scale down)
      Animated.parallel([
        Animated.timing(giftOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(giftScale, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),

        // Show confetti
        Animated.timing(confettiOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(confettiPosition, {
          toValue: 200,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),

      // Step 4: Show the image (scale up)
      Animated.spring(imageScale, {
        toValue: 1,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsOpened(true);

      // After 2 seconds, show the proper results screen based on score
      setTimeout(() => {
        if (score / total >= 0.6) {
          router.push({
            pathname: "/screens/success-screen",
            params: { imageUrl: gift?.url },
          });
        } else {
          router.push({
            pathname: "/screens/error-screen",
            params: { imageUrl: gift?.url },
          });
        }
      }, 2000);
    });
  };

  useEffect(() => {
    // Fetch the gift image as soon as the component mounts
    fetchImage();
  }, []);

  // Rotate interpolation for the shake animation
  const rotate = giftRotate.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-30deg", "30deg"],
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.giftContainer}>
        <ThemedText variant="heading" style={styles.title}>
          {isOpened ? "Presente Aberto!" : "Seu Presente Está Pronto!"}
        </ThemedText>

        <ThemedText variant="secondary" style={styles.subtitle}>
          {isOpened
            ? score / total >= 0.6
              ? "Parabéns pelo seu excelente desempenho!"
              : "Continue praticando para melhorar!"
            : "Toque no presente para abrir"}
        </ThemedText>

        {/* Confetti animation (only visible when gift is opened) */}
        {Array.from({ length: 20 }).map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.confetti,
              {
                left: `${5 + (i % 5) * 22}%`,
                opacity: confettiOpacity,
                transform: [
                  {
                    translateY: Animated.multiply(
                      confettiPosition,
                      ((i % 3) + 1) / 2
                    ),
                  },
                  { rotate: `${(i % 2 ? -1 : 1) * (i % 60)}deg` },
                ],
                backgroundColor: [
                  colors.primary,
                  colors.accent,
                  "#FF9F43",
                  colors.secondary,
                ][i % 4],
              },
            ]}
          />
        ))}

        {isLoading ? (
          <ThemedView style={styles.loadingContainer}>
            <FontAwesome5
              name="spinner"
              size={40}
              color={colors.primary}
              style={{ opacity: 0.7 }}
            />
            <ThemedText variant="secondary" style={{ marginTop: 16 }}>
              Preparando seu presente...
            </ThemedText>
          </ThemedView>
        ) : error ? (
          <ThemedView style={styles.errorContainer}>
            <FontAwesome5 name="exclamation-circle" size={40} color="#FF6B6B" />
            <ThemedText
              variant="secondary"
              style={{ marginTop: 16, textAlign: "center" }}
            >
              {error}
            </ThemedText>
            <Button
              title="Tentar Novamente"
              onPress={fetchImage}
              style={{ marginTop: 20 }}
            />
          </ThemedView>
        ) : (
          <>
            {/* The Gift Box (hidden after opening) */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={openGift}
              disabled={isOpened}
            >
              <Animated.View
                style={[
                  styles.gift,
                  {
                    opacity: giftOpacity,
                    transform: [{ scale: giftScale }, { rotate }],
                  },
                ]}
              >
                <FontAwesome5
                  name="gift"
                  size={100}
                  color={score / total >= 0.6 ? "#FF9F43" : "#6C63FF"}
                />
              </Animated.View>
            </TouchableOpacity>

            {/* The reward image (shown after opening) */}
            <Animated.View
              style={[
                styles.giftImageContainer,
                {
                  transform: [{ scale: imageScale }],
                },
              ]}
            >
              <Image
                source={{ uri: gift?.url }}
                style={styles.giftImage}
                resizeMode="contain"
              />
            </Animated.View>
          </>
        )}

        <ThemedText variant="caption" style={styles.description}>
          {isOpened
            ? gift?.source === "onePiece"
              ? "Um personagem de One Piece para te inspirar!"
              : "Um amigo canino para te animar!"
            : "O que será que tem dentro?"}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  giftContainer: {
    alignItems: "center",
    padding: 20,
    width: width * 0.9,
    maxWidth: 400,
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 40,
  },
  gift: {
    width: 180,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  giftImageContainer: {
    width: 220,
    height: 220,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  giftImage: {
    width: "100%",
    height: "100%",
  },
  description: {
    marginTop: 24,
    textAlign: "center",
  },
  loadingContainer: {
    width: 180,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  errorContainer: {
    width: 220,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    padding: 20,
  },
  confetti: {
    position: "absolute",
    width: 10,
    height: 20,
    top: -20,
    zIndex: -1,
  },
});
