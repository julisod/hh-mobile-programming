import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Keyboard, FlatList, Alert } from 'react-native';
import { Input, ListItem, Button, Icon } from 'react-native-elements';
import * as SQLite from 'expo-sqlite'; //expo install expo-sqlite 

const db = SQLite.openDatabase("test.db");

export default function HomeSreen({ navigation }) {
  const [input, setInput] = useState("");
  const [errorTxt, setErrorTxt] = useState("");
  const [addressList, setAddressList] = useState([]);

  const search = () => {
    let keyword = input.trim().replace(/ /g, '+');
    fetch(`https://nominatim.openstreetmap.org/search?q=${keyword}&format=json`)
    .then(response => response.json())
    .then(data => {
      if (data == []) {
        setErrorTxt("Couldn't locate the address, try a different address");
      } else {
        save(parseFloat(data[0].lat), parseFloat(data[0].lon));
      }
    })
    .catch(error => {
      console.log(error);
      setErrorTxt("Couldn't fetch the address, try again");
    });
  }

  const save = (lat, lon) => {
    db.transaction(tx => {
      tx.executeSql('insert into address (address, latitude, longitude) values (?, ?, ?);',
        [input.trim(), lat, lon]);
      }, null, updateList);
    setInput("");
    Keyboard.dismiss(); //hides the keyboard
  }

  const updateList = () => {
    setErrorTxt("");
    db.transaction(tx => {
      tx.executeSql('select * from address;', [], (_, { rows }) => {//I have no idea what the underscore is for
      setAddressList(rows._array)
      });
    });
  }

  const triggerAlert = (id) => {
    Alert.alert(
      "Are you sure you want to delete the address?",
      "",
      [
        { text: "Cancel" },
        {
          text: "Delete",
          onPress: () => deleteItem(id)
        },
      ],
      { cancelable: true }
    )
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from address where id = ?;`, [id]);
      }, null, updateList
    )
  }

  useEffect(() => {
    db.transaction(tx => {
      //we don't have to use autoincrement since we have "integer primary key" in our table
      tx.executeSql('create table if not exists address (id integer primary key not null, address text, latitude numeric, longitude numeric);');
    }, null, updateList);
  }, []);
  
  

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        <View style={{height: 50}}></View>
        <Input
          style={{ paddingLeft: 4,}}
          value={input}
          /* label="Placefinder" */
          placeholder="Type in address"
          leftIcon={{ type: 'entypo', name: 'address' }}
          onChangeText={input => setInput(input)}
        />
        <Button
          onPress={search}
          title="Save"
          icon={{ type: 'material', name: 'add-location', color: "white"}}
        />
        {<Text style={{color: "red"}}>{errorTxt}</Text>}
      <View style={{width: "100%"}}>
      <FlatList
        data={addressList}
        contentContainerStyle={{ marginTop: 10 }}
        ListEmptyComponent={<Text>The list is empty, try adding some products</Text>}
        keyExtractor={item => item.id.toString()} 
        renderItem={({ item }) => (
          <ListItem
            bottomDivider
            onPress={() => navigation.navigate('Map', {item})}
            onLongPress={() => triggerAlert(item.id)}
          >
            <ListItem.Content>
              <ListItem.Title>{item.address}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <ListItem.Subtitle>Press to view</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>)}
      />
      </View>
    </View>
  );
  }

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
},
});