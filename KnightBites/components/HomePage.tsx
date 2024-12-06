import React from 'react';
import { View, Text, FlatList, TouchableOpacity,
        TextInput, Pressable, ActivityIndicator,
        Switch, Dimensions, StyleSheet, Modal } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import FoodPanel from '@/components/FoodPanel';
import { useState, useEffect, useContext } from 'react';
import styles from '@/constants/Styles';
import { Dish } from "@/interfaces/Dish";
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function HomePage({ navigation }) {

  const [search, setSearch] = useState('');
  const [changingFilter, setChangingFilter] = useState(false);
  const [restaurantFilterOpen, setRestaurantFilterOpen] = useState(false);
  const [restaurant, setRestaurant] = useState("-1");
  const [mealtimeFilterOpen, setMealtimeFilterOpen] = useState(false);
  const [mealtime, setMealtime] = useState("-1");
  const [dietary, setDietary] = useState({ vegan: false, vegetarian: false, halal: false });

  const restaurants = [
    { label: 'All Dining Halls', value: "-1" },
    { label: 'Commons Dining Hall', value: "Commons" },
    { label: 'Knollcrest Dining Hall', value: "Knollcrest" },
    { label: 'Johnny\'s', value: "Johnny\'s" },
    { label: 'Peet\'s Coffee', value: "Peets" },
    { label: 'UpperCrust', value: "UpperCrust" },
  ];

  const mealTimes = [
    { label: 'All Meal Times', value: "-1" },
    { label: 'Breakfast', value: "Breakfast" },
    { label: 'Lunch', value: "Lunch" },
    { label: 'Dinner', value: "Dinner" },
  ];

  const editDietary = (restriction: string, value: boolean) => {
    setDietary({ ...dietary, [restriction]: value });
  }

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
        rating: dish.avg ?? 0, // if the dish has no rating data yet, it is null. Show zero stars in that case
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
    dininghall: "",
    vegan: false,
    vegetarian: false,
    halal: false,
    mealtime: "",
    breakfast: false,
    lunch: false,
    dinner: false,
  }]

  const getFilteredDishData = (): Dish[] => {
    // do any wrangling of the data
    const filtered = dishData.filter(dish => (
      (restaurant == "-1" || dish.dininghall == restaurant) &&
      (dish.foodname.toLowerCase().includes(search.toLowerCase())) &&
      (mealtime == "-1" || dish.mealtime == mealtime) &&
      (!dietary.vegan || dish.vegan) &&
      (!dietary.vegetarian || dish.vegetarian) &&
      (!dietary.halal || dish.halal)
    ));

    return (filtered.length == 0 ? defaultDishData : filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for a dish"
          onChangeText={setSearch}
          value={search}
          style={[styles.searchBar, { color: 'black', fontStyle: 'italic', fontSize: 14 }]}
          placeholderTextColor="black"
        />
        <TouchableOpacity onPress={() => setChangingFilter(!changingFilter)}>
          <Icon
            name="filter-outline"
            size={27}
            color="black"
            style={styles.filterIcon}
          />
        </TouchableOpacity>
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

      {/* Filter Popup */}
      <Modal visible={changingFilter} transparent={true}>
        <View style={otherStyles.popupOverlay}>
          <View style={otherStyles.popupContent}>
            <Text style={otherStyles.popupTitle}>Filter Options</Text>

            {/* Restaurant Dropdown */}
            <DropDownPicker
              open={restaurantFilterOpen}
              setOpen={(open) => {setRestaurantFilterOpen(open); setMealtimeFilterOpen(false)}}
              items={restaurants}
              value={restaurant}
              setValue={setRestaurant}
              containerStyle={otherStyles.dropdownContainer}
              style={otherStyles.dropdown}
              itemStyle={otherStyles.dropdownItem}
              dropDownStyle={otherStyles.dropdownDropdown}
              onChangeValue={value => setRestaurant(value)}
              zIndex={2000}
              zIndexInverse={1000}
            />

            {/* Mealtime Dropdown */}
            <DropDownPicker
              open={mealtimeFilterOpen}
              setOpen={(open) => {setMealtimeFilterOpen(open); setRestaurantFilterOpen(false)}}
              items={mealTimes}
              value={mealtime}
              setValue={setMealtime}
              containerStyle={otherStyles.dropdownContainer}
              style={otherStyles.dropdown}
              itemStyle={otherStyles.dropdownItem}
              dropDownStyle={otherStyles.dropdownDropdown}
              onChangeValue={value => setMealtime(value)}
              zIndex={1000}
              zIndexInverse={2000}
            />

            <View style={{flexDirection:"row", width: "100%"}}>
              {/* Vegan Button */}
              <TouchableOpacity
                style={dietary.vegan ? otherStyles.dietaryButtonOn : otherStyles.dietaryButtonOff}
                onPress={() => editDietary('vegan', !dietary.vegan)}
              >
                <Text style={otherStyles.dietaryButtonText}>Vegan</Text>
              </TouchableOpacity>

              {/* Vegetarian Button */}
              <TouchableOpacity
                style={dietary.vegetarian ? otherStyles.dietaryButtonOn : otherStyles.dietaryButtonOff}
                onPress={() => editDietary('vegetarian', !dietary.vegetarian)}
              >
                <Text style={otherStyles.dietaryButtonText}>Vegetarian</Text>
              </TouchableOpacity>

              {/* Halal Button */}
              <TouchableOpacity
                style={dietary.halal ? otherStyles.dietaryButtonOn : otherStyles.dietaryButtonOff}
                onPress={() => editDietary('halal', !dietary.halal)}
              >
                <Text style={otherStyles.dietaryButtonText}>Halal</Text>
              </TouchableOpacity>
            </View>

            {/* Confirm Button */}
            <View style={otherStyles.popupButtonContainer}>
              <TouchableOpacity
                style={otherStyles.popupConfirmButton}
                onPress={() => {
                  setChangingFilter(false);
                }}
              >
                <Text style={otherStyles.closeText}>Confirm</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
}

// most styles in constants/Styles.ts

const otherStyles = StyleSheet.create({
  popupOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  popupContent: {
    width: '85%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  popupTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  popupInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  popupButtonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  popupCloseButton: {
    backgroundColor: '#CCC',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },

  dietaryButtonOn: {
    backgroundColor: '#891B2F',
    padding: 15, 
    marginBottom: 15,
    borderRadius: 10,
    flex: 1,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },

  },
  dietaryButtonOff: {
    backgroundColor: '#E0E0E0',
    padding: 15, 
    borderRadius: 10,
    marginBottom: 15,
    flex: 1,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    
  },
  dietaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  popupConfirmButton: { backgroundColor: '#EECC0A', padding: 10, borderRadius: 10, flex: 1, alignItems: 'center' },
  closeText: { fontSize: 16, color: '#FFF', fontWeight: 'bold' },
  dropdownContainer: { width: '100%', marginBottom: 15 },
  dropdown: { backgroundColor: '#E0E0E0' },
  dropdownItem: { justifyContent: 'flex-start' },
  dropdownDropdown: { backgroundColor: '#E0E0E0'},
});
