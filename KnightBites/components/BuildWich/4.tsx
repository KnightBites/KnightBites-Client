import React, { useState, useContext } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, TouchableOpacity
} from 'react-native';
import { SandwichContext } from "@/components/SandwichProvider";
import styles from '@/constants/BuildWichStyles';


export default function Page4({pageHook}) {

    const {sandwich, setSandwich} = useContext(SandwichContext);
    const veggies = ["Lettuce", "Green Pepper", "Onion", "Tomato", "Olives", "Pickles", "Jalapeno", "None"]

    function updateVeggies(veggy: string) {
        if (sandwich.veggies.includes(veggy)) {
            setSandwich({...sandwich, veggies: sandwich.veggies.filter((item) => item !== veggy)});
        } else {
            setSandwich({...sandwich, veggies: [...sandwich.veggies, veggy]});
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Step 4: Pick your veggie(s)</Text>
            <FlatList numColumns={2} renderItem={({item}) => (
                <TouchableOpacity
                    style={(sandwich.veggies.includes(item) ? styles.selected : styles.unselected)}
                    onPress={() => updateVeggies(item)}
                >
                    <Image style={styles.foodPic} source={require('@/assets/images/pizza.jpg')}/>
                    <Text style={styles.selectionText}>{item}</Text>
                </TouchableOpacity>
            )} data={veggies} keyExtractor={(item) =>
                item
            }/>
            {/* will probably look bad on desktop - whatever */}
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => pageHook(3)}>
                    <Text style={styles.bottomButtonText}>&lt; 3: Choose Cheese</Text>
                </TouchableOpacity>
                <View style={styles.bottomSpacer}/>
                <TouchableOpacity style={styles.bottomButton} onPress={() => pageHook(5)}>
                    <Text style={styles.bottomButtonText}>5: Choose Sauces &gt;</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}