import * as React from 'react';
import { AsyncStorage, Button, FlatList, ScrollView, SectionList, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';
import { DATABASE_KEY, getMyObject } from './TabOneScreen';



export default function TabTwoScreen() {
  const [affirmationList, setAffirmationList] = React.useState<Array<string>>([])
  const [filteredResults, setFilteredresults] = React.useState<Array<string>>([])
  const [query, setQuery] = React.useState<string>("")

  React.useEffect(() => {
    getMyObject(DATABASE_KEY).then(database => database.affirmations).then(affirmations => {
      setAffirmationList(affirmations)
    })
  })

  React.useEffect(() => {
    setFilteredresults(query
      ? affirmationList.filter(affirmation => affirmation.toLowerCase().includes(query.toLowerCase()))
      : affirmationList)
  }, [query])

  const clearAll = async () => {
    try {
      //setFilteredresults([])
      await AsyncStorage.clear()
      setAffirmationList([])
    } catch (e) {
      console.log('e: ', e);
    }
    console.log('Done clearing.')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of saved affirmations</Text>
      <TextInput
        multiline
        numberOfLines={2}
        placeholderTextColor="rgb(200,200,200)"
        onChangeText={(text: string) => setQuery(text)}
        value={query}
        placeholder="Search..."
        style={{ height: "auto", borderColor: 'gray', borderWidth: 1, color: "white", width: "70%", paddingHorizontal: 8, marginVertical: 8 }}
      />
      <View style={styles.list}>
        {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
        <FlatList
          data={query && filteredResults.length ? filteredResults : affirmationList}
          renderItem={({ item }) =>
            <View>
              <Text style={styles.item}>- {item}</Text>
              {/* <Button title="remove" onPress={() => { }} color='rgba(47,47,47,1.0)' /> */}
            </View>}
          keyExtractor={(item, index) => index.toString()}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16
  },
  list: {
    flex: 1,
    //marginHorizontal:16,
    width: "90%",
    // alignItems: 'center',
    // justifyContent: 'center',
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
    backgroundColor: 'rgba(47,47,47,1.0)',
  },
  item: {
    backgroundColor: 'rgba(27,27,27,1.0)',
    padding: 10,
    paddingBottom: 8,
    fontSize: 14,
    //height: 44,
  },
});
