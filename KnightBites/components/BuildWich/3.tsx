import React, { useState, useContext } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, TouchableOpacity
} from 'react-native';
import { SandwichContext } from "@/components/SandwichProvider";
import styles from '@/constants/BuildWichStyles';


export default function Page3({pageHook}) {

    const {sandwich, setSandwich} = useContext(SandwichContext);
    const cheeses = ["Cheddar", "Gouda", "Provalone", "Swiss", "Pepper jack", "Colby jack", "None"]

    function updateCheese(cheese: string) {
        if (sandwich.cheese.includes(cheese)) {
            setSandwich({...sandwich, cheese: sandwich.cheese.filter((item) => item !== cheese)});
        } else {
            setSandwich({...sandwich, cheese: [...sandwich.cheese, cheese]});
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Step 3: Pick your cheese(s)</Text>
            <FlatList numColumns={2} renderItem={({item}) => (

                <TouchableOpacity
                    style={(sandwich.cheese.includes(item) ? styles.selected : styles.unselected)}
                    onPress={() => updateCheese(item)}
                >
                    <Image style={styles.foodPic} source={require('@/assets/images/pizza.jpg')}/>
                    <Text style={styles.selectionText}>{item}</Text>
                </TouchableOpacity>
            )} data={cheeses} keyExtractor={(item) =>
                item
            }/>
            {/* will probably look bad on desktop - whatever */}
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => pageHook(2)}>
                    <Text style={styles.bottomButtonText}>&lt; 2: Choose Protein</Text>
                </TouchableOpacity>
                <View style={styles.bottomSpacer}/>
                <TouchableOpacity style={styles.bottomButton} onPress={() => pageHook(4)}>
                    <Text style={styles.bottomButtonText}>4: Choose veggies &gt;</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}