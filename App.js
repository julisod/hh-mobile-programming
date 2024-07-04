import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; //npm install @react-navigation/native
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; //npm install @react-navigation/bottom-tabs
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
//expo install react-native-screens react-native-safe-area-context

import Contactpage from './components/Contactpage';
import TTS from './components/TTS';

const screenOptions = ({ route }) => ({
  tabBarIcon: () => {
    if (route.name === 'Contacts') {
      return <AntDesign name="contacts" size={24} color="black" />;
    } else if (route.name === 'TTS') {
      return <MaterialCommunityIcons name="text-to-speech" size={24} color="black" />
    }
  }
});

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Contacts" component={Contactpage} />
        <Tab.Screen name="TTS" component={TTS} />{/* TTS is short for text to speech */}
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
});
