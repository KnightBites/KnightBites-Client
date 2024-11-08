import { useState } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, 
    TouchableOpacity, Button, TextInput, 
    Linking,
} from 'react-native';
import styles from '@/constants/Styles';
import { Colors } from '@/constants/Colors';

function validatePassword(ps1: string, ps2: string): boolean {
    return (
        ps1 === ps2 // passwords must match
        && ps1.length >= 8 // password must be >= 8 characters
    )
}

function registerDietaryRestrictions(vegan: boolean, vegetarian: boolean, halal: boolean){
  // hit db here
}

export default function RegistrationPage({navigation}) {

    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ ps1, setPs1 ] = useState("");
    const [ ps2, setPs2 ] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, allowPasswordVisible] = useState(false);
    const [vegan, setVegan] = useState(false)
    const [vegetarian, setVegetarian] = useState(false);
    const [halal, setHalal] = useState(false);
    const [selected, setSelected] = useState({ vegan: false, vegetarian: false, halal: false });

    const handleSelect = (type) => {
        setSelected((prevSelected) => ({
          ...prevSelected,
          [type]: !prevSelected[type], // Toggle selection for the chosen type
        }));
    };

    async function registerAccount() {
        // hit db here
        try {
          const resp = await fetch(
            "https://knightbitesapp-cda7eve7fce3dkgy.eastus2-01.azurewebsites.net/user",
            {
              method: "POST",
              body: JSON.stringify({
                email,
                username,
                password: ps1,
                vegan,
                vegetarian,
                halal,
              })
            }
          );
          const json = await resp.json();
        } catch (err) {
          console.error(err);
        }
    }

    return (
      <View style = {{alignItems: "center", flex: 1, backgroundColor: Colors.light.background}}>
        <Text style = {{fontSize: 25, marginBottom: 10, marginTop: 20 }}>Register Your Account </Text>
        <TextInput
          style={[styles.loginTextBar, isFocused && styles.loginTextBarHover]}
          value={email}
          onChangeText={setEmail} // When the user types, it sets the username
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter your email"
        />
      
        <View>
          <TextInput
            style={styles.loginTextBar}
            value={username}
            onChangeText={setUsername}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter a username">
          </TextInput>
        </View>
  
        <View>
          <TextInput
            style={styles.loginTextBar}
            value={ps1}
            onChangeText={setPs1}
            secureTextEntry={!isPasswordVisible} 
            placeholder="Enter a password"
          />

          <TextInput
            style={styles.loginTextBar}
            value={ps2}
            onChangeText={setPs2}
            secureTextEntry={!isPasswordVisible}  
            placeholder="Re-enter the password"
          />

          <TouchableOpacity onPress={() => allowPasswordVisible(!isPasswordVisible)}>
            <Text style={[styles.toggleText, {alignItems: "center", textAlign: "center", marginBottom: 10, textDecorationLine: 'underline' }]}>
              {isPasswordVisible ? 'Hide Passwords' : 'Show Passwords'} 
            </Text>
          </TouchableOpacity>

        </View>

        <Text> Please select your dietary restrictions.</Text>

        <View style = {styles.dietaryRestrictionContainer}>
          <TouchableOpacity
            style={[styles.dietaryRestrictionButton, selected.vegan && styles.dietaryRestrictionButtonSelection]}
            onPress={() => { handleSelect('vegan'); setVegan(!vegan); }}
          >
            <Text>Vegan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dietaryRestrictionButton, selected.vegetarian && styles.dietaryRestrictionButtonSelection]}
            onPress={() => { handleSelect('vegetarian'); setVegetarian(!vegetarian); }}
          >
            <Text>Vegetarian</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dietaryRestrictionButton, selected.halal && styles.dietaryRestrictionButtonSelection]}
            onPress={() => { handleSelect('halal'); setHalal(!halal); }}
          >
            <Text>Halal</Text>
          </TouchableOpacity>

        </View>
  
        <TouchableOpacity style = {styles.submitRegistrationButton}
          onPress={() => {
            if (validatePassword(ps1, ps2)) {
              registerAccount();
              navigation.navigate("login");
            } else {
              alert('Your passwords do not match'); //I think this is automatically freaking out since we have no db, so it will always say no
            }
          }}
        >
          <Text>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("login")}><Text style = {{marginTop: 15, color: "blue"}}>Already have an account? Login here.</Text></TouchableOpacity>

      </View>
    );
  };
