import React from 'react';
import { 
    Image, View, Text, FlatList,
} from 'react-native';
import { Sandwich } from "@/interfaces/Sandwich";
import styles from "@/constants/BuildWichStyles"; // happens to have all the styles I need in this page


export default function ViewOneSandwich({route, navigation}) {

    const {sandwich} = route.params;
    
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.title}>{sandwich.sandwichname}</Text>
                <Text style={styles.instructionText}>Creator: {sandwich.creator}</Text>
                <Text style={styles.instructionText}>Instructions: {sandwich.instructions}</Text>
                <FlatList
                    numColumns={2}
                    data={[
                            sandwich.sammy.bread,
                            ...sandwich.sammy.protein,
                            ...sandwich.sammy.cheese,
                            ...sandwich.sammy.veggies,
                            ...sandwich.sammy.condiments,
                          ]}
                    renderItem={({item}) => (
                        <View style={styles.unselected}>
                            <Image style={styles.foodPic} source={{uri: item.image}} />
                            <Text style={styles.selectionText}>{item.ingredient}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index}
                />
                {(sandwich.grilled ? <Text style={styles.grilledText}>Grilled</Text> : null)}
            </View>
        </View>
    );
  };
