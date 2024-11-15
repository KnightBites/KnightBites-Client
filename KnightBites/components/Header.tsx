import React, { useContext} from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import styles from "@/constants/Styles";
import { ProfileContext } from "@/components/ProfileProvider";

const Header = () => {
  return (
    <View style={styles.headerBar}>
      <Text style={styles.headerAppTitle}>KnightBites</Text>
    </View>
  );
};

const HeaderRight = ({navigation}) => {
  const { profile, setProfile } = useContext(ProfileContext);

  return (
    <View style={{marginRight: 10}}>
      <TouchableOpacity onPress={() => navigation.navigate("profile")}>
        <Text style={styles.headerUser}>{profile.pref_name}</Text>
      </TouchableOpacity>
    </View>
  )
}

export { Header, HeaderRight };
