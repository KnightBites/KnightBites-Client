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

    const getSandwichData = async () => {
      setLoading(true);
      try {
        const resp = await fetch(
          "https://knightbitesapp-cda7eve7fce3dkgy.eastus2-01.azurewebsites.net/uppercrust-creations"
        );
        const json = await resp.json();
        setSandwiches(json); // add rating to dish
        console.log(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
        getSandwichData();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? <Text style={{fontSize: 32, margin: 10}}>Loading...</Text> :
                <View>
                    <Text style={styles.title}>
                        Existing Sandwich Creations
                    </Text>
                    <FlatList
                        data={sandwiches}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                style={styles.listItem}
                                onPress={() => navigation.navigate('viewOneSandwich', {sandwich: item})}
                            >
                                <Text style={styles.listItemText}>Name: {item.sandwichname}</Text>
                                <Text style={styles.listItemText}>Creator: {item.creator}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            }
        </View>
    );
  };


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
    listItem: {
        margin: 10,
        height: 75,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.text,
        alignContent: "center"
    },
    listItemText: {
        fontSize: 18,
        marginTop: 5,
        marginBottom: 10,
        alignContent: "center"
    },

    title: {
        fontSize: 30,
        padding: 20,
        alignSelf: "center",
        textAlign: "center"
    }
});
