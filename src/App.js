import * as React from 'react';

/* eslint-disable react-native/no-inline-styles */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OCRScreen from './OCRScreen'
import CardList from './CardList';
import ResultScreen from './ResultScreen';
import BarcodeScreen from './BarcodeScreen';
import FirstScreen from './FirstScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: 'Accura SDK',
          headerBackTitleVisible:false,
        headerStyle: {
          backgroundColor: '#D5323F',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        }}
      >
        <Stack.Screen name="Home" component={FirstScreen} 
          options={{ headerShown:false }}/>
        <Stack.Screen name="AccuraOCR" component={OCRScreen} options={{
          title : 'Accura KYC',
        }} />
        <Stack.Screen name="Card List" component={CardList} options={{
          title : 'Card List',
        }}/>
        <Stack.Screen name="Result Screen" component={ResultScreen} options={{
          title : 'Result',
        }}/>
        <Stack.Screen name="Barcode List" component={BarcodeScreen} options={{
          title : 'Barcode List',
        }}/>
      </Stack.Navigator>
    </NavigationContainer>  );
}

export default App;
