import { useState } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, 
    TouchableOpacity, Button, TextInput, 
    Linking,
} from 'react-native';
import styles from '@/constants/Styles';
import { NavigationContainer } from '@react-navigation/native';
import LogPage from './LogPage';
import RegistrationPage from './RegistrationPage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login to an existing account" component={LogPage} />
        <Stack.Screen name="Don't have an account? Click to register" component={RegistrationPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;