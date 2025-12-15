import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import HomePage from './pages/homepage/homepage.js'
import Dashboard from './pages/dashboard/dashboard.js'
import { useEffect } from 'react';

import * as SQLite from "expo-sqlite";

const Tab = createBottomTabNavigator();

export default function TabMenu() {

  useEffect(() => {
    DeleteItems()

    return () => {
      
    }
  }, [])

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({ focused, color, size}) => {
            let iconName
            
            if(route.name === 'Ana Sayfa') {
              iconName = focused ? 'home' : 'home-outline'
            } else if(route.name === 'Dashboard') {
              iconName = focused ? 'cloud' : 'cloud-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: '#00bcd4',
          tabBarInactiveTintColor: 'gray'
        })}
        >
        <Tab.Screen name='Ana Sayfa' component={HomePage} />
        <Tab.Screen name='Dashboard' component={Dashboard}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});