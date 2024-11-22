import { useState } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, 
    TouchableOpacity, Button, TextInput, 
    Linking, Alert, Dimensions
} from 'react-native';
import styles from '@/constants/Styles';
import { Colors } from '@/constants/Colors';


export default function ChooseBread({navigation}) {
    const numColumns = 3;
    const squareSize = Dimensions.get('window').width / numColumns -10;
    const [ bread, setBread ] = useState("");
    const Grid = ({ data }) => {
      const renderItem = ({ item }) => (
        <View style={[styles.square, { width: squareSize, height: squareSize }]}>
          <Text style={styles.text}>{item}</Text>
        </View>
      );

    return (
      <View style = {{alignItems: "center", flex: 1, backgroundColor: Colors.light.background}}>
        <Text style = {{fontSize: 25, marginBottom: 10, marginTop: 40 }}>1. Choose A Bread</Text>

        <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={numColumns} // Set the number of columns
      contentContainerStyle={styles.gridContainer}
        />

        <TouchableOpacity style={styles.uppercrustViewSandwiches}>
          <Text style={styles.uppercrustViewText}>Get Started!</Text>
          </TouchableOpacity>

      </View>
    );
  };

  const breadstyle = StyleSheet.create({

    ridContainer: {
      padding: 5,
    },
    square: {
      margin: 5, // Spacing between squares
      backgroundColor: 'lightblue',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  })
};

