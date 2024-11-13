import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import styles from "@/constants/Styles";

const Header = () => {
  return (
    <View style={styles.headerBar}>
      <Image style={styles.headerAppImage} source={require("@/assets/images/dining-hall.jpg")}></Image>
      <Text style={styles.headerAppTitle}>KnightBites</Text>
    </View>
  );
};

const HeaderRight = ({navigation}) => {
  return (
    <View style={{marginRight: 10}}>
      <TouchableOpacity onPress={() => navigation.navigate("profile")}>
        <Text style={styles.headerUser}>Kenny</Text>
      </TouchableOpacity>
    </View>
  )
}

export { Header, HeaderRight };
