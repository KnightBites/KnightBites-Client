import { Image, StyleSheet, View, Text, FlatList, TouchableOpacity, Button, TextInput, Pressable } from 'react-native';
import FoodPanel from '@/components/FoodPanel';
import DropDownPicker from 'react-native-dropdown-picker';
import { Header, HeaderRight } from '@/components/Header';
import { useState } from 'react';
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
////////

const Stack = createNativeStackNavigator();

export default function EntryPoint() {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerTitle: props => <Header />,
        headerStyle: {
          backgroundColor: "#880015",
          height: 70,
        },
        headerRight: props => <HeaderRight />,
      }}
    >
      <Stack.Screen name="home" component={HomePage}
        options={{headerLeft: props => {}}} // to get rid of button going back to login page
      />
      <Stack.Screen name="foodPage" component={FoodPage} 
        initialParams={
          { dish: { name: "Yummy", desc: "cool", rating: 3, respectiveCafeteria: -1, img: 'https://placehold.co/400' } }
        }
      />
      <Stack.Screen name="login" component={LoginPage} />
      <Stack.Screen name="registration" component={RegisterPage} />

    </Stack.Navigator>
  )
}

function HomePage({navigation}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [restaurant, setRestaurant] = useState(-1);
  const [items, setItems] = useState([
    { label: 'Everywhere', value: -1 },
    { label: 'Commons Dining Hall', value: 0 },
    { label: 'Knollcrest Dining Hall', value: 1 },
    { label: 'Johnny\'s Cafe', value: 2 },
    { label: 'Peet\'s Coffee', value: 3 },
    { label: 'UpperCrust', value: 4 },
  ]);


  const defaultDishData: Dish[] = [{
    name: 'No Dish Found',
    desc: 'Try a different search',
    rating: 0,
    respectiveCafeteria: -1,
    img: 'https://via.placeholder.com/200',
  }]

  const getDishData = (): Dish[] => {
    // this response will be recived from the database in the future
    const resp: Dish[] = [
      {
        name: 'Corn bread',
        desc: 'Woah, corn bread! (This is a very, very long description in order to test the wrapping of text in the description field. It should wrap around and look nice.)',
        rating: 2,
        respectiveCafeteria: 0,
        img: 'https://via.placeholder.com/200',
      },
      {
        name: 'Spagetti',
        desc: 'With tomato sauce',
        rating: 4.5,
        respectiveCafeteria: 1,
        img: 'https://via.placeholder.com/200',
      },
      {
        name: 'Pizza',
        desc: 'Nutritious and delicious',
        rating: 3,
        respectiveCafeteria: 2,
        img: 'https://via.placeholder.com/200',
      },
      {
        name: 'Coffee',
        desc: 'Hyperactive-inator',
        rating: 5,
        respectiveCafeteria: 3,
        img: 'https://via.placeholder.com/200',
      },
      {
        name: 'Olive',
        desc: 'Its just one olive.',
        rating: .5,
        respectiveCafeteria: 4,
        img: 'https://via.placeholder.com/200',
      },
    ]

    // do any wrangling of the data
    const filtered = resp.filter(dish => (
      (dish.respectiveCafeteria == restaurant || restaurant == -1) &&
      (dish.name.toLowerCase().includes(search.toLowerCase()))
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
              placeholder="Everywhere"
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
          <FlatList
            data={getDishData()}
            style={styles.feed}
            renderItem={({ item }) => (
              <Pressable onPress={() => navigation.navigate("foodPage", {dish: item, review: 0})}>
                <FoodPanel
                  navigation={navigation}
                  dish={item}
                />
              </Pressable>
            )}
          />
        </View>
      </View>
    </View>
  );
}

// styles in constants/Styles.ts
