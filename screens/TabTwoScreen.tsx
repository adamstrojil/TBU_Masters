import * as React from 'react';
import { AsyncStorage, Button, FlatList, StyleSheet, TextInput } from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';


import { Text, View } from '../components/Themed';
import { DATABASE_KEY, getMyObject } from './TabOneScreen';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';


export default function TabTwoScreen() {
  const [affirmationList, setAffirmationList] = React.useState<Array<string>>([])
  const [filteredResults, setFilteredresults] = React.useState<Array<string>>([])
  const [query, setQuery] = React.useState<string>("")
  const isFocused = useIsFocused()
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    isFocused && getMyObject(DATABASE_KEY)
      .then(({ affirmations }) => {
        setAffirmationList(affirmations)
      })
  }, [isFocused])

  React.useEffect(() => {
    console.log('affirmationList: ', affirmationList);
    setFilteredresults(query
      ? affirmationList.filter(affirmation => affirmation.toLowerCase().includes(query.toLowerCase()))
      : affirmationList)
  }, [query])

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
      setAffirmationList([])
    } catch (e) {
      console.log('e: ', e);
    }
    console.log('Done clearing.')
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16
  },
  list: {
    flex: 1,
    width: "90%",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 20,
    fontWeight: 'bold',
    //backgroundColor: Colors[colorScheme].listBackground, // 'rgba(47,47,47,1.0)',
  },
  item: {
    backgroundColor: Colors[colorScheme].listItemBackground, // 'rgba(47,47,47,1.0)',
    padding: 10,
    paddingBottom: 8,
    fontSize: 14,
  },
});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of saved affirmations</Text>
      <TextInput
        multiline
        numberOfLines={2}
        placeholderTextColor={Colors[colorScheme].placeholder}
        onChangeText={(text: string) => setQuery(text)}
        value={query}
        placeholder="Search..."
        style={{ height: "auto", borderColor: 'gray', borderWidth: 1, color:  Colors[colorScheme].text, width: "70%", paddingHorizontal: 8, marginVertical: 8 }}
      />
      <View style={styles.list}>
        <FlatList
          data={query ? filteredResults : affirmationList}
          renderItem={({ item }) =>
            <View>
              <Text style={styles.item}>- {item}</Text>
            </View>}
          keyExtractor={(_item, index) => index.toString()}
        />
      </View>

      {!query && !!affirmationList.length && <Button
        title="Clear list"
        onPress={clearAll}
        color="red"
      />}
    </View>
  );
  
}

