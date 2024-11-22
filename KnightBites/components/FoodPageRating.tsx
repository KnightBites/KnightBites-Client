import { View, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import RankableStars from "@/components/RankableStars";
import FoodPageStyles from "@/constants/FoodPageStyles";


export default function FoodPageRating({route, navigation}) {
  const { dishID } = route.params;

  const [ textLength, setTextLength ] = useState(0);

  async function recordComment(): Promise<void> {
    // this will talk to the database in the future
  }

  return (
    <View style={styles.root}>
      <Text style={styles.texts}>My Rating</Text>
      <RankableStars size={48} />
      <Text style={styles.texts}>My Comment</Text>
      <TextInput style={[styles.commentEntry, FoodPageStyles.boxShadow]} multiline numberOfLines={10} maxLength={150} onChangeText={text => setTextLength(text.length)} />
      <Text>{ textLength }/150</Text>
      <TouchableOpacity style={FoodPageStyles.rateButton} onPress={() => recordComment()}><Text style={FoodPageStyles.rateButtonText}>Post My Review</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  texts: {
    fontSize: 36,
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
    height: 200,
    backgroundColor: "#efeeee",
  },
});
