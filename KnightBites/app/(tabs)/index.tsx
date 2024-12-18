import React from 'react';
import { Header, HeaderRight } from '@/components/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

////////
// Pages
////
import HomePage from "@/components/HomePage";
import FoodPage from "@/components/FoodPage";
import LoginPage from "@/components/LoginPage";
import RegisterPage from "@/components/RegistrationPage";
import RecoverPage from "@/components/RecoverAccountPage";
import ProfilePage from "@/components/ProfilePage";
import FoodPageRating from "@/components/FoodPageRating";
import FAQ from '@/components/FAQ'; // This is temporary until the FAQ page is implemented


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
          options={{ headerLeft: props => { }, headerRight: props => { }}} />
        <Stack.Screen name="registration" component={RegisterPage}
          options={{ headerLeft: props => { }, headerRight: props => { } }} />
        <Stack.Screen name="recovery" component={RecoverPage}
          options={{ headerLeft: props => { }, headerRight: props => { } }} />
        <Stack.Screen name="profile" component={ProfilePage} />
        <Stack.Screen name="rateDish" component={FoodPageRating} />
        <Stack.Screen name="FAQ" component={FAQ} />
      </Stack.Navigator>
  )
}

