import { View, Text, StyleSheet } from "react-native";
import { React } from "react";

export default function Comment(props: {commentText: string, username: string}) {
  return (
    <View>
      <Text style={styles.username}>@{props.username}</Text>
      <View style={styles.commentContainer}>
        <Text style={styles.commentText}>{props.commentText}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  commentContainer: {
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 5,
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  commentText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  username: {
    fontSize: 10,
  }
});
