import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function App() {
  
  const [shoppingList, setShoppingList] = useState([]);
  const [input, setInput] = useState("");
  
  const add = () => {
    setShoppingList([...shoppingList, {key: input}]);
    setInput('');
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
          style={{width:100, borderColor: 'gray', borderWidth:1, marginTop: 100}}
          onChangeText={text => setInput(text)}
          value={input}
        />
      <View style={styles.buttons}>
          <Button onPress={add} title="Add" />
          <View style={{width: 20}} />
          <Button onPress={() => setShoppingList([])} title="Clear" />
      </View>
      <Text style={styles.text}>Shopping List</Text>
      <FlatList
          data={shoppingList}
          renderItem={({item}) => <Text>{item.key}</Text>}
          keyExtractor={(item, index) => index.toString()}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "flex-end",
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 40
  },
  text: {
    color: "#940047",
    fontWeight: "bold",
    fontSize: 18
  }
});
