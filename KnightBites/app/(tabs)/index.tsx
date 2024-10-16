import { Image, StyleSheet, View, Text, FlatList, TouchableOpacity, Button, TextInput } from 'react-native';
import FoodPanel from '@/components/FoodPanel';
import DropDownPicker from 'react-native-dropdown-picker';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from '@/constants/Styles';
import Dish from "@/interfaces/Dish";

import FoodPage from "@/components/FoodPage";

// export default function EntryPoint() {
//   return (
//     <FoodPage dish={{name: "Yummy", desc:"cool", rating: 3, respectiveCafeteria: -1, img: 'https://placehold.co/400'}} />
//   )
// }

export default function HomePage({navigation}) {
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

  /* const handleNavigation = () => {
    if(value){
      navigation.navigate('DetailsPage', { name: value});
    }
  } */

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
        name: 'Test0',
        desc: 'Woah, food!',
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
        rating: 6,
        respectiveCafeteria: 3,
        img: 'https://via.placeholder.com/200',
      },
      {
        name: 'Olive',
        desc: 'Its just one olive.',
        rating: 2,
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
      {/* Header */}
      <Header />

      {/* Main content */}
      <View style={styles.mainContainer}>
        {/* Dropdown Menu */}
        <View style={styles.filterContainer}>
          <View style={styles.searchContainer}>
            <TextInput 
              placeholder="Search for a dish"
              onChangeText={setSearch}
              value={search}
              style={styles.searchBar}
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
              <FoodPanel
                image={item.img}
                foodName={item.name}
                foodDescription={item.desc}
                foodRating={item.rating}
              />
            )}
          />
        </View>
      </View>

      <Footer />

    </View>
  );
}

// styles in constants/Styles.ts
