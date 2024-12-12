import React, { useState, useContext } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, TouchableOpacity
} from 'react-native';
import { SandwichContext } from "@/components/SandwichProvider";
import styles from '@/constants/BuildWichStyles';


export default function Page3({pageHook, cheeses}) {

    const {sandwich, setSandwich} = useContext(SandwichContext);

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
                    onPress={() => {
                        if (item === "None") {
                            setSandwich({ ...sandwich, cheese: ["None"] });
                        } else {
                            setSandwich({
                                ...sandwich,
                                cheese: sandwich.cheese?.includes("None")
                                    ? [item] 
                                    : sandwich.cheese?.includes(item)
                                    ? sandwich.cheese.filter((cheese) => cheese !== item) // Deselect the item if already selected
                                    : [...(sandwich.cheese || []), item], // Add the item if not selected
                            })
                        }
                    }}
                >
                    <Image style={styles.foodPic} source={{uri: item.image}}/>
                    <Text style={styles.selectionText}>{item.ingredient}</Text>
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
