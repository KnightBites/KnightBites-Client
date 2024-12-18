import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import Home_AdvancedSearch1 from '@/assets/images/Help/Home_AdvancedSearch1.png';
import Home_AdvancedSearch2 from '@/assets/images/Help/Home_AdvancedSearch2.png';

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
                <Text style={helpStyles.text}>This is the home page, where you can find every food item offered by Calvin Dining Services. You can use the search bar to find a specific food item, or simply click on any of the food items present to get started.</Text>
            </ScrollView>
    },
    {
        title: "Advanced Search",
        content:
            <ScrollView>
                <Text style={helpStyles.text}>Click the filter button to open a menu for some more specific options.</Text>
                <View style={helpStyles.imageContainer}><Image source={Home_AdvancedSearch1} style={helpStyles.image} /></View>
                <Text style={helpStyles.text}>You have multiple filter options: The dining hall, the dish is served at, whether the dish is typically a breakfast, lunch, or dinner option, and what dietary restrictions the dish should meet.</Text>
                <View style={helpStyles.imageContainer}><Image source={Home_AdvancedSearch2} style={helpStyles.image} /></View>
                <Text style={helpStyles.text}>Additionally, there are a couple sorting options here - you can chose to sort by rating or alphabetically by name. This sort can also be reversed.</Text>
            </ScrollView>
    }
];

const profileHelp = [
    {
        title: "",
        content: <View></View>
    }
]

export { homeHelp, profileHelp };