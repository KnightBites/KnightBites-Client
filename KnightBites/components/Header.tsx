import React, { useState, useContext } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import styles from "@/constants/Styles";
import { ProfileContext } from "@/components/ProfileProvider";
import Icon from 'react-native-vector-icons/FontAwesome'; // using FontAwesome for icons
import { Avatar } from 'react-native-elements';
import HelpModal from '@/components/HelpModal';

const getScreenName = (navigation) => {
  const state = navigation.getState();
  const route = state.routes[state.index];
  return route.name;
}

const Header = () => {
  return (
    <View style={styles.headerBar}>
      <Text style={styles.headerAppTitle}></Text>
    </View>
  );
};

const HeaderRight = ({navigation}) => {
  const { profile, setProfile } = useContext(ProfileContext);

  const [ helpOpen, setHelpOpen ] = useState(false);

  return (
    <View style={{flexDirection: 'row', marginRight: 10}}>
      <TouchableOpacity onPress={() => setHelpOpen(!helpOpen)} style={{marginRight: 20}}>
        <Icon name="info-circle" style={{fontSize: 30, color: "#ffffff", fontWeight:"bold"}} />
      </TouchableOpacity>
      <HelpModal helpOpen={helpOpen} setHelpOpen={setHelpOpen} screenName={getScreenName(navigation)}/>

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
