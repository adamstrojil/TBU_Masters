import * as React from "react";
import { useState, useEffect } from "react";
import { ActivityIndicator, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

type Database = {
  affirmations: Array<string>;
};

type Response = {
  affirmation: string;
};

export const DATABASE_KEY = "key";

export const getMyObject = async (key: string): Promise<Database> => {
  const jsonValue = await AsyncStorage.getItem(key);

  return jsonValue ? JSON.parse(jsonValue) : { affirmations: [] };
};

export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  const [title, setTitle] = useState<string>("");
  const [buttonTitle, setButtonTitle] = useState<string>("Save this one!");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchRandomAffirmation();
  }, []);

  const fetchRandomAffirmation = () => {
    setTitle("");
    setButtonTitle("");
    setButtonDisabled(true);
    setIsLoading(true);
    fetch("https://www.affirmations.dev/")
      .then((response) => response.json())
      .then(({ affirmation }: Response) => {
        setIsLoading(false);
        setTitle(affirmation);
        setButtonDisabled(false);
        setButtonTitle("Save this one!");
      })
      .catch((err) => console.log(err));
  };

  const setObjectValue = async (value: Database, key: string) => {
    try {
      const jsonValue = value ? JSON.stringify(value) : "null";
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log("e: ", e);
    }
  };

  const saveAffirmation = (affirmation: string) => {
    getMyObject("key").then((database: Database) => {
      database
        ? setObjectValue(
            { affirmations: [...database.affirmations, affirmation] },
            DATABASE_KEY
          )
        : setObjectValue({ affirmations: [affirmation] }, DATABASE_KEY);
    });
    setButtonTitle("Saved!");
    setButtonDisabled(true);
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.title}>{title}</Text>
      {isLoading && <ActivityIndicator color="#FFFFFF" size="large" />}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Ionicons
        size={40}
        color={Colors[colorScheme].tint}
        style={{ marginVertical: 16 }}
        onPress={fetchRandomAffirmation}
        name="ios-refresh"
      />
      <View style={{ marginVertical: 16 }} />
      <Button
        title={buttonTitle}
        onPress={() => saveAffirmation(title)}
        color={Colors[colorScheme].tint}
        disabled={buttonDisabled}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    paddingHorizontal: 16,
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
