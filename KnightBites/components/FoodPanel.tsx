import { View, Text, Image, StyleSheet } from "react-native";

export default function FoodPanel({image, foodName, foodDescription}) {
  return (
    <View style={styles.panel}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image}></Image>
      </View>
      <View style={styles.information}>
        <Text style={styles.name}>{foodName}</Text>
        <Text style={styles.description}>{foodDescription}</Text>
      </View>
    </View>
  )
}

const styles: StyleSheet = StyleSheet.create({
  imageContainer: {
    flex: 1,
    margin: "10px",
    minWidth: "200px", // min width keeps the image and text from colliding
    width: "200px",
    height: "200px",
  },
  image: {
    width: "200px",
    aspectRadio: "1/1",
    height: "200px",
    borderRadius: "10px",
  },
  name: {
    fontSize: "64pt",
    flex: 1,
  },
  description: {
    flex: 2,
  },
  panel: {
    backgroundColor: "grey",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    borderRadius: "10px",
    width: "100%",
  },
  information: {
    flex: 3,
    display: "flex",
    flexDirection: "column",
    height: "90%",
    margin: "10px",
  },
});
