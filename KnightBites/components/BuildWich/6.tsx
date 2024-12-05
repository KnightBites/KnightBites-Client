import React, { useState, useContext } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput
} from 'react-native';
import { SandwichContext } from "@/components/SandwichProvider";
import styles from '@/constants/BuildWichStyles';


export default function Page6({pageHook}) {

    const {sandwich, setSandwich} = useContext(SandwichContext);

    function toggleGrilled() {
        setSandwich({...sandwich, grilled: !sandwich.grilled});
    }

    function updateInstruction(instrs: string) {
        setSandwich({...sandwich, instructions: instrs});
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Step 6: Special Instructions</Text>
            <TouchableOpacity
                style={(sandwich.grilled ? styles.selected : styles.unselected)}
                onPress={toggleGrilled}
            >
                <Image style={styles.foodPic} source={require('@/assets/images/pizza.jpg')}/>
                <Text style={styles.selectionText}>Grilled</Text>
            </TouchableOpacity>
            
            <Text style={styles.selectionText}>Special Instructions (optional):</Text>
            <TextInput
                value={sandwich.instructions}
                onChangeText={(val) => {updateInstruction(val);}}
                style={styles.specInstrs}
            />

            {/* will probably look bad on desktop - whatever */}
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => pageHook(5)}>
                    <Text style={styles.bottomButtonText}>&lt; 5: Choose condiments</Text>
                </TouchableOpacity>
                <View style={styles.bottomSpacer}/>
                <TouchableOpacity style={styles.bottomButton} onPress={() => pageHook(7)}>
                    <Text style={styles.bottomButtonText}>Finish &gt;</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}