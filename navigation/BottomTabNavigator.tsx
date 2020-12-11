import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import SplashScreen from '../screens/SplashScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, SplashScreenParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="SplashScreen"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      {/* <BottomTab.Screen
        name="Landin"
        component={SplashScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="" color={color} />,
        }}
      /> */}
      <BottomTab.Screen
        name="Affirmation"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-sunny" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-star" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const SplashScreenStack = createStackNavigator<SplashScreenParamList>();

function SplashScreenNavigator() {
  return (
    <SplashScreenStack.Navigator>
      <SplashScreenStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerTitle: 'Landing Page' }}
      />
    </SplashScreenStack.Navigator>
  );
}
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Affirmation"
        component={TabOneScreen}
        //options={{ headerTitle: 'Talk nice to me' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Favorites"
        component={TabTwoScreen}
        options={{ headerTitle: 'Favorites' }}
      />
    </TabTwoStack.Navigator>
  );
}
