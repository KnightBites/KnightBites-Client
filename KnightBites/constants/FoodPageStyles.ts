import { StyleSheet } from "react-native";

const MAROON = "#910909";
const LIGHT_YELLOW = "#fff8de";

export default FoodPageStyles = StyleSheet.create({
  boxShadow: {
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  foodPageRoot: {
    backgroundColor: "#ffffff",
    flex: 1,
    // justifyContent: "space-between",
    fontFamily: "System",
    fontWeight: "bold",
    fontSize: 18,
  },

  imageContainer: {
    backgroundColor: LIGHT_YELLOW,
    alignSelf: "center",
    width: "80%",
    aspectRatio: 1,
    borderRadius: 20,
    margin: 10,
    marginBottom: 30,
    justifyContent: "center",
  },
  foodImage: {
    width: "80%",
    aspectRatio: 1,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 20,
  },

  infoContainer: {
    width: "80%",
    alignSelf: "center",
    marginTop: 0,
    marginBottom: 30,
  },
  infoTitleLocationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  infoLocation: {
    fontSize: 20,
  },
  infoRatingContainer: {
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  infoNumberRating: {
    fontSize: 16,
  },

  commentContainer: {
    alignSelf: "center",
    width: "85%",
  },
  commentheader: {
    fontSize: 18,
  },
  commentBox: {
    backgroundColor: LIGHT_YELLOW,
    borderRadius: 20,
    padding: 10,
    marginBottom: 70,
  },

  rateButton: {
    position: "absolute",
    bottom: 0,
    backgroundColor: MAROON,
    width: "70%",
    textAlign: "center",
    color: "#ffffff",
    alignSelf: "center",
    marginBottom: 10,
    padding: 10,
  },
});
