import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NFCScreen from './src/screens/NFCScreen';
import OCRScreen from './src/screens/OCRScreen';
import FileShareScreen from './src/screens/FileShareScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="NFC" component={NFCScreen} />
        <Tab.Screen name="OCR" component={OCRScreen} />
        <Tab.Screen name="File Share" component={FileShareScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}