import { useState } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, 
    TouchableOpacity, Button, TextInput, 
    Linking,
} from 'react-native';
import styles from '@/constants/Styles';


// NOT IN WORKING STATE
async function sendEmail(subject: string, body: string, to: string): Promise<void> {
    const linkingURL = `mailto:${to}?` + new URLSearchParams({
        subject,
        body,
        from: "knightbites@example.com"
    });

    const canOpen = await Linking.canOpenURL(linkingURL);
    if (!canOpen)
        throw new Error("Cannot open provided URL for email sending");
    return Linking.openURL(linkingURL);
}

function validatePassword(ps1: string, ps2: string): boolean {
    return (
        ps1 === ps2 // passwords must match
        && ps1.length >= 8 // password must be >= 8 characters
    )
}

function registerAccount(username: string, password: string) {
    // hit db here
}

export default function RegistrationPage({navigation}) {

    const [ username, setUsername ] = useState("");
    const [ ps1, setPs1 ] = useState("");
    const [ ps2, setPs2 ] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, allowPasswordVisible] = useState(false);

    return (
        <View>
        <Text>Username: </Text>
        <TextInput
          style={[styles.loginTextBar, isFocused && styles.loginTextBarHover]}
          value={username}
          onChangeText={setUsername} // When the user types, it sets the username
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter a username"
        />
  
  <Text>Password: </Text>
      <View>
        <TextInput
          style={styles.loginTextBar}
          value={ps1}
          onChangeText={setPs1}
          secureTextEntry={!isPasswordVisible} 
          placeholder="Enter a password"
        />

        <TouchableOpacity onPress={() => allowPasswordVisible(!isPasswordVisible)}>
          <Text style={styles.toggleText}>
            {isPasswordVisible ? 'Hide' : 'Show'} 
          </Text>
        </TouchableOpacity>
      </View>

      <Text>Retype Password: </Text>
      <TextInput
        style={styles.loginTextBar}
        value={ps2}
        onChangeText={setPs2}
        secureTextEntry={!isPasswordVisible}  
        placeholder="Re-enter the password"
      />
  
        <TouchableOpacity
          onPress={() => {
            if (validatePassword(ps1, ps2)) {
              registerAccount(username, ps1);
              navigation.navigate("login");
            } else {
              alert('Check ya passwords: passwords do not match'); //I think this is automatically freaking out since we have no db, so it will always say no
            }
          }}
        >
          <Text style = {styles.submitRegistrationButton}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("login")}><Text>Already have an account? Login here.</Text></TouchableOpacity>

      </View>
    );
  };
