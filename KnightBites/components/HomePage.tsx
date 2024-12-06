import React from 'react';
<<<<<<< HEAD
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
=======
import { View, Text, FlatList, TouchableOpacity, TextInput, Pressable, ActivityIndicator, Switch, Dimensions } from 'react-native';
import FoodPanel from '@/components/FoodPanel';
import DropDownPicker from 'react-native-dropdown-picker';
import { Header, HeaderRight } from '@/components/Header';
import { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from '@/constants/Styles';
import Dish from "@/interfaces/Dish";
import { ProfileProvider } from "@/components/ProfileProvider";
import Icon from 'react-native-vector-icons/Ionicons'; 
import { ProfileContext } from "@/components/ProfileProvider";
import { Animated } from 'react-native';



export default function HomePage({ navigation }) {

    // first things first, make sure the user is logged in to see this page
    const { profile } = useContext(ProfileContext);
    if (!profile.loggedIn) {
      navigation.navigate("login");
      // the return makes this final to react, otherwise it will try (and non-gracefully fail) to do all the stuff below
      return;
    }
  
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [restaurant, setRestaurant] = useState<string | number>("-1");
    const [mealtime, setMealtime] = useState<string | number>("-1");
    const [dietary, setDietary] = useState<string[]>([]);
  
    const [items, setItems] = useState([
      { label: 'All Dining Halls', value: "-1" },
      { label: 'Commons Dining Hall', value: "Commons" },
      { label: 'Knollcrest Dining Hall', value: "Knollcrest" },
      { label: 'Johnny\'s', value: "Johnny\'s" },
      { label: 'Peet\'s Coffee', value: "Peets" },
      { label: 'UpperCrust', value: "UpperCrust" },
    ]);
    const [dishData, setDishData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterHeight] = useState(new Animated.Value(0));
  
    const getDishData = async () => {
      try {
        const resp = await fetch(
          "https://knightbitesapp-cda7eve7fce3dkgy.eastus2-01.azurewebsites.net/dish"
        );
        const json = await resp.json();
        setDishData(json.map(dish => ({
          ...dish,
          rating: dish.avg ?? 0, // if the dish has no rating data yet, it is null. Show zero starts in that case
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
  
    // TODO: This is a bit too complex and I cannot get this working as I would like. I will need to tweak this over time.
    // This works perfect on iPad mini 5, but not on iPhone 16. I will need to test on other devices.
    // This should not be a problem for the final presentation.
    useEffect(() => {
      const screenWidth = Dimensions.get('window').width; // This gets the width of whatever screen you're using in pixels.
      const numColumns = screenWidth > 1500 ? 3 : 2; // If the current screen is wider than 768 pixels, use 3 columns. Otherwise, use 2.
      // This will let Jacob's iPad use 3 columns, while an iPhone 16 (simulator) uses 2.
      const numRows = Math.ceil(items.length / numColumns); // This will calculate the number of rows needed to display all the items.
      const rowHeight = 55; // Adjust this value based on the height of each row
      const height = open ? numRows * rowHeight + 26: 0; // If the filter is open, set the height to the number of rows times the height of each row. Otherwise, set it to 0.
  
      Animated.timing(filterHeight, {
          toValue: height,
          duration: 300,
          useNativeDriver: false,
      }).start();
  }, [open, items.length]);
  
    const defaultDishData: Dish[] = [{
      foodname: 'No Dish Found',
      description: 'Try a different search',
      rating: 0,
      dininghall: "",
      img: 'https://placehold.co/200',
      vegan: null,
      vegetarian: null,
      halal: null,
      mealtime: null,
    }]
  
    const getFilteredDishData = (): Dish[] => {
      // do any wrangling of the data
      const filtered = dishData.filter(dish => (
        (restaurant == -1 || dish.dininghall == restaurant) &&
        (dish.foodname.toLowerCase().includes(search.toLowerCase())) &&
        (mealtime == -1 || dish.mealtime == mealtime) &&
        (dietary.length == 0 || dietary.every(restriction => dish[restriction]))
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
          <TouchableOpacity onPress={() => setOpen(!open)}>
            <Icon
              name="filter-outline"
              size={27}
              color="black"
              style={styles.filterIcon}
            />
          </TouchableOpacity>
        </View>
  
        {/* This is a filter box that will appear when the filter icon is clicked.  */}
        <Animated.View style={[styles.filterBox, { height: filterHeight }]}>
          {open && (
            <View style={{flex:1, backgroundColor: "white"}}>
              <View style={styles.switchContainer}>
                <Text>Any Dining Hall</Text>
                <Switch
                  value={restaurant === -1}
                  onValueChange={() => setRestaurant(restaurant === -1 ? -1 : "-1")}
                  trackColor={{ false: "gray", true: "gold" }}
                />
              </View>

              <View style={styles.switchContainer}>
                <Text>Commons</Text>
                <Switch
                value={restaurant === "Commons"}
                onValueChange={() => setRestaurant(restaurant === "Commons" ? -1 : "Commons")}
                trackColor={{ false: "gray", true: "gold" }}
                />
              </View>

              <View style={styles.switchContainer}>
                <Text>Knollcrest</Text>
                <Switch
                  value={restaurant === "Knollcrest"}
                  onValueChange={() => setRestaurant(restaurant === "Knollcrest" ? -1 : "Knollcrest")}
                  trackColor={{ false: "gray", true: "gold" }}
                />
              </View>

              <View style={styles.switchContainer}>
                <Text>Johnny's</Text>
                <Switch
                  value={restaurant === "Johnny's"}
                  onValueChange={() => setRestaurant(restaurant === "Johnny's" ? -1 : "Johnny's")}
                  trackColor={{ false: "gray", true: "gold" }}
                />
              </View>

              <View style={styles.switchContainer}>
                <Text>Peet's</Text>
                <Switch
                  value={restaurant === "Peets"}
                  onValueChange={() => setRestaurant(restaurant === "Peets" ? -1 : "Peets")}
                  trackColor={{ false: "gray", true: "gold" }}
                />
              </View>

              <View style={styles.switchContainer}>
                <Text>UpperCrust</Text>
                <Switch
                  value={restaurant === "UpperCrust"}
                  onValueChange={() => setRestaurant(restaurant === "UpperCrust" ? -1 : "UpperCrust")}
                  trackColor={{ false: "gray", true: "gold" }}
                />
              </View>

              <View style={styles.switchContainer}>
                <Text>Breakfast</Text>
                <Switch
                  value={mealtime === "Breakfast"}
                  onValueChange={() => setMealtime(mealtime === "Breakfast" ? -1 : "Breakfast")}
                  trackColor={{ false: "gray", true: "gold" }}
                /> 
              </View>

              <View style={styles.switchContainer}>
                <Text>Lunch</Text>
                <Switch
                  value={mealtime === "Lunch"}
                  onValueChange={() => setMealtime(mealtime === "Lunch" ? -1 : "Lunch")}
                  trackColor={{ false: "gray", true: "gold" }}
                />
              </View>

              <View style={styles.switchContainer}>
                <Text>Dinner</Text>
                <Switch
                  value={mealtime === "Dinner"}
                  onValueChange={() => setMealtime(mealtime === "Dinner" ? -1 : "Dinner")}
                  trackColor={{ false: "gray", true: "gold" }}
                />
              </View>

              <View style={styles.switchContainer}>
                <Text>Vegan</Text>
                <Switch
                  value={dietary.includes("vegan")}
                  onValueChange={() => setDietary(dietary.includes("vegan") ? dietary.filter(restriction => restriction !== "vegan") : [...dietary, "vegan"])}
                  trackColor={{ false: "gray", true: "gold" }}
                />
              </View>

              <View style={styles.switchContainer}>
                <Text>Vegetarian</Text>
                <Switch
                  value={dietary.includes("vegetarian")}
                  onValueChange={() => setDietary(dietary.includes("vegetarian") ? dietary.filter(restriction => restriction !== "vegetarian") : [...dietary, "vegetarian"])}
                  trackColor={{ false: "gray", true: "gold" }}
                />
              </View>

              <View style={styles.switchContainer}>
                <Text>Halal</Text>
                <Switch
                  value={dietary.includes("halal")}
                  onValueChange={() => setDietary(dietary.includes("halal") ? dietary.filter(restriction => restriction !== "halal") : [...dietary, "halal"])}
                  trackColor={{ false: "gray", true: "gold" }}
                />
              </View>

            </View>
          )}
        </Animated.View>
  
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
    );
  }
  
  // styles in constants/Styles.ts
>>>>>>> main
