import { useState, useEffect } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, 
    TouchableOpacity, Button, TextInput, 
    Linking, Alert
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Sandwich } from "@/interfaces/Sandwich";


export default function ViewSandwich({navigation}) {

    const [ loading, setLoading ] = useState(true);
    const [ sandwiches, setSandwiches ] = useState([] as Sandwich[]);

    useEffect(() => {
        load();
    }, []);

    function loadFakeSandwiches() {
        setSandwiches([
            {
                name: "The Classic",
                bread: "White",
                protein: ["Ham"],
                cheese: ["Cheddar"],
                veggies: ["Lettuce"],
                condiments: ["Mayo"],
                instructions: "A simple & classic sandwich",
                grilled: false,
                creator: "John Doe",
            },
            {
                name: "My Fav",
                bread: "White",
                protein: ["Ham", "Pepperoni", "Bacon"],
                cheese: ["Peperjack"],
                veggies: ["Jalapeños"],
                condiments: ["Spicy Mayo"],
                instructions: "Peter's personal favorite!",
                grilled: true,
                creator: "CheetoLord211738"
            },
            {
                name: "The Veggie",
                bread: "Wheat",
                protein: [],
                cheese: ["Swiss"],
                veggies: ["Lettuce", "Tomato", "Onion", "Pickles"],
                condiments: ["Mustard"],
                instructions: "A vegetarian sandwich for vegetarians",
                grilled: false,
                creator: "Peta"
            },
            {
                name: "Sandvich TF2",
                bread: "White",
                protein: ["Bologna", "Ham"],
                cheese: ["Swiss"],
                veggies: ["Lettuce", "Tomato", "Olive"],
                condiments: [],
                instructions: "Cut diagonally, insert toothpick with olive on end",
                grilled: false,
                creator: "HeavyWeaponsGuy"
            }
        ]);
    }

    function load() {
        // ** TODO ** fetch from server - in the meantime, load fake data
        loadFakeSandwiches();

        setLoading(false)
    }

    return (
        <View style={styles.container}>
            {loading ? <Text style={{fontSize: 32, margin: 10}}>Loading...</Text> :
                <View>
                    <FlatList
                        data={sandwiches}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                style={styles.listItem}
                                onPress={() => navigation.navigate('viewOneSandwich', {sandwich: item})}
                            >
                                <Text style={styles.listItemText}>{item.name}</Text>
                                <Text style={styles.listItemText}>Creator: {item.creator}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.name}
                    />
                </View>
            }
        </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    listItem: {
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.text,
    },
    listItemText: {
        fontSize: 18,
    }
});
