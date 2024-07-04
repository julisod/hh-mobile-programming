import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Input } from 'react-native-elements';
import * as Speech from 'expo-speech'; //expo install expo-speech

export default function TTS() {

  const [text, setText] = useState("");

  const speak = () => {
    Speech.speak(text);
    setText("");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Input
        style={{ paddingLeft: 4,}}
        value={text}
        placeholder="Type something..."
        leftIcon={{ type: 'simple-line-icon', name: 'speech' }}
        onChangeText={input => setText(input)}
      />
      <Button
        onPress={speak}
        title="Press to hear text"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
});
