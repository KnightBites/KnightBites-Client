import { Text, View, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { MainStyles } from "@/constants/Styles";
import Dish from "@/interfaces/Dish";
import StarRating from "@/components/StarRating";
import Comment from "@/components/Comment";
import { Colors } from "@/constants/Colors";
import FoodPageStyles from "@/constants/FoodPageStyles";
import Icon from "react-native-vector-icons/Entypo";

function translateCafeteria(value: number) {
  switch(value) {
    case(-1):
      return "Everywhere";
    case(0):
      return "Commons";
    case(1):
      return "Knollcrest";
    case(2):
      return "Johnny's";
    case(3):
      return "Peet's";
    case(4):
      return "Upper Crust";
  }
}

// example usage:
// <FoodPage dish={{name: "Yummy", desc:"cool", rating: 3, respectiveCafeteria: -1, img: 'https://placehold.co/400'}} />
export default function FoodPage({route, navigation}) {
  const {dish, review} = route.params; // extract dish from route params

  return (
    <View style={FoodPageStyles.foodPageRoot}>
      <ScrollView>
        <View style={[FoodPageStyles.imageContainer, FoodPageStyles.boxShadow]}>
          <Image style={FoodPageStyles.foodImage} source={{uri: dish.img}} />
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
            { [{id: 1, username: "little_kendian", commentText: "Wow this changed my life. #CarnivoreDiet"}, {id: 2, username: "LDawg", commentText: "I got food poisoning."}, {id: 3, username: "LDawg", commentText: "I got food poisoning."}, {id: 4, username: "LDawg", commentText: "I got food poisoning."}].map(item => <Comment key={item.id} commentText={item.commentText} username={item.username} />)}
          </View>
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity style={FoodPageStyles.rateButton}
                          onPress={() => navigation.navigate("rateDish", {"dishID": dish.id})}
        >
          <Text style={FoodPageStyles.rateButtonText}>Rate This Dish</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

