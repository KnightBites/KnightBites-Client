import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Text, Alert } from 'react-native';

const SignInScreen = () => {
    const [studentID, setStudentID] = useState(''); //Student IDs work for both password and username
    const ValidStudentID = ['2609655']; //Using Lily's student ID for testing

const SignIn = async() => {
    if (ValidStudentID.includes(studentID)){
        Alert.alert('Success', 'Welcome to Knight Bites!');
    } else{
        Alert.alert('Error', 'Invalid student ID. Try again.');
    }
};

return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your Student ID:</Text>
      <TextInput
        placeholder="Student ID",
        value={studentID},
        onChangeText={setStudentID},
        style={styles.input},
        keyboardType="numeric"
      />
      <Button title="Sign In" onPress={signIn} />
    </View>
);
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    label: {
      fontSize: 18,
      marginBottom: 12,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 10,
    },
  });
  
  export default SignInScreen;
  