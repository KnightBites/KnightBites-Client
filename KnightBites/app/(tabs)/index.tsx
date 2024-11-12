import { Image, StyleSheet, View, Text, FlatList, TouchableOpacity, Button, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native';
import FoodPanel from '@/components/FoodPanel';
import DropDownPicker from 'react-native-dropdown-picker';
import { Header, HeaderRight } from '@/components/Header';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from '@/constants/Styles';
import Dish from "@/interfaces/Dish";

////////
// Pages
////
import FoodPage from "@/components/FoodPage";
import LoginPage from "@/components/LoginPage";
import RegisterPage from "@/components/RegistrationPage";
import RecoverPage from "@/components/RecoverAccountPage";
import buildSandwich from "@/components/BuildWich";
import buildSandwichHomePage from "@/components/BuildWichHome";
import ProfilePage from "@/components/ProfilePage";

const Stack = createNativeStackNavigator();

export default function EntryPoint() {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={({ navigation }) => ({
        headerTitle: props => <Header />,
        headerStyle: {
          backgroundColor: "maroon",
        },
        headerRight: props => <HeaderRight navigation={navigation} />,
      })}
    >
      <Stack.Screen name="home" component={HomePage}
        options={{ headerLeft: props => { } }} // to get rid of button going back to login page
      />
      <Stack.Screen name="foodPage" component={FoodPage}
        initialParams={
          { dish: { name: "Yummy", desc: "cool", rating: 3, respectiveCafeteria: -1, img: 'https://placehold.co/400' } }
        }
      />
      <Stack.Screen name="login" component={LoginPage}
        options={{ headerLeft: props => { } }} />
      <Stack.Screen name="registration" component={RegisterPage}
        options={{ headerLeft: props => { } }} />
      <Stack.Screen name="recovery" component={RecoverPage}
        options={{ headerLeft: props => { } }} />
      <Stack.Screen name="buildSandwichHomePage" component={buildSandwichHomePage}
        options={{ headerLeft: props => { } }} />
      <Stack.Screen name="buildSandwich" component={buildSandwich} />

      <Stack.Screen name="profile" component = {ProfilePage} />


    </Stack.Navigator>
  )
}

function HomePage({ navigation }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [restaurant, setRestaurant] = useState(-1);
  const [items, setItems] = useState([
    { label: 'All Dining Halls', value: -1 },
    { label: 'Commons Dining Hall', value: "Commons" },
    { label: 'Knollcrest Dining Hall', value: "Knollcrest" },
    { label: 'Johnny\'s', value: "Johnny\'s" },
    { label: 'Peet\'s Coffee', value: "Peets" },
    { label: 'UpperCrust', value: "UpperCrust" },
  ]);
  const [dishData, setDishData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDishData = async () => {
    try {
      const resp = await fetch(
        "https://knightbitesapp-cda7eve7fce3dkgy.eastus2-01.azurewebsites.net/dish"
      );
      const json = await resp.json();
      setDishData(json.map(dish => ({
        ...dish,
        rating: dish.overallrating || Math.round(Math.random() * 10) / 2,
        img: "https://placehold.co/200", // TODO: find a way to fetch images from the database... force them to the right size.
      }))); // add rating to dish
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDishData();
  }, []);

  const defaultDishData: Dish[] = [{
    foodname: 'No Dish Found',
    description: 'Try a different search',
    rating: 0,
    dininghall: "",
    img: 'https://placehold.co/200',
  }]

  const getFilteredDishData = (): Dish[] => {
    // do any wrangling of the data
    const filtered = dishData.filter(dish => (
      (restaurant == -1 || dish.dininghall == restaurant) &&
      (dish.foodname.toLowerCase().includes(search.toLowerCase()))
    ));

    return (filtered.length == 0 ? defaultDishData : filtered);
  };

  return (
    <View style={styles.container}>
      {/* Header handled by stack navigator*/}
      {/* Main content */}
      <View style={styles.mainContainer}>
        {/* Dropdown Menu */}
        <View style={styles.filterContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search for a dish"
              onChangeText={setSearch}
              value={search}
              style={[styles.searchBar, { color: 'black' }]}
              placeholderTextColor="black"
            />
          </View>
          <View style={styles.clearTextButton}>
            <Button
              title="Clear"
              color="white"
              onPress={() => setSearch('')} // Clear the search bar
            />
          </View>
          <View style={styles.sortFoodButton}>
            <Button
              title="Sort"
              color="white"
              onPress={() => {
                // Open a pop-up menu with sorting options
                Alert.alert( // TODO: Alert is a pop-up menu, does not seem to work on web version. Works as expected on mobile. -JT
                  "Sort Options",
                  "Choose a sorting method", // TODO: I want to add a sort method that shows the foods with the most comments first. -JT
                  [
                    { text: "Alphabetical (A-Z)", onPress: () => {
                      const sortedData = [...dishData].sort((a, b) => a.foodname.localeCompare(b.foodname));
                      setDishData(sortedData);
                    }},
                    { text: "Alphabetical (Z-A)", onPress: () => {
                      const sortedData = [...dishData].sort((a, b) => b.foodname.localeCompare(a.foodname));
                      setDishData(sortedData);
                    }},
                    { text: "Rating: best to worst", onPress: () => {
                      const sortedData = [...dishData].sort((a, b) => b.rating - a.rating);
                      setDishData(sortedData);
                    }},
                    { text: "Rating: worst to best", onPress: () => {
                      const sortedData = [...dishData].sort((a, b) => a.rating - b.rating);
                      setDishData(sortedData);
                    }},
                    { text: "Cancel", style: "cancel" }
                  ],
                  { cancelable: true }
                );
              }}
            />
          </View>

          <View style={styles.dropdownContainer}>
            <DropDownPicker
              open={open}
              value={restaurant}
              items={items}
              setOpen={setOpen}
              setValue={setRestaurant}
              setItems={setItems}
              placeholder="All Dining Halls"
              textStyle={styles.dropdown} // Apply styles to the dropdown text
              containerStyle={styles.dropdown} // Apply styles to the dropdown
              style={styles.dropdown} // Apply styles to the dropdown
              dropDownContainerStyle={styles.dropdownList} // Styles for the dropdown list
              listItemContainerStyle={styles.dropdownListItem} // Styles for the dropdown list
              listItemLabelStyle={styles.dropdownListItem} // Styles for the dropdown list
            />
          </View>
        </View>

        <View style={styles.feedContainer}>
          {loading ? (<ActivityIndicator />) : (
            <FlatList
              data={getFilteredDishData()}
              style={styles.feed}
              renderItem={({ item }) => (
                <Pressable onPress={() => navigation.navigate("foodPage", { dish: item, review: 0 })}>
                  <FoodPanel
                    navigation={navigation}
                    dish={item}
                  />
                </Pressable>
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
}

// styles in constants/Styles.ts
