import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Counter from './counter.js'

export default function HomeScreen(){

  const [count, setCount] = useState(0)

  return (
    <View style={styles.tab}>

      <View style={styles.timer}>
        <Counter />
        {/* <Text style={styles.count}>{count}</Text>
      
        <View style={styles.counter}>  
          <TouchableOpacity style={styles.button} onPress={() => setCount(count - 1)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={() => setCount(count - 1)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>   */}
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