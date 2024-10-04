import { Image, StyleSheet, View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import FoodPanel from '@/components/FoodPanel.tsx';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function HomePage({navigation}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState([
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

  interface Dish {
    name: string,
    desc: string,
    rating: number,
    respectiveCafeteria: number,
  }

  const getDishData = (): Dish[] => {
    // this response will be recived from the database in the future
    const resp: Dish[] = [
      {
        name: 'Test0',
        desc: 'Woah, food!',
        rating: 2,
        respectiveCafeteria: 0,
      },
      {
        name: 'Spagetti',
        desc: 'With tomato sauce',
        rating: 4.5,
        respectiveCafeteria: 1,
      },
      {
        name: 'Pizza',
        desc: 'Nutritious and delicious',
        rating: 3,
        respectiveCafeteria: 2,
      },
    ]
    
    // do any wrangling of the data
    return resp.filter(dish => dish.respectiveCafeteria == value);
  };

  return (
    <View>
      {/* Header */}
      <View style={styles.headerBar}>
        <Image style={styles.headerAppImage} source={require("@/assets/images/dining-hall.jpg")}></Image>
        <Text style={styles.headerAppTitle}>KnightBites</Text>
        <Text style={styles.headerUser}>Kenny</Text>
      </View>

      <View style={styles.container}>
        {/* Dropdown Menu */}
        <View style={styles.dropdownContainer}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select a dining venue"
            containerStyle={{ height: 40 }}
            style={styles.dropdown} // Apply styles to the dropdown
            dropDownContainerStyle={styles.dropdownList} // Styles for the dropdown list
          />
        </View>

        {/* Button to navigate to the selected dining hall */}
        {/* {value && (
          <View style={styles.buttonContainer}>
            <Button title={`View ${label} Menu`} onPress={handleNavigation} />
          </View>
        )} */}

        <View style={styles.feed}>
          <FlatList
            data={getDishData()}
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
    </View>
  );
}


const styles = StyleSheet.create({
  headerBar: {
    width: "100%",
    position: "sticky",
    backgroundColor: "#880015",
    padding: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  headerUser: {
    marginLeft: "auto",
    fontSize: 20,
  },
  headerAppTitle: {
    fontSize: 20,
  },
  headerAppImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  container: {
    padding: 20,
  },
  dropdownContainer: {
    position: 'relative', // Allows dropdown to overlay other content
    marginBottom: 20, // Adds space below the dropdown
    zIndex: 1000,
  },
  dropdown: {
    zIndex: 1000, // Ensure the dropdown input is above other content
  },
  dropdownList: {
    position: 'absolute', // Overlay dropdown list
    top: 40, // Position the dropdown list below the dropdown input
    zIndex: 1000, // Ensure the dropdown list is above other content
  },
  buttonContainer: {
    marginTop: 20,
    fontColor: 'black',
    zIndex: 999, // Lower zIndex for the button, so it's not overlayed by the dropdown
  },
  feed: {
    alignItems: "center",
  },
});

