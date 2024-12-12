import { useState, useContext, useEffect } from 'react';
import { 
    Image, StyleSheet, View, Text, FlatList, 
    TouchableOpacity, Button, TextInput, 
    Linking, Alert, ActivityIndicator
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
    const [ ingredients, setIngredients ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const getIngredientData = async () => {
      setLoading(true);
      try {
        const resp = await fetch(
          "https://knightbitesapp-cda7eve7fce3dkgy.eastus2-01.azurewebsites.net/uppercrust"
        );
        const json = await resp.json();
        setIngredients(json); // add rating to dish
        console.log(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      getIngredientData();
    }, []);

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

          { loading ? <ActivityIndicator /> :
            <TouchableOpacity style={styles.uppercrustViewSandwiches} onPress={() => setPage(1)}>
              <Text style={styles.uppercrustViewText}>Get Started!</Text>
            </TouchableOpacity>
          }

        </View>
        : ( page === 1 ? <Page1 pageHook={setPage} breads={ingredients.filter(ingredient => ingredient.category === "Bread")} /> :
          ( page === 2 ? <Page2 pageHook={setPage} proteins={ingredients.filter(ingredient => ingredient.category === "Meat")} /> :
          ( page === 3 ? <Page3 pageHook={setPage} cheeses={ingredients.filter(ingredient => ingredient.category === "Cheese")} /> :
          ( page === 4 ? <Page4 pageHook={setPage} veggies={ingredients.filter(ingredient => ingredient.category === "Veggie")} /> :
          ( page === 5 ? <Page5 pageHook={setPage} sauces={ingredients.filter(ingredient => ingredient.category === "Condiment")} /> : 
          ( page <= 6 ? <Page6 pageHook={setPage}/> : <PageConfirm navigation={navigation} pageHook={setPage}/>
        ))))))
        }
      </SandwichProvider>
    );
  };
