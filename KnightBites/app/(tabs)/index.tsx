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
    { label: 'Commons Dining Hall', value: 'Commons Dining Hall' },
    { label: 'Knollcrest Dining Hall', value: 'Knollcrest Dining Hall' },
    { label: 'Johnny\'s Cafe', value: 'Johnny\'s Cafe' },
    { label: 'Peet\'s Coffee', value: 'Peet\'s Coffee' },
    { label: 'UpperCrust', value: 'UpperCrust' },
  ]);

  const handleNavigation = () => {
    if(value){
      navigation.navigate('DetailsPage', { name: value});
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>Hello, Knight Bites!</Text>
      </View>

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
            {value && (
        <View style={styles.buttonContainer}>
          <Button title={`View ${value} Menu`} onPress={handleNavigation} />
        </View>
      )}

      <View style={styles.feed}>
        <FlatList
          data={[
            {
              img: require('@/assets/images/dining-hall.jpg'),
              name: 'Test0',
              desc: 'Woah, food!',
            },
            {
              img: require('@/assets/images/spagetti.jpg'),
              name: 'Spagetti',
              desc: 'With tomato sauce',
            },
            {
              img: require('@/assets/images/pizza.jpg'),
              name: 'Pizza',
              desc: 'Nutritious and delicious',
            },
          ]}
          renderItem={({ item }) => (
            <FoodPanel
              image={item.img}
              foodName={item.name}
              foodDescription={item.desc}
            />
          )}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    maxWidth: '75%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 8,
    marginTop: 50,
  },
  mainText: {
    textAlign: 'center',
    fontSize: 36,
    marginBottom: 25,
    marginTop: 25,
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
    marginHorizontal: 'auto',
    minWidth: 'min-content',
  },
});