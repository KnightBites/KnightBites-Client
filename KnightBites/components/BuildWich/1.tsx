import React, { useState, useContext } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, TouchableOpacity
} from 'react-native';
import { SandwichContext } from "@/components/SandwichProvider";
import styles from '@/constants/BuildWichStyles';


export default function Page1({pageHook, breads}) {

    const {sandwich, setSandwich} = useContext(SandwichContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Step 1: Pick your bread</Text>
            <FlatList numColumns={2} renderItem={({item}) => (
                <TouchableOpacity
                    style={(sandwich.bread == item ? styles.selected : styles.unselected)}
                    onPress={() => setSandwich({...sandwich, bread: item})}
                >
                    <Image style={styles.foodPic} source={{uri: item.image}} />
                    <Text style={styles.selectionText}>{item.ingredient}</Text>
                </TouchableOpacity>
            )} data={breads} keyExtractor={(item) =>
                item
            }/>

            {/* will probably look bad on desktop - whatever */}
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => pageHook(0)}>
                    <Text style={styles.bottomButtonText}>&lt; Get started</Text>
                </TouchableOpacity>
                <View style={styles.bottomSpacer}/>
                <TouchableOpacity style={styles.bottomButton} onPress={() => pageHook(2)}>
                    <Text style={styles.bottomButtonText}>2: Choose Protein &gt;</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
