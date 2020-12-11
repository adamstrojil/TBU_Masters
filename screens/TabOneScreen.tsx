import * as React from 'react';
import { ActivityIndicator, Button, StyleSheet, TextInput, ToastAndroid } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

type Database = {
  affirmations: Array<string>
}

type Response = {
  affirmation: string
}
export const DATABASE_KEY = "key"

export const getMyObject = async (key: string): Promise<Database> => {
  //try {
  const jsonValue = await AsyncStorage.getItem(key)

  return jsonValue ? JSON.parse(jsonValue) : { affirmations: [] }
}

export default function TabOneScreen() {
  const [title, setTitle] = React.useState<string>("")
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  
  React.useEffect(()=>{
    fetchRandomAffirmation()
  },[])

  const showToast = (message: string) => {
    ToastAndroid.show(
      message,
      ToastAndroid.SHORT,
    );
  };

  const fetchRandomAffirmation = () => {
    setTitle("")
    setIsLoading(true)
    fetch('https://www.affirmations.dev/')
      .then(response => response.json())
      .then(({ affirmation }: Response) => {
        setIsLoading(false)
        setTitle(affirmation)
      })
      .catch((err) => console.log(err));
  }

  const setObjectValue = async (value: Database, key: string) => {
    try {
      const jsonValue = value ? JSON.stringify(value) : "null"
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      console.log('e: ', e);
    }

    console.log('saved.')
  }

  const saveAffirmation = (affirmation: string) => {
    getMyObject("key").then((database: Database) => {
      console.log('database: ', database);
      database
        ? setObjectValue({ affirmations: [...database.affirmations, affirmation] }, DATABASE_KEY)
        : setObjectValue({ affirmations: [affirmation] }, DATABASE_KEY)
    })
    showToast("The affirmation has been saved")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      { isLoading && <ActivityIndicator color="#FFFFFF" size="large" />}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="/screens/TabOneScreen.js" /> */}
      <Ionicons size={40} color="white" style={{ marginVertical:16 }} onPress={fetchRandomAffirmation} name="ios-refresh"/>
      {/* <Button
        color='rgba(47,47,47,1.0)'
        title="get some!"
        onPress={fetchRandomAffirmation}
      > 
      </Button>*/}
      <View style={{ marginVertical: 16 }} />
      <Button
        title="save me this one pls!"
        onPress={() => saveAffirmation(title)}
        color='rgba(47,47,47,1.0)'
      >
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
