import { useState, useContext } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, 
    TouchableOpacity, Button, TextInput, 
    Linking, Alert
} from 'react-native';
import styles from '@/constants/Styles';
import { Colors } from '@/constants/Colors';
import { SandwichProvider } from "@/components/SandwichProvider";
import Page1 from "@/components/BuildWich/1";
import Page2 from "@/components/BuildWich/2";
import Page3 from "@/components/BuildWich/3";
import Page4 from "@/components/BuildWich/4";
import Page5 from "@/components/BuildWich/5";
import Page6 from "@/components/BuildWich/6";
import PageConfirm from "@/components/BuildWich/confirm";


export default function BuildSandwich({navigation}) {

    const [ page, setPage ] = useState(0);

    return (
      <SandwichProvider>
        { page === 0 ? 
        <View style = {{alignItems: "center", flex: 1, backgroundColor: "white"}}>
          <Text style = {{fontSize: 25, marginBottom: 10, marginTop: 40 }}>Build-A-Wich</Text>

          <Text style={styles.uppercrustRuleText}>Build your personal UpperCrust order and share your creation with everyone!</Text>

          <Text style={styles.uppercrustRuleText}>Step 1: Pick your bread</Text>
          <Text style={styles.uppercrustRuleText}>Step 2: Pick your protein</Text>
          <Text style={styles.uppercrustRuleText}>Step 3: Pick your cheese</Text>
          <Text style={styles.uppercrustRuleText}>Step 4: Pick your veggies</Text>
          <Text style={styles.uppercrustRuleText}>Step 5: Pick your condiments</Text>
          <Text style={styles.uppercrustRuleText}>Step 6: Special Instructions</Text>

          <TouchableOpacity style={styles.uppercrustViewSandwiches} onPress={() => setPage(1)}>
            <Text style={styles.uppercrustViewText}>Get Started!</Text>

          </TouchableOpacity>

        </View>
        : ( page === 1 ? <Page1 pageHook={setPage}/> :
          ( page === 2 ? <Page2 pageHook={setPage}/> :
          ( page === 3 ? <Page3 pageHook={setPage}/> :
          ( page === 4 ? <Page4 pageHook={setPage}/> :
          ( page === 5 ? <Page5 pageHook={setPage}/> : 
          ( page <= 6 ? <Page6 pageHook={setPage}/> : <PageConfirm navigation={navigation} pageHook={setPage}/>
        ))))))
        }
      </SandwichProvider>
    );
  };
