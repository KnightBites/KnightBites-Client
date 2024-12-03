import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { React, useState } from "react";
import Dish from "@/interfaces/Dish";
import StarRating from "@/components/StarRating";
import Comment from "@/components/Comment";
import FoodPageStyles from "@/constants/FoodPageStyles";
import Icon from "react-native-vector-icons/Entypo";

export default function FoodPage(props: {route, navigation}) {
  // eslint-disable-next-line
  const {dish, review} = props.route.params; // extract dish from route params

  // eslint-disable-next-line
  const [dishData, setDishData] = useState<Dish[]>([{id: 1, username: "little_kendian", commentText: "Wow this changed my life. #CarnivoreDiet"},
                                                    {id: 2, username: "LDawg", commentText: "I got food poisoning."},
                                                    {id: 3, username: "LDawg", commentText: "I got food poisoning."},
                                                    {id: 4, username: "LDawg", commentText: "I got food poisoning."},
                                                  ]);

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
            { dishData.map(item => <Comment key={item.id} commentText={item.commentText} username={item.username} />)}
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

