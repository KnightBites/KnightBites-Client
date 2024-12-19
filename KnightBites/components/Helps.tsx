import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import Home_AdvancedSearch1 from '@/assets/images/Help/Home_AdvancedSearch1.png';
import Home_AdvancedSearch2 from '@/assets/images/Help/Home_AdvancedSearch2.png';
import FoodPage_Overview1 from '@/assets/images/Help/FoodPage_Overview1.png';
import Profile_Email1 from '@/assets/images/Help/Profile_Email1.png';
import Profile_Pass1 from '@/assets/images/Help/Profile_Pass1.png';
import Profile_Dietary1 from '@/assets/images/Help/Profile_Dietary1.png';
import BAW_Overview1 from '@/assets/images/Help/BAW_Overview1.png';

const helpStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    text: {
        fontSize: 16,
        marginVertical: 5,
    },
    imageContainer: {
        width: '100%',
        height: 200, // Set a fixed height for the container
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 10,
    }
}); 

const homeHelp = [
    {
        title: "Overview",
        content:
            <ScrollView style={helpStyles.container}>
                <Text style={helpStyles.text}>This is the home page, where you can find every food item offered by Calvin Dining Services. You can use the search bar to find a specific dish, or simply click on any of the dishes present to get started.</Text>
            </ScrollView>
    },
    {
        title: "Advanced Search",
        content:
            <ScrollView>
                <Text style={helpStyles.text}>Click the filter button to open a menu for some more specific options.</Text>
                <View style={helpStyles.imageContainer}><Image source={Home_AdvancedSearch1} style={helpStyles.image} /></View>
                <Text style={helpStyles.text}>You have multiple filter options: The dining hall the dish is served at, whether the dish is typically a breakfast, lunch, or dinner option, and what dietary restrictions the dish should meet.</Text>
                <View style={helpStyles.imageContainer}><Image source={Home_AdvancedSearch2} style={helpStyles.image} /></View>
                <Text style={helpStyles.text}>Additionally, there are a couple sorting options here - you can chose to sort by rating or alphabetically by name. This sort can also be reversed.</Text>
            </ScrollView>
    }
];

const foodPageHelp = [
    {
        title: "Overview",
        content:
            <ScrollView>
                <Text style={helpStyles.text}>This is the food page, where you can find more information about a specific food item. Here you can find the name of the dish, the dining hall it is served at, and the meal type it is typically served as.</Text>
                <View style={helpStyles.imageContainer}><Image source={FoodPage_Overview1} style={helpStyles.image} /></View>
                <Text style={helpStyles.text}>More notable, however, are the ratings left by other users. You can see the average rating on this dish, as well as comments left by other users.Should you want to leave your own review, you can click on the button on the bottom of the screen that says "Rate this dish". This will allow you to give the food 1-5 stars, as well as optionally type out a comment for more detail.</Text>
            </ScrollView>
    }
];

const profileHelp = [
    {
        title: "Overview",
        content:
            <ScrollView>
                <Text style={helpStyles.text}>This is the profile page, where you can edit your account info. You can edit your email, password, or your dietary restrictions. You may also logout from here.</Text>
            </ScrollView>
    },
    {
        title: "Change Password",
        content:
            <ScrollView>
                <Text style={helpStyles.text}>You can click on your hidden password to open a popup menu, where you can change your password.</Text>
                <View style={helpStyles.imageContainer}><Image source={Profile_Pass1} style={helpStyles.image} /></View>
                <Text style={helpStyles.text}>Then you must re-enter your old password, and may submit a new password.</Text>
            </ScrollView>
    },
    {
        title: "Change Email",
        content:
            <ScrollView>
                <Text style={helpStyles.text}>You can click on your email to open a popup menu, where you can change your email.</Text>
                <View style={helpStyles.imageContainer}><Image source={Profile_Email1} style={helpStyles.image} /></View>
                <Text style={helpStyles.text}>At this point you should get an email to verify the switch (I think, anyways. It wasn{'\''}t working for me...)</Text>
            </ScrollView>
    },
    {
        title: "Dietary Restrictions",
        content:
            <ScrollView>
                <Text style={helpStyles.text}>You can click on the {'"'}Set Restrictions{'"'} to open a popup menu, where you can change your dietary restrictions.</Text>
                <View style={helpStyles.imageContainer}><Image source={Profile_Dietary1} style={helpStyles.image} /></View>
                <Text style={helpStyles.text}>A red button here indicates that you DO have the restriction, and a gray button indicates that you DO NOt have this restriction. Changing your restrictions here is not strictly necessary - it is simply useful for users who have a restriction, as they will see an small indicator when viewing a dish that violates their restrictions.</Text>
            </ScrollView>
    },
]

// BuildAWichHome
const BAWHome = [
    {
        title: "Overview",
        content:
            <ScrollView>
                <Text style={helpStyles.text}>This is the Build-A-Wich page, the section of the app dedicated to Uppercrust. Here, you can recreate your own favorite sandwiches to share with the world, or browse sandwiches others have made.</Text>
            </ScrollView>
    }
];

const BuildSandwich = [
    {
        title: "Overview",
        content:
            <ScrollView>
                <Text style={helpStyles.text}>In this page, you walk through around 7 steps to recreate a sandwich. Use the 2 buttons at the bottom to go back and forth to any step.</Text>
                <View style={helpStyles.imageContainer}><Image source={BAW_Overview1} style={helpStyles.image} /></View>
                <Text style={helpStyles.text}>You can select every option, none of them, or everything in between! And near the end, you will be asked to (optionally) add a special description, and finally, you will have to review your creation and name it. After that, click finish, and the sandwich will be published!</Text>
            </ScrollView>
    }
];

const viewSandwich = [
    {
        title: "Overview",
        content:
            <ScrollView>
                <Text style={helpStyles.text}>This is the View Sandwich page, where you can see a sandwich that has been made by another user.</Text>
            </ScrollView>
    }
];

export { homeHelp, profileHelp, foodPageHelp, BAWHome, BuildSandwich, viewSandwich };