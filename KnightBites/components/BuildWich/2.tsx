import React, { useState, useContext } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, TouchableOpacity
} from 'react-native';
import { SandwichContext } from "@/components/SandwichProvider";
import styles from '@/constants/BuildWichStyles';


export default function Page2({pageHook}) {

    const {sandwich, setSandwich} = useContext(SandwichContext);
    const proteins = ["Ham", "Bacon", "Turkey", "Chicken Salad", "Pepperoni", "None"]

    function updateProtein(protein: string) {
        if (sandwich.protein.includes(protein)) {
            setSandwich({...sandwich, protein: sandwich.protein.filter((item) => item !== protein)});
        } else {
            setSandwich({...sandwich, protein: [...sandwich.protein, protein]});
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Step 2: Pick your protein</Text>
            <FlatList numColumns={3} renderItem={({item}) => (
                <TouchableOpacity
                    style={(sandwich.protein.includes(item) ? styles.selected : styles.unselected)}
                    onPress={() => updateProtein(item)}
                >
                    <Image style={styles.foodPic} source={require('@/assets/images/pizza.jpg')}/>
                    <Text style={styles.selectionText}>{item}</Text>
                </TouchableOpacity>
            )} data={proteins} keyExtractor={(item) =>
                item
            }/>
            {/* will probably look bad on desktop - whatever */}
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => pageHook(1)}>
                    <Text style={styles.bottomButtonText}>&lt; 1: Choose bread</Text>
                </TouchableOpacity>
                <View style={styles.bottomSpacer}/>
                <TouchableOpacity style={styles.bottomButton} onPress={() => pageHook(3)}>
                    <Text style={styles.bottomButtonText}>3: Choose Cheese &gt;</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}