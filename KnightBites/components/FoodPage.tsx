import { Text, View, Image, TextInput, TouchableOpacity, FlatList, ScrollView } from "react-native";
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
        {/* <View style={styles.infoSection}>
          <View style={styles.headerInfo}>
            <Image style={styles.image} source={{uri: dish.img}} />
            <View style={styles.nameAndRating}>
              <Text style={styles.name}>{dish.foodname}</Text>
              <StarRating foodRating={dish.rating}></StarRating>
            </View>
          </View>
          <Text style={styles.description}>{dish.description}</Text>
          <Text style={styles.locations}>Location: {dish.dininghall}</Text>
        </View>
        <View style={styles.yourRating}>
          <Text>Your Rating: </Text>
          <RankableStars foodRating={review}/>
        </View>
        <View style={styles.yourComment}>
          <Text>Your Comment: </Text>
          <TextInput onChangeText={recordComment} style={styles.commentEntry} />
        </View> */}

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
          <FlatList 
            style={[FoodPageStyles.commentBox, FoodPageStyles.boxShadow]}
            data={[{id: 1, username: "little_kendian", commentText: "Wow this changed my life. #CarnivoreDiet"}, {id: 2, username: "LDawg", commentText: "I got food poisoning."}, {id: 3, username: "LDawg", commentText: "I got food poisoning."}, {id: 4, username: "LDawg", commentText: "I got food poisoning."}]}
            renderItem={({item}) => <Comment commentText={item.commentText} username={item.username} />}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity style={FoodPageStyles.rateButton}
                          onPress={() => navigation.navigate("rateDish", {"dishID": dish.id})}
        >
          Rate This Dish
        </TouchableOpacity>
      </View>
    </View>
  )
}

