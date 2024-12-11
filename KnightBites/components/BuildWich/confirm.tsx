import React, { useState, useContext } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput
} from 'react-native';
import { SandwichContext } from "@/components/SandwichProvider";
import { ProfileContext } from "@/components/ProfileProvider";
import styles from '@/constants/BuildWichStyles';


export default function PageConfirm({navigation, pageHook}) {

    const {sandwich, setSandwich} = useContext(SandwichContext);
    const {profile, setProfile} = useContext(ProfileContext);

    function updateName(name: string) {
        setSandwich({...sandwich, name: name});
    }

    async function confirm() {
        if (sandwich.name === "") {
            alert("Please name your sandwich");
            return;
        }

        const resp = await fetch(
            "https://knightbitesapp-cda7eve7fce3dkgy.eastus2-01.azurewebsites.net/uppercrust",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                creator: profile.username,
              })
            }
          );
          if (!resp.ok) throw `Bad response: Error ${resp.status}`;

          const json = await resp.json();
          navigation.navigate("buildSandwichHomePage");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Review Your Creation</Text>
            <TextInput 
                style={[styles.nameBox, {marginBottom: 45}]}
                placeholder="Name your sandwich"
                value={sandwich.name}
                onChangeText={(val) => {updateName(val);}}
            />
            <FlatList
                numColumns={2}
                renderItem={({item}) => (
                    <View style={styles.unselected}>
                        <Image style={styles.foodPic} source={{uri: item.image}}/>
                        <Text style={styles.selectionText}>{item.ingredient}</Text>
                    </View>
                )} 
                data={[sandwich.bread+" Bread", ...sandwich.protein, ...sandwich.cheese, ...sandwich.veggies, ...sandwich.condiments].filter((item) => item !== "None")}
                keyExtractor={(item) =>
                    item
                }
            />
            {/* will probably look bad on desktop - whatever */}
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => pageHook(6)}>
                    <Text style={styles.bottomButtonText}>&lt; 6: Special Instructions</Text>
                </TouchableOpacity>
                <View style={styles.bottomSpacer}/>
                <TouchableOpacity style={styles.bottomButton} onPress={confirm}>
                    <Text style={styles.bottomButtonText}>Finish &gt;</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
