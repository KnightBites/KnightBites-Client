import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Modal, View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { validatePathConfig } from '@react-navigation/native';
import { Colors } from "@/constants/Colors";


const ProfilePage = () => {
  const [editingName, setEditingName] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [changingEmail, setChangingEmail] = useState(false);
  const [changingSettings, setChangingSettings] = useState(false);

  //These should talk to the service at some point because halal/vegetarian/vegan should be in the state during registration

  /*
  Specs: 
  1. Name from registration
  2. Dietary restrictions should also be pulling from service
  */
  const [profile, setProfile] = useState({
    name: "Kenny",
    restrictions: {
      vegan: false,
      vegetarian: false,
      halal: false,
    },
  });

  const editProfile = (key: string, value: any) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [key]: value
    }));
  };

  const editProfileRestriction = (restriction: string, value: boolean) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      restrictions: {
        ...prevProfile.restrictions,
        [restriction]: value,
      },
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi, {profile.name}!</Text>
      </View>

      <View style={styles.optionsContainer}>
        <View style={[styles.option, styles.sectionSpacing]}>
            <Text style={styles.optionLabel}>Preferred Name:</Text>
            <View>
                {(editingName) ?
                    <TextInput
                        style={styles.optionInput}
                        value={profile.name}
                        onChangeText={(val) => editProfile("name", val)}
                        onSubmitEditing={() => setEditingName(false)}
                    /> :
                    <View style={{flexDirection: "row"}}>
                        <Text style={styles.optionValue}>{profile.name}</Text>
                        <TouchableOpacity onPress={() => setEditingName(true)}>
                            <Icon name="pencil" style={styles.editButton}/>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>

        <View style={[styles.option, styles.sectionSpacing]}>
            <TouchableOpacity style={styles.optionButton} onPress={() => setChangingPassword(true)}>
                <Text style={styles.optionLabel}>Change Password</Text>
            </TouchableOpacity>
        </View>

        <View style={[styles.option, styles.sectionSpacing]}>
            <TouchableOpacity style={styles.optionButton} onPress={() => setChangingEmail(true)}>
                <Text style={styles.optionLabel}>Change Email Address</Text>
            </TouchableOpacity>
        </View>
        
        <View style={[styles.option, styles.sectionSpacing]}>
            <TouchableOpacity style={styles.optionButton} onPress={() => setChangingSettings(true)}>
                <Text style={styles.optionLabel}>Settings</Text>
            </TouchableOpacity>
        </View>



        {/* Dietary Restrictions Section */}
        <View style={[styles.option, styles.dietaryRestrictionsContainer]}>
          <Text style={styles.optionLabel}>Change Dietary Restrictions:</Text>

          {/* spacer between text and buttons */}
          <View style={{height:10}} />

          <View style={{ flexDirection: 'row' }}>
          <View style={styles.dietaryButtonsContainer}>
            <TouchableOpacity
              style={profile.restrictions.vegan ? styles.dietaryButtonOn : styles.dietaryButtonOff}
              onPress={() => editProfileRestriction('vegan', !profile.restrictions.vegan)}
            >
              <Text style={styles.dietaryButtonText}>Vegan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={profile.restrictions.vegetarian ? styles.dietaryButtonOn : styles.dietaryButtonOff}
              onPress={() => editProfileRestriction('vegetarian', !profile.restrictions.vegetarian)}
            >
              <Text style={styles.dietaryButtonText}>Vegetarian</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={profile.restrictions.halal ? styles.dietaryButtonOn : styles.dietaryButtonOff}
              onPress={() => editProfileRestriction('halal', !profile.restrictions.halal)}
            >
              <Text style={styles.dietaryButtonText}>Halal</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </View>

      {/* Log Out Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Pop-up boxes */}

      {/* change password */}
      <Modal 
        animationType={"fade"}
        visible={changingPassword}
        onRequestClose={() => {
          setChangingPassword(false);
        }}
        transparent={true}
      >
        <View style={styles.popup}>
          <Text style={styles.option}>Change Password:</Text>

          <TextInput style={styles.popupInput} placeholder="Old Password" />
          <TextInput style={styles.popupInput} placeholder="New Password" />
          <TextInput style={styles.popupInput} placeholder="Confirm New Password" />

          <View style={{flexDirection: "row"}}>
            <TouchableOpacity style={styles.popupCloseButton} onPress={() => setChangingPassword(false)}>
              <Text style={styles.popupButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.popupConfirmButton} onPress={() => setChangingPassword(false)}>
                <Text style={styles.popupButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* change email */}
      <Modal
        animationType={"fade"}
        visible={changingEmail}
        onRequestClose={() => {
          setChangingEmail(false);
        }}
        transparent={true}
      >
        <View style={styles.popup}>
          <Text style={styles.option}>Change Email:</Text>
          <TextInput style={styles.popupInput} placeholder="New Email" />
          <TextInput style={styles.popupInput} placeholder="Verification Code" />

          {/* spacer after button "send verification code" */}
          <View style={{height:10}} />

          <TouchableOpacity style={styles.SendButton}>
            <Text style={styles.optionLabel}>Send Verification Code</Text>
          </TouchableOpacity>
          <View style={{height:5}} />

          <View style={{flexDirection: "row"}}>
            <TouchableOpacity style={styles.popupCloseButton} onPress={() => setChangingEmail(false)}>
              <Text style={styles.popupButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.popupConfirmButton} onPress={() => setChangingEmail(false)}>
              <Text style={styles.popupButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>


      {/* settings */}
      <Modal
        animationType={"fade"}
        visible={changingSettings}
        onRequestClose={() => {
          setChangingSettings(false);
        }}
        transparent={true}
      >
        <View style={styles.popup}>
          <TouchableOpacity style={styles.blue} onPress={() => setChangingSettings(false)}>
            <Text style={styles.blue}>:)</Text>
          </TouchableOpacity>
        </View>
      </Modal>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  optionsContainer: {
    flex: 1,
    marginTop: 20,
  },
  option: {
    fontSize: 18,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  optionInput: {
    fontSize: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#888',
    width: '80%',
  },
  optionContainer: {
    marginVertical: 20,
  },
  optionLabel: {
    fontSize: 18,
    // fontWeight: 'bold',
  },
  optionValue: {
    fontSize: 18,
    marginBottom: 10,
  },

  optionButton: {
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    // alignItems: 'center',
    width: "fit-content",
  },


  editButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    margin: 5,
  },
  dietaryButtonOn: {
    borderColor: 'black',
    backgroundColor: '#EECC0A', // Calvin gold color for selected button
    padding: 10,
    paddingVertical: 12, // Increased for height
    paddingHorizontal: 25, // Increased for width
    borderRadius: 10,
    marginRight: 10, // space between buttons
  },
  dietaryButtonOff: {
    backgroundColor: '#D3D3D3', // Light gray for unselected button
    borderColor: 'black',
    padding: 10,
    paddingVertical: 12, // Increased for height
    paddingHorizontal: 25, // Increased for width
    borderRadius: 10,
    marginRight: 10, // space between buttons
  },
  dietaryButtonText: {
    color: 'black',
    fontSize: 18,
  },
  popup: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    width: 360,
    height: 320,
    margin: "auto",
    alignItems: 'center',
    justifyContent: 'center', // Center the content vertically
  },
  popupConfirmButton: {
    backgroundColor: 'gold',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
    width: 100, // Set fixed width to ensure consistency
    },
  popupCloseButton: {
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    width: 100, // Set fixed width to ensure consistency
  },
  SendButton: {
    borderColor: '#000',
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    width: 220,
  },
  popupButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  popupInput: {
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 2,
    padding: 5,
    alignItems: 'center',
    margin: 10,
    width: 280,
  },
  blue: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 10,
    fontSize: 24,
  },

  sectionSpacing: {
    marginVertical: 15, // Adjust to control space between sections
  },

  dietaryRestrictionsContainer: { 
    alignItems: 'center', 
    marginVertical: 20 // Adjust to control space before dietary restrictions section 
  },

  dietaryButtonsContainer: { 
    flexDirection: 'row', 
    marginTop: 10 
  },

  logoutButton: {
    backgroundColor: '#891B2F',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    alignSelf: 'center', // Center the button horizontally
    paddingVertical: 15, // Increased for height
    paddingHorizontal: 50, // Increased for width
    marginTop: 20,
  },

  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    },
});

export default ProfilePage;
