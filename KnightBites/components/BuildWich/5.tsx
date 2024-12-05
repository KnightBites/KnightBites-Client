import React, { useState, useContext } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, TouchableOpacity
} from 'react-native';
import { SandwichContext } from "@/components/SandwichProvider";
import styles from '@/constants/BuildWichStyles';


export default function Page5({pageHook}) {

    const {sandwich, setSandwich} = useContext(SandwichContext);

    const sauces = ["Mayo", "Spicy mayo", "Mustard", "Ketchup", "Ranch", "BBQ", "Hot sauce", "Hummus spread", "Avocado spread", "Balsamic vinegar", "Olive oil", "None"]

    function updateSauces(sauce: string) {
        if (sandwich.condiments.includes(sauce)) {
            setSandwich({...sandwich, condiments: sandwich.condiments.filter((item) => item !== sauce)});
        } else {
            setSandwich({...sandwich, condiments: [...sandwich.condiments, sauce]});
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Step 5: Pick your condiment(s)</Text>
            <FlatList numColumns={2} renderItem={({item}) => (
                <TouchableOpacity
                    style={(sandwich.condiments.includes(item) ? styles.selected : styles.unselected)}
                    onPress={() => updateSauces(item)}
                >
                    <Image style={styles.foodPic} source={require('@/assets/images/pizza.jpg')}/>
                    <Text style={styles.selectionText}>{item}</Text>
                </TouchableOpacity>
            )} data={sauces} keyExtractor={(item) =>
                item
            }/>
            {/* will probably look bad on desktop - whatever */}
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => pageHook(4)}>
                    <Text style={styles.bottomButtonText}>&lt; 4: Choose Veggies</Text>
                </TouchableOpacity>
                <View style={styles.bottomSpacer}/>
                <TouchableOpacity style={styles.bottomButton} onPress={() => pageHook(6)}>
                    <Text style={styles.bottomButtonText}>6: Special Instructions &gt;</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}