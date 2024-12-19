import React, { useContext } from 'react';
import { 
    View, Text, TouchableOpacity, TextInput
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
                <Text style={[styles.selectionText, {textAlign: "center", padding: 20, marginBottom: 20}]}>Grilled</Text>
            </TouchableOpacity>
            <Text style={[styles.selectionText, {marginTop: 10, marginBottom: 10}]}>Special Instructions:</Text>

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
                    <Text style={styles.bottomButtonText}>Name My Creation &gt;</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
