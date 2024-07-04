import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

let guesses;

export default function App() {
  
  const [header, setHeader] = useState("");
  const [input, setInput] = useState("");
  const [number, setNumber] = useState(0);
  
  const init = () => {
    guesses = 0;
    setNumber(Math.floor(Math.random() * 100) + 1);
    setHeader("Guess a number between 1-100");
  }

  useEffect(() => {
    init();
  }, []);

  const guess = () => {
    console.log(number);
    guesses++;
    if (parseInt(input) == number) {
      Alert.alert("You guessed the number in " + guesses + " guesses");
      init();
    } else if (parseInt(input) > number) {
      setHeader("Your guess is too high");
    } else if (parseInt(input) < number) {
      setHeader("Your guess is too low");
    }
    setInput("");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{ fontSize: 20 }} >
        {header}
      </Text>
      <TextInput
          style={{width:100, borderColor: 'gray', borderWidth:1, margin:50}}
          keyboardType='numeric'
          onChangeText={num => setInput(num)}
          value={input}
        />
      <Button onPress={guess} title="Make a guess" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
