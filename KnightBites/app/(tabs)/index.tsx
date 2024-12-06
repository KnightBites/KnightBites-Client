import React from 'react';
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
import HomePage from "@/components/HomePage";
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
          options={{ headerLeft: props => { }, headerRight: props => { } }} />
        <Stack.Screen name="registration" component={RegisterPage}
          options={{ headerLeft: props => { }, headerRight: props => { } }} />
        <Stack.Screen name="recovery" component={RecoverPage}
          options={{ headerLeft: props => { }, headerRight: props => { } }} />
        <Stack.Screen name="buildSandwichHomePage" component={BuildSandwichHomePage}
          options={{ headerLeft: props => { }, headerRight: props => { } }} />
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

