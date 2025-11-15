import React, { useEffect, useState } from 'react';
import { AppState, Text, View } from 'react-native';

const App = () => {
  const [appState, setAppState] = useState(AppState.currentState);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      console.log("App state değişti:", nextAppState);
      setCounter((prev) => (prev + 0.5))
      setAppState(nextAppState);
    });

    return () => subscription.remove();
  }, []);

  return (
    <View>
      <Text>Uygulama durumu: {appState}</Text>
      <Text>Değişme sayısı: {counter}</Text>
    </View>
  );
};

export default App;
