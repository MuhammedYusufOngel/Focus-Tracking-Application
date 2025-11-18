import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import HomePage from './pages/homepage/homepage.js'
import Dashboard from './pages/dashboard/dashboard.js'
import { useEffect } from 'react';

import * as SQLite from "expo-sqlite";

const Tab = createBottomTabNavigator();

async function initDB() {
    // Kütüphane nesnesinin varlığını kontrol edin
    if (!SQLite) {
        console.log("SQLite kütüphanesi yüklenemedi!");
        return; 
    }
    
    const db = SQLite.openDatabaseSync("test.db");

    if(db)
      console.log("isokay")

    // await db.transaction((query) => {
    //   query.executeSql(
    //     "INSERT INTO FocussingTracking (Time, Date, Category, TotalDistractions) VALUES (1500, '2025-11-18', 'project', 5)"
    //   )
    // })
};

function CreateTable(){
  const db = SQLite.openDatabaseSync("test.db");

  db.execSync(
    "CREATE TABLE IF NOT EXISTS FocussingTracking "+
    "(id INTEGER PRIMARY KEY AUTOINCREMENT, Time INTEGER, Date TEXT, Category TEXT, TotalDistractions INTEGER);"
  )

  console.log("İyi gidiyoruz") 
}

function CreateItems(time, date, category, totalDistractions){
  const db = SQLite.openDatabaseSync("test.db");

  db.runSync(
    "INSERT INTO FocussingTracking (Time, Date, Category, TotalDistractions) VALUES"+
    " (?, ?, ?, ?);", [time, date, category, totalDistractions]
  )
}

export default function TabMenu() {

  useEffect(() => {
    initDB()
    CreateTable()
    //CreateItems(1500, new Date(2025, 11, 18, 2, 30, 0).toString(), "project", 5)
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
        <Tab.Screen name='Dashboard' component={Dashboard} />
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