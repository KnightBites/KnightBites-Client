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
    backgroundColor: Colors.light.background, // White background behind the search bar and filter dropdown
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
    color: 'black',
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
    fontColor: 'black',
    color: 'black',
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
    backgroundColor: "#ffffff", // White background, behind the scrolling feed
  },
  feed: {
    borderColor: 'black',
      backgroundColor: '#cccccc', // I like this color for potential dark mode. #1f1f27 is a dark gray, we can use #3a3a42 for a lighter gray. -JT
      borderRadius: 10,
      borderWidth: 5,
      width: '100%',
    paddingHorizontal: 8,
    flexDirection: 'column',
    flex: 1,
    paddingBottom: 8,
  },
  footerBar: {
    width: "100%",
    position: "sticky",
    backgroundColor: "#cccccc",
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
  }
});

export default styles;
