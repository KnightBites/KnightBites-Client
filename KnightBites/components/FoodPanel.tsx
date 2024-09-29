import { View, Text, Image, StyleSheet } from "react-native";
import StarRating from "@/components/StarRating.tsx";

export default function FoodPanel({image, foodName, foodDescription, foodRating}) {
  return (
    <View style={styles.panel}>
      {/* <View style={styles.imageContainer}>
        <Image style={styles.image} source={image}></Image>
      </View> */}
      <View style={styles.information}>
        <Text style={styles.name}>{foodName}</Text>
        <Text style={styles.description}>{foodDescription}</Text>
        <StarRating rating={foodRating}></StarRating>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    margin: 10,
    minWidth: 200,
    width: 200,
    height: 200,
  },
  image: {
    width: 200,
    aspectRatio: 1,
    height: 200,
    borderRadius: 10,
  },
  name: {
    fontSize: 32,
    flex: 1,
  },
  description: {
    flex: 2,
  },
  panel: {
    backgroundColor: "grey",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    borderRadius: 10,
    marginTop: 15,
    width: "100%",
  },
  information: {
    flexDirection: "column",
    height: "90%",
    margin: 10,
  },
});
