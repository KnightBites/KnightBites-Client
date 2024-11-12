import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "@/constants/Colors";
import { ColorSpace } from "react-native-reanimated";

const styles = StyleSheet.create({
    headerBar: {
      width: "100%",
      height: 70,
      position: "relative",
      alignItems: "flex-start",
      flexDirection: "row",
      flex: 1,      
      marginTop: 0,
      marginBottom: 0,
    },
    headerUser: {
      marginLeft: "auto",
      fontSize: 20,
      color: "white",
    },
    headerAppTitle: {
      fontSize: 40,
      color: "gold",
      fontWeight: "bold",
      marginVertical: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    headerAppImage: {
      width: 70,
      height: "100%", // Keep the image square, 50x50 is good for a small logo in the header.
      marginBottom: 0,
      marginRight: 15,
      justifyContent: "center",
    },
    container: {
      flexDirection: "row",
      height: "100%",
      width: "100%",
      backgroundColor: Colors.light.background,
    },
    mainContainer: {
      flex: 8,
      flexDirection: 'column',
      backgroundColor: Colors.light.background,
    },
    filterContainer: {
      marginBottom: 20, // Adds space below the dropdown
      zIndex: 1000,
      flexDirection: 'row',
      width: '100%',
      height: 80,
      justifyContent: 'center',
      alignContent: 'center',
      flex: 1,
    },
    searchContainer: {
      flex: 3,
      marginHorizontal: 10,
      width: '100%',
      height: 50,
      marginTop: 5,
      marginBottom: 10,
    },

    // This starts the Dropdown option styles ////////////
    dropdownContainer: {
      flex: .9, // This controls how much space the dropdown takes up horizontally. Adding more space will make the dropdown wider.
      marginHorizontal: 10,
      marginTop: 4,
      width: '100%',
      minWidth: 100,
      height: 40,
      marginTop: 12, // Adds space above the dropdown, between it and the header
      marginBottom: 10, // Adds space below the dropdown, between it and the feed
      justifyContent: 'center', // Center the text vertically
      alignItems: 'center', // Center the text horizontally
    },
    dropdown: {
      zIndex: 1000, // Ensure the dropdown input is above other content
      width: '100%',
      height: '100%',
      fontSize: 20,
      justifyContent: 'center',
      alignContent: 'center',
    },
    dropdownList: {
      position: 'absolute', // Overlay dropdown list
      top: 60, // Position the dropdown list below the dropdown input
      minHeight: 250,
      padding: 0,
    },
    dropdownListItem: {
      fontSize: 15,
      justifyContent: 'center',
      marginTop: 0,
      padding: 0,
    },
    // End of Dropdown option styles ////////////

    searchBar: {
      height: 50,
      marginTop: 4,
      borderColor: 'black',
      borderRadius: 10,
      backgroundColor: Colors.light.background,
      borderWidth: 1,
      padding: 10,
      width: '100%',
      flex: 1,
      fontSize: 30,
      color: Colors.light.text,
    },
    clearTextButton: { 
      zIndex: 1000,
      height: 50,
      marginTop: 8,
      backgroundColor: 'maroon', // This feature looks weird on web version, but works perfect on mobile. Not sure why. -JT
      padding: 0,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'black', 
      justifyContent: 'center',
      alignContent: 'center',
    },
    sortFoodButton: { 
      zIndex: 1000,
      height: 50,
      marginTop: 8,
      backgroundColor: 'maroon', // This feature looks weird on web version, but works perfect on mobile. Not sure why. -JT
      padding: 0,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'black',
      justifyContent: 'center',
      alignContent: 'center',
    },
    buttonContainer: {
      marginTop: 20,
      color: 'black',
      zIndex: 999, // Lower zIndex for the button, so it's not overlayed by the dropdown
    },
    feedContainer: { // This is the container for the feed that displays all food items
      alignItems: "center",
      width: '100%',
      flex: '25%', // This controls the gap between the feed and the search bar & dropdown
      overflow: 'hidden',
      padding: 10,
      height: "100%",
    },
    feed: {
      borderColor: 'black',
      backgroundColor: 'darkred',
      borderRadius: 10,
      borderWidth: 5,
      width: '100%',
      paddingHorizontal: 10,
      flexDirection: 'column',
      flex: 1,
    },
    footerBar: {
      width: "100%",
      position: "sticky",
      backgroundColor: "#666666",
      padding: 15,
      justifyContent: "center",
      flex: 1,
      marginTop: 20,
      bottom: 0,
      fontSize: 30,
    },
    footerLink: {
      color: "black",
      fontSize: 30,
      alignSelf: "flex-start",
    },

        // This is for the about page
        aboutPageContainer: {
          flexDirection: 'column',
          width: '100%',
          flex: 1,
        },
        aboutPageSection: {
          width: '100%',
          flex: 1, // I think this is a boolean value that flags if the section will be flexible height. Leave both at 1.
          padding: 10,
          backgroundColor: Colors.light.background,
          borderColor: 'black',
          marginTop: 0,
          marginBottom: 0,
          borderWidth: 0,
          borderRadius: 0,
        },

    // The following styles are for the login page. 
    //loginTextBar is the style of entering in the passwords and usernames. 
    loginTextBar: {
      borderRadius: 15,
      borderColor: 'black',
      borderWidth: 2,
      width: 250,
      alignItems: "center",
      padding: 10,
      shadowColor: Colors.light.background,
      shadowOpacity: 0.25,
      elevation: 5,
      marginVertical: 10,
      position: "sticky",
    },
    loginTextBarHover: {
      borderColor: 'blue' //Testing this, just to see what it looks like later?? 
    },

    submitRegistrationButton: {
      borderRadius: 25,
      borderColor: "black", 
      borderWidth: 2, 
      width: 100,
      height: 40, 
      textAlign: "center",
      fontSize: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    toggleText: {
      color: 'black',
      fontSize: 14,
      marginTop: 8,
      alignItems: "center"
    },

    // This is for the registration buttons page to select vegan

    dietaryRestrictionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20
    },

    dietaryRestrictionButton: {
      flex: 1,
      marginHorizontal: 5,
      height: 50,
      width: 150,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.light.background, 
      borderRadius: 25,
      borderColor: "black",
      borderWidth: 2,
    },

    dietaryRestrictionButtonSelection: {
      backgroundColor: 'gold',
    },

    // These styles are for the Uppercrust Buttons

    uppercrustViewSandwiches: {
      borderRadius: 25,
      borderColor: "black", 
      borderWidth: 2, 
      width: 200,
      height: 80, 
      textAlign: "center",
      fontSize: 15,
      alignItems: 'center'
  });

export default styles;
