import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { ColorSpace } from "react-native-reanimated";

const styles = StyleSheet.create({
    headerBar: {
      width: "100%",
      position: "sticky",
      padding: 15,
      alignItems: "center",
      flexDirection: "row",
      flex: 1,
      marginTop: 20,
      marginBottom: 20,
    },
    headerUser: {
      marginLeft: "auto",
      fontSize: 20,
    },
    headerAppTitle: {
      fontSize: 40,
      color: "gold",
      fontWeight: "bold",
      marginVertical: 10
    },
    headerAppImage: {
      width: 50,
      height: 50,
      marginRight: 15,
    },
    container: {
      flexDirection: "column",
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
      height: '100%',
    },
    dropdownContainer: {
      flex: 1,
      marginHorizontal: 10,
      width: '100%',
      minWidth: 100,
      height: '100%',
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
    },
    dropdownListItem: {
      fontSize: 15,
    },
    searchBar: {
      height: '100%',
      borderColor: 'black',
      borderRadius: 10,
      backgroundColor: Colors.light.background,
      borderWidth: 1,
      padding: 10,
      width: '100%',
      flex: 1,
      fontSize: 30,
      fontColor: Colors.light.text,
    },
    buttonContainer: {
      marginTop: 20,
      fontColor: 'black',
      zIndex: 999, // Lower zIndex for the button, so it's not overlayed by the dropdown
    },
    feedContainer: {
      alignItems: "center",
      width: '100%',
      flex: 5,
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

    // The following styles are for the login page. 
    //loginTextBar is the style of entering in the passwords and usernames. 
    loginTextBar: {
      borderRadius: 15,
      borderColor: 'black',
      borderWidth: 2,
      width: 250,
      alignItems: "center",
      padding: 10,
      shadowColor: 'grey',
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
      alignContent: "center",
      fontSize: 15
    },
    toggleText: {
      color: 'black',
      fontSize: 14,
      marginTop: 8,
      alignItems: "center"
    },

  });

export default styles;
