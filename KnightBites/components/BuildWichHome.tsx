import { useState } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, 
    TouchableOpacity, Button, TextInput, 
    Linking, Alert
} from 'react-native';
import styles from '@/constants/Styles';
import { Colors } from '@/constants/Colors';


export default function BuildSandwichHomePage({navigation}) {

    return (
      <View style = {{alignItems: "center", flex: 1, backgroundColor: Colors.light.background}}>
      <Text style = {{fontSize: 25, marginBottom: 10, marginTop: 40 }}>Welcome to UpperCrust!</Text>

      <View>

      <TouchableOpacity onPress={() => navigation.navigate("buildSandwich")} style = {styles.uppercrustViewSandwiches}>
        <Text style={styles.uppercrustViewText}>
          Build My Own Sandwich
        </Text>
      </TouchableOpacity>
  
      <TouchableOpacity onPress={() => navigation.navigate("")} style = {styles.uppercrustViewSandwiches}> 
        <Text style={styles.uppercrustViewText}>
          View Existing Sandwiches
        </Text>
      </TouchableOpacity>

      </View>

      <TouchableOpacity onPress={() => navigation.navigate("home")}><Text style = {{marginTop: 15, color: "blue"}}>Return to main page</Text></TouchableOpacity>

    </View>


    );
  };
