import { useState } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, 
    TouchableOpacity, Button, TextInput, 
    Linking, Alert
} from 'react-native';
import styles from '@/constants/Styles';
import { Colors } from '@/constants/Colors';


export default function buildSandwich({navigation}) {

    const [breadChoice, setBreadChoice] = useState("");
    const [cheeseChoice, setCheeseChoice] = useState("");
    const [veggieChoice, setVeggieChoice] = useState("");
    const [condimentChoice, setCondimentChoice] = useState("");
    const [creationName, setCreationName] = useState("");


    return (
      <View style = {{alignItems: "center", flex: 1, backgroundColor: Colors.light.background}}>
        <Text style = {{fontSize: 25, marginBottom: 10, marginTop: 40 }}>Build-A-Wich</Text>

        <Text>Build your personal UpperCrust order and share with creation with everyone!</Text>

        <Text>Step 1: Pick your bread</Text>

        
        <Text>Step 2: Pick your protein</Text>
        <Text>Step 3: Pick your cheese</Text>
        <Text>Step 4: Pick your veggies</Text>
        <Text>Step 5: Pick your condiments</Text>

        <TextInput
        style={[styles.loginTextBar]}
        value={creationName}
        onChangeText={setCreationName} 
        placeholder="Enter a name for your creation!"
      />
      <TouchableOpacity onPress={() => navigation.navigate("buildSandwichHomePage")} style = {UpperCrustStyles.submitButton}><Text style = {UpperCrustStyles.buttonText}>Submit Creation</Text></TouchableOpacity>

      </View>
    );
  };

  const UpperCrustStyles = StyleSheet.create({

    submitButton: {
      borderRadius: 25,
      borderColor: "black",
      borderWidth: 2,
      width: 150,
      height: 60,
      alignItems: "center", // Center horizontally
      justifyContent: "center", // Center vertically
    },
    buttonText: {
      textAlign: "center",
      fontSize: 15,
      color: "black",
    },

  });
