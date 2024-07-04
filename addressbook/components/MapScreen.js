import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Keyboard, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; //expo install react-native-maps


export default function MapScreen({ route }) {
  
  const { item } = route.params;
  
  return (
    <View style={styles.container}>
      <MapView
      style={styles.map}
      region={{
        latitude: item.latitude,
        longitude: item.longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
      }}>

      {/* Marker will be in the middle of the showed region */}
      <Marker
        coordinate={{
          latitude: item.latitude,
          longitude: item.longitude}}
        title={item.address}
        pinColor="indigo" />
    </MapView>
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
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
});