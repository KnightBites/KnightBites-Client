import React, { useContext, useState } from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import styles from "@/constants/Styles";
import { ProfileContext } from "@/components/ProfileProvider";
import Icon from 'react-native-vector-icons/FontAwesome'; // using FontAwesome for icons
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
  const [ hasHelp, setHasHelp ] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <View style={{flexDirection: 'row', marginRight: 10}}>
      {(hasHelp ? 
      <TouchableOpacity onPress={() => setHelpOpen(!helpOpen)} style={headerStyles.sidebarOpenButtonContainer}>
        <Icon name="info-circle" style={headerStyles.helpOpenButton} />
      </TouchableOpacity> : null
      )}
      <HelpModal helpOpen={helpOpen} setHelpOpen={setHelpOpen} screenName={getScreenName(navigation)} helpHook={setHasHelp}/>
      
      <TouchableOpacity onPress={() => setSidebarOpen(!sidebarOpen)} style={headerStyles.sidebarOpenButtonContainer}>
        <Icon name="bars" style={headerStyles.sidebarOpenButton}/>
      </TouchableOpacity>

      { /* Sidebar */ }
      <Modal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        backdropOpacity={0.6}
        isVisible={sidebarOpen}
        onBackdropPress={() => {
          setSidebarOpen(!sidebarOpen);
        }}
        onBackButtonPress={() => {
          setSidebarOpen(!sidebarOpen);
        }}
        style={headerStyles.sidebarModal}
      >
        <View style={headerStyles.sidebar}>

          <View style={headerStyles.sidebarTopSegment}>
            <TouchableOpacity onPress={() => {setSidebarOpen(false);}} style={headerStyles.sidebarCloseButton}>
              <Text style={headerStyles.sidebarCloseButtonText}>X</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => {navigation.navigate("profile"); setSidebarOpen(false);}} style={headerStyles.sidebarButton}>
            <Icon name="user" style={headerStyles.sidebarButtonIcon}/>
            <Text style={headerStyles.sidebarButtonText}> Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {navigation.navigate("FAQ"); setSidebarOpen(false);}} style={headerStyles.sidebarButton}>
            <Icon name="question-circle" style={headerStyles.sidebarButtonIcon}/>
            <Text style={headerStyles.sidebarButtonText}> FAQ</Text>
          </TouchableOpacity>

        </View>
      </Modal>
    </View>
  )
}

export { Header, HeaderRight };

const headerStyles = StyleSheet.create({
  sidebarModal: {
    margin: 0,
    alignContent: "flex-end",
    justifyContent: "flex-end",
  },
  sidebar: {
    width: 300,
    height: "100%",
    backgroundColor: "white",
    margin: 0,
    padding: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  sidebarOpenButtonContainer: {
    
  },
  sidebarButton: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "black",
    width: "100%",
    height: 50,
    margin: 0,
  },
  sidebarButtonText: {
    fontSize: 20,
    color: "black",
  },
  sidebarButtonIcon: {
    fontSize: 30,
    color: "black",
  },
  sidebarOpenButton: {
    padding: 10,
    margin: 10,
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
  },
  helpOpenButton: {
    padding: 10,
    margin: 10,
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
  },
  sidebarTopSegment: {
    backgroundColor: "#990000", // slightly lighter than header
    width: "100%",
    flexDirection: "row",
    alignContent: "flex-end",
    justifyContent: "flex-end",
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  sidebarCloseButton: {
    margin: 10,
    marginRight: 20,
  },
  sidebarCloseButtonText: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
  },
});
