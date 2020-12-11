import * as React from 'react';
import { ActivityIndicator, Button, StyleSheet } from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function SplashScreen({navigation}:any) {

    React.useEffect(()=>{
        setTimeout(() => navigation.navigate('TabOne'), 3500)
    }, [])

  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>WELCOME BIATCH!</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ActivityIndicator color="#FFFFFF" size="large"/>
      <Text style={styles.loading}>Fake it till you make it</Text>

      {/* <EditScreenInfo path="/screens/SplashScreen.js" /> */}
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  loading: {
    fontSize: 8,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
