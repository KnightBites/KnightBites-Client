import React, { useContext } from 'react';
import { 
    Image, View, Text, FlatList, TouchableOpacity
} from 'react-native';
import { SandwichContext } from "@/components/SandwichProvider";
import styles from '@/constants/BuildWichStyles';


export default function Page2({pageHook, proteins}) {

    const {sandwich, setSandwich} = useContext(SandwichContext);

    function updateProtein(protein: string) {
        if (sandwich.protein.includes(protein)) {
            setSandwich({...sandwich, protein: sandwich.protein.filter((item) => item !== protein)});
        } else {
            setSandwich({...sandwich, protein: [...sandwich.protein, protein]});
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Step 2: Pick your protein(s)</Text>
            <FlatList numColumns={2} renderItem={({item}) => (
                <TouchableOpacity
                style={(sandwich.protein.includes(item) ? styles.selected : styles.unselected)}
                onPress={() => {
                    if (item === "None") {
                        setSandwich({ ...sandwich, protein: ["None"] });
                    } else {
                        setSandwich({
                            ...sandwich,
                            protein: sandwich.protein?.includes("None")
                                ? [item] 
                                : sandwich.protein?.includes(item)
                                ? sandwich.protein.filter((protein) => protein !== item) // Deselect the item if already selected
                                : [...(sandwich.protein || []), item], // Add the item if not selected
                        })
                    }
                }}
            >
                    <Image style={styles.foodPic} source={{uri: item.image}}/>
                    <Text style={styles.selectionText}>{item.ingredient}</Text>
                </TouchableOpacity>
            )} data={proteins} keyExtractor={(item, index) =>
              index
            }/>
            {/* will probably look bad on desktop - whatever */}
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => pageHook(1)}>
                    <Text style={styles.bottomButtonText}>&lt; 1: Choose bread</Text>
                </TouchableOpacity>
                <View style={styles.bottomSpacer}/>
                <TouchableOpacity style={styles.bottomButton} onPress={() => pageHook(3)}>
                    <Text style={styles.bottomButtonText}>3: Choose cheese &gt;</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
