import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import CounterSettings from './counter-settings.js'

export default function HomeScreen(){


  return (
    <View style={styles.tab}>

      <View style={styles.timer}>
        <CounterSettings />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  timer: {
    alignItems: 'center',
    padding: 15
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15
  },
  button: {
    backgroundColor: '#d49400ff',
    padding: 15
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  count: {
    fontSize: 32,
    marginHorizontal: 20,
    fontWeight: 'bold',
  },
});