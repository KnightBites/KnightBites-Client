import React from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Keyboard } from "react-native";
import { useState, useContext } from "react";
import RankableStars from "@/components/RankableStars";
import FoodPageStyles from "@/constants/FoodPageStyles";
import { ProfileContext } from "@/components/ProfileProvider";


export default function FoodPageRating(props: {route, navigation}) {
  const { dishID } = props.route.params;

  const [ textLength, setTextLength ] = useState(0);
  const [ comment, setComment ] = useState("");
  const [ rating, setRating ] = useState(0);

  const { profile } = useContext(ProfileContext);

  async function fetchComment(): Promise<void> {

  }

  async function recordComment(): Promise<void> {
    try {
      const resp = await fetch(
        "https://knightbitesapp-cda7eve7fce3dkgy.eastus2-01.azurewebsites.net/rating", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid: profile.id,
            foodid: dishID,
            userrating: rating,
            usercomment: comment,
          }),
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      props.navigation.goBack();
    }
  }

  return (
    <View style={styles.root}> 
      <Text style={styles.texts}>My Rating</Text>
      <RankableStars size={48} onPress={setRating}/>
      <Text style={styles.texts}>My Comment</Text>
      <Text style={styles.characterLength}>Note: Your username will be posted with your comment.</Text> 
      <TextInput
  style={[styles.commentEntry, FoodPageStyles.boxShadow]}
  multiline
  numberOfLines={10}
  maxLength={150}
  onChangeText={text => {
    setTextLength(text.length);
    setComment(text);
  }}
  onKeyPress={({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter') {
      Keyboard.dismiss(); // Dismiss the keyboard on Enter key press
    }
  }}
  returnKeyType="done"
/>      <Text style={styles.characterLength}>{ textLength }/150</Text>
      <TouchableOpacity style={FoodPageStyles.rateButton} onPress={() => recordComment()}><Text style={FoodPageStyles.rateButtonText}>Post My Review</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  texts: {
    fontSize: 30,
    marginBottom: 15,
    marginTop: 15
  },
  root: {
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    fontFamily: "System",
    fontWeight: "bold",
  },
  commentEntry: {
    width: 300,
    height: 175,
    backgroundColor: "#efeeee",
    marginRight: 10,
    marginLeft: 10

  },
  
  characterLength: {
    fontSize: 15,
    marginTop: 10,
    marginBottom :10,
    marginRight: 5,
    marginLeft: 5
  }
});
