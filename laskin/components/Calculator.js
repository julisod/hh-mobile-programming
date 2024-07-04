import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function Calculator({ navigation }) {
  
  const [result, setResult] = useState("");
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");

  const [data, setData] = useState([]);

  const add = () => {
    let sum = parseInt(firstInput) + parseInt(secondInput)
    setResult(sum);
    handleChange(firstInput + " + " + secondInput + " = " + sum);
  }

  const subtract = () => {
    let subtraction = parseInt(firstInput) - parseInt(secondInput)
    setResult(subtraction);
    handleChange(firstInput + " - " + secondInput + " = " + subtraction);
  }

  const handleChange = (text) => {
    setData([...data, text]);
    setFirstInput("");
    setSecondInput("");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{ fontSize: 22 }}>
        Result: {result}
      </Text>
      <TextInput
        style={{width:100, borderColor: 'gray', borderWidth:1}}
        keyboardType='numeric'
        onChangeText={input => setFirstInput(input)}
        value={firstInput}
      />
      <TextInput
        style={{width:100, borderColor: 'gray', borderWidth:1}}
        keyboardType='numeric'
        onChangeText={input => setSecondInput(input)}
        value={secondInput}
      />
      <View style={styles.buttons}>
        <Button onPress={add} title="+" />
        <Button onPress={subtract} title="-" />
      </View>
      <Button onPress={() => navigation.navigate('History', {data})}
        title="History" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    width: "20%",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10
  },
});
