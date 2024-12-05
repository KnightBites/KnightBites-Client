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

////////
// Pages
////
import FoodPage from "@/components/FoodPage";
import LoginPage from "@/components/LoginPage";
import RegisterPage from "@/components/RegistrationPage";
import RecoverPage from "@/components/RecoverAccountPage";
import BuildSandwich from "@/components/BuildWich";
import ViewSandwich from "@/components/ViewWich";
import ViewOneSandwich from "@/components/ViewOneSandwich";
import BuildSandwichHomePage from "@/components/BuildWichHome";
import ProfilePage from "@/components/ProfilePage";
import ChooseBread from "@/components/ChooseBread";
import FoodPageRating from "@/components/FoodPageRating";
import FAQ from '@/components/FAQ'; // This is temporary until the FAQ page is implemented


const Stack = createNativeStackNavigator();

export default function EntryPoint() {
  return (
    <ProfileProvider>
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
        <Stack.Screen name="buildSandwichHomePage" component={BuildSandwichHomePage}
          options={{ headerLeft: props => { } }} />
        <Stack.Screen name="buildSandwich" component={BuildSandwich} />
        <Stack.Screen name="viewSandwich" component={ViewSandwich} />
        <Stack.Screen name="viewOneSandwich" component={ViewOneSandwich} />
        <Stack.Screen name="profile" component={ProfilePage} />
        <Stack.Screen name="ChooseBread" component={ChooseBread} />
        <Stack.Screen name="rateDish" component={FoodPageRating} />
        <Stack.Screen name="FAQ" component={FAQ} />
      </Stack.Navigator>
    </ProfileProvider>
  )
}

function HomePage({ navigation }) {

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

      <Animated.View style={[styles.filterBox, { height: filterHeight }]}> {/* This is a filter box that will appear when the filter icon is clicked.  */}
        {open && (
          <>
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

          </>
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
