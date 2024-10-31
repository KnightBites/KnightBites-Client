import { useState } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, 
    TouchableOpacity, Button, TextInput, 
    Linking, Animated
} from 'react-native';
import styles from '@/constants/Styles';

function validateAccount(username: string, password: string): boolean {
    // hit db here

    return true;
}

export default function LoginPage({navigation}) {

  const [ username, setUsername ] = useState("");
  const [ pass, setPass ] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, allowPasswordVisible] = useState(false);

  return (
      <View style = {{alignItems: "center"}}>
      <Text style = {{fontSize: 25, marginBottom: 10, marginTop: 40 }}>Log In </Text>
      <TextInput
        style={[styles.loginTextBar, isFocused && styles.loginTextBarHover] }
        value={username}
        onChangeText={setUsername} // When the user types, it sets the username
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Enter your username"
      />
    <View>
      <TextInput
        style={styles.loginTextBar}
        value={pass}
        onChangeText={setPass}
        secureTextEntry={!isPasswordVisible} 
        placeholder="Enter your password"
      />

      <TouchableOpacity onPress={() => allowPasswordVisible(!isPasswordVisible)}>
        <Text style={[styles.toggleText, {alignItems: "center", textAlign: "center", marginBottom: 10, textDecorationLine: 'underline' }]}>
          {isPasswordVisible ? 'Hide Password' : 'Show Password'} 
        </Text>
      </TouchableOpacity>
    </View>  
      <TouchableOpacity
        onPress={() => {
          if (validateAccount(username, pass)) {
            navigation.navigate("home");
          } else {
            alert('Your username or password is incorrect. Try again.'); //I think this is automatically freaking out since we have no db, so it will always say no
          }
        }}
      >
        <Text style = {[styles.submitRegistrationButton]}>Submit</Text>
      </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("registration")}><Text style = {{marginTop: 15, color: "blue"}}>Don't have an account? Register here.</Text></TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("recovery")}><Text style = {{marginTop: 15, color: "blue"}}>Forgot your password? Recover account here. </Text></TouchableOpacity>
    </View>
  );
};