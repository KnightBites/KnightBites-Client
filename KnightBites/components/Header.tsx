import React, { useContext} from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import styles from "@/constants/Styles";
import { ProfileContext } from "@/components/ProfileProvider";
import Icon from 'react-native-vector-icons/FontAwesome'; // using FontAwesome for icons
import { Avatar } from 'react-native-elements';

const Header = () => {
  return (
    <View style={styles.headerBar}>
      <Text style={styles.headerAppTitle}></Text>
    </View>
  );
};

const HeaderRight = ({navigation}) => {
  const { profile, setProfile } = useContext(ProfileContext);

  return (
    <View style={{flexDirection: 'row', marginRight: 10}}>
      <TouchableOpacity onPress={() => navigation.navigate("FAQ")} style={{marginRight: 20}}>
        <Icon name="question-circle" size={30} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("profile")}>
        <Icon name="user" size={30} color="#FFFFFF"/>
      </TouchableOpacity>
    </View>
  )
}

export { Header, HeaderRight };
