import { useState, useEffect } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, 
    TouchableOpacity, Button, TextInput, 
    Linking, Alert
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Sandwich } from "@/interfaces/Sandwich";
import styles from "@/constants/BuildWichStyles"; // happens to have all the styles I need in this page


export default function ViewOneSandwich({route, navigation}) {

    const {sandwich} = route.params;
    
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.title}>{sandwich.name}</Text>
                <Text style={styles.instructionText}>Creator: {sandwich.creator}</Text>
                <Text style={styles.instructionText}>Instructions: {sandwich.instructions}</Text>
                <FlatList
                    numColumns={2}
                    data={[sandwich.bread+" Bread", ...sandwich.protein, ...sandwich.cheese, ...sandwich.veggies, ...sandwich.condiments]}
                    renderItem={({item}) => (
                        <View style={styles.unselected}>
                            <Image style={styles.foodPic} source={require("@/assets/images/pizza.jpg")} />
                            <Text style={styles.selectionText}>{item}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item}
                />
                {(sandwich.grilled ? <Text style={styles.grilledText}>Grilled</Text> : null)}
            </View>
        </View>
    );
  };
