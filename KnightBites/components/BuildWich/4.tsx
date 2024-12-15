import React, { useState, useContext } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, TouchableOpacity
} from 'react-native';
import { SandwichContext } from "@/components/SandwichProvider";
import styles from '@/constants/BuildWichStyles';


export default function Page4({pageHook, veggies}) {

    const {sandwich, setSandwich} = useContext(SandwichContext);

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
                    <Image style={styles.foodPic} source={{uri: item.image}}/>
                    <Text style={styles.selectionText}>{item.ingredient}</Text>
                </TouchableOpacity>
            )} data={veggies} keyExtractor={(item, index) =>
              index
            }/>
            {/* will probably look bad on desktop - whatever */}
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => pageHook(3)}>
                    <Text style={styles.bottomButtonText}>&lt; 3: Choose cheese</Text>
                </TouchableOpacity>
                <View style={styles.bottomSpacer}/>
                <TouchableOpacity style={styles.bottomButton} onPress={() => pageHook(5)}>
                    <Text style={styles.bottomButtonText}>5: Choose sauces &gt;</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
