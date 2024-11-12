import {useState} from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import StarRating from "@/components/StarRating";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FoodPage from "@/components/FoodPage";
import { Colors } from "@/constants/Colors";
import RankableStars from "./RankableStars";
import Icon from 'react-native-vector-icons/FontAwesome'; // using FontAwesome for location pin
import React from "react";

const Stack = createNativeStackNavigator();

export default function FoodPanel({navigation, dish}) {

  /*
    This component was just too hard to make a stylesheet for
    that would work on both mobile and web, so I just made two,
    and I choose between them based on the width of the component.
  */

  const [usingstyles, setStyles] = useState(styles_mobile);
  const [starSize, setStarSize] = useState(16);

  function chooseStyle(event) {
    if (event.nativeEvent.layout.width > 800) {
      setStyles(styles_web);
      setStarSize(32);
    } else {
      setStyles(styles_mobile);
      setStarSize(16);
    }
  }

  return (
    <View style={usingstyles.panel} onLayout={chooseStyle}>

      <Image style={usingstyles.picture} source={{uri: dish.img}}></Image>
      
      <View style={usingstyles.information}>
        <Text style={usingstyles.name}>{dish.foodname}</Text>
        <View style={usingstyles.rating}>
          <StarRating foodRating={dish.rating} size={starSize}></StarRating>
          <Text style={usingstyles.ratingNum}>{dish.rating.toFixed(1)}</Text>
        </View>
        <Text style={usingstyles.description}>{dish.description}</Text>
        {/* Spacer for mobile */}
        <View style={usingstyles.spacer}><Text></Text></View>
      </View>
      
      <View style={usingstyles.location}>
        <Text style={usingstyles.locationText}>{dish.dininghall}</Text>
        <Icon name={"map-marker"} style={usingstyles.location_pin} />
      </View>

      <View style={usingstyles.leave_review}>
        <Text style={usingstyles.leave_review_text}>Leave Your Review - </Text>
        <RankableStars size={starSize} keeps={false} onPress={(val) => navigation.navigate("foodPage", {dish, review: val})}></RankableStars>
      </View>      
    </View>

    
  )
}

const styles_web = StyleSheet.create({
  picture: {
    width: 200,
    aspectRatio: 1,
    height: 200,
    borderRadius: 10,
    margin: 5,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    flex: 1,
  },
  description: {
    flex: 2,
    fontSize: 20,
    width: "60%",
  },
  panel: {
    backgroundColor: "#777",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    borderColor: "black",
    borderWidth: 4,
    marginVertical: 4,
    width: "100%",
  },
  information: {
    height: "90%",
    margin: 10,
    position: "absolute",
    left: 210,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingNum: {
    fontSize: 30,
    marginLeft: 10,
    color: "gold",
    fontWeight: "bold",
  },
  location: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    right: 10,
    top: 0,
  },
  locationText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  location_pin: {
    fontSize: 40,
    marginLeft: 10,
  },
  leave_review: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    right: 10,
    bottom: 0,
  },
  leave_review_text: {
    fontSize: 20,
  },
  spacer: {
    height: 0,
  }
});



const styles_mobile = StyleSheet.create({
  picture: {
    width: 200,
    aspectRatio: 1,
    height: 200,
    borderRadius: 10,
    margin: 5,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  description: {
    flex: 2,
    fontSize: 10,
  },
  panel: {
    backgroundColor: "#777",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    borderColor: "black",
    borderWidth: 4,
    marginVertical: 4,
    width: "100%",
  },
  information: {
    flexDirection: "column",
    height: "90%",
    margin: 10,
    flex: 4,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingNum: {
    fontSize: 14,
    marginLeft: 10,
    color: "gold",
    fontWeight: "bold",
  },
  location: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    right: 10,
    top: 0,
  },
  locationText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  location_pin: {
    fontSize: 20,
    marginLeft: 10,
  },
  leave_review: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    right: 10,
    bottom: 0,
  },
  leave_review_text: {
    fontSize: 10,
  },
  spacer: {
    height: 30,
    backgroundColor: "transparent",
  }
});
