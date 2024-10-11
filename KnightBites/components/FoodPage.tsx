import { StyleSheet, Text, View, Image } from "react-native";
import { MainStyles } from "@/constants/Styles";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Dish from "@/interfaces/Dish";
import StarRating from "@/components/StarRating";
import { Colors } from "@/constants/Colors";

function translateCafeteria(value: number) {
  switch(value) {
    case(-1):
      return "Everywhere";
    case(0):
      return "Commons";
    case(1):
      return "Knollcreset";
    case(2):
      return "Johnny's";
    case(3):
      return "Peet's";
    case(4):
      return "Upper Crust";
  }
}

export default function FoodPage({navigation, dish}) {
  return (
    <View>
      <Header />
        <View style={styles.infoSection}>
          <View style={styles.headerInfo}>
            <Image style={styles.image} source={{uri: dish.img}} />
            <View style={styles.nameAndRating}>
              <Text style={styles.name}>{dish.name}</Text>
              <StarRating foodRating={dish.rating}></StarRating>
            </View>
          </View>
          <Text style={styles.description}>{dish.desc}</Text>
          <Text style={styles.locations}>Locations: {translateCafeteria(dish.respectiveCafeteria)}</Text>
        </View>
        <View style={styles.yourRating}>
          <Text>Your Rating: </Text>
          <StarRating foodRating={dish.rating}></StarRating>
        </View>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  infoSection: {
    backgroundColor: "lightgrey",
    padding: 15,
  },
  headerInfo: {
    flexDirection: "row",
    marginBottom: 10,
  },
  name: {
    fontSize: 48,
  },
  description: {
    fontSize: 24,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  locations: {
    fontSize: 24,
  },
  yourRating: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
});
