import React from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import Dish from "@/interfaces/Dish";
import StarRating from "@/components/StarRating";
import Comment from "@/components/Comment";
import FoodPageStyles from "@/constants/FoodPageStyles";
import Icon from "react-native-vector-icons/Entypo";

export default function FoodPage(props: {route, navigation}) {
  // eslint-disable-next-line
  const {dish}  = props.route.params; // extract dish from route params

  // eslint-disable-next-line
  const [commentData, setCommentData] = useState([]);

  async function getCommentData() {
    try {
      const resp = await fetch(`https://knightbitesapp-cda7eve7fce3dkgy.eastus2-01.azurewebsites.net/comments/${dish.id}`);
      const json = await resp.json();
      setCommentData(json);
    } catch (err) {
      // the best practice right here - the "LALALALALA I CANT HEAR YOU" approach
      // (server sends back "bad json", which gets read fine regardless, but it still whines)
      if (err != "SyntaxError: JSON Parse error: Unexpected character: <") {
        console.error(err);
      }
    } finally {
      // pass
    }
  }

  useEffect(() => {
    getCommentData();
  }, [])

  return (
    <View style={FoodPageStyles.foodPageRoot}>
      <ScrollView>
        <View style={[FoodPageStyles.imageContainer, FoodPageStyles.boxShadow]}>
          <Image style={FoodPageStyles.foodImage} source={{uri: dish.image}} />
        </View>
        <View style={FoodPageStyles.infoContainer}>
          <View style={FoodPageStyles.infoTitleLocationContainer}>
            <Text style={FoodPageStyles.infoTitle}>{dish.foodname}</Text>
            <Text style={FoodPageStyles.infoLocation}>
              <Icon name="location-pin" size={18}/>
              {dish.dininghall}
            </Text>
          </View>
          <View style={FoodPageStyles.infoRatingContainer}>
            <StarRating style={FoodPageStyles.infoStarRating} foodRating={dish.rating} />
            <Text style={FoodPageStyles.infoNumberRating}>{dish.rating}</Text>
          </View>
          <Text style={FoodPageStyles.infoDescription}>{dish.description}</Text>
        </View>
        <View style={FoodPageStyles.commentContainer}>
          <Text style={FoodPageStyles.commentheader}>Comments</Text>
          <View style={[FoodPageStyles.commentBox, FoodPageStyles.boxShadow]}>
            {
              (commentData.length > 0)
              ? commentData.map(item => <Comment key={item.id} commentText={item.usercomment} username={item.username} />)
              : <Text>Be the first to make a comment!</Text>
            }
          </View>
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity style={FoodPageStyles.rateButton}
                          onPress={() => props.navigation.navigate("rateDish", {"dishID": dish.id})}
        >
          <Text style={FoodPageStyles.rateButtonText}>Rate This Dish</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

