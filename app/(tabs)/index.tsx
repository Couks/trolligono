import { useNavigation } from "expo-router";
import { StyleSheet, View, Text, Button } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Polígonos Divertidos 🎯</Text>
      <Button
        title="Começar Quiz"
        onPress={() => navigation.navigate("Quiz")}
      />
      <Button
        title="Aprender sobre Polígonos"
        onPress={() => navigation.navigate("Learn")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
