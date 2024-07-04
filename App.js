import { NavigationContainer } from '@react-navigation/native'; //npm install @react-navigation/native
//expo install react-native-screens react-native-safe-area-context
import { createNativeStackNavigator } from '@react-navigation/native-stack'; //npm install @react-navigation/native-stack

import HomeScreen from "./components/HomeScreen";
import MapScreen from "./components/MapScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


