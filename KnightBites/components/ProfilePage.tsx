import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Modal, View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { validatePathConfig } from '@react-navigation/native';

const ProfilePage = () => {
  const [editingName, setEditingName] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [changingEmail, setChangingEmail] = useState(false);
  const [changingSettings, setChangingSettings] = useState(false);

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
        <View style={styles.option}>
            <Text style={styles.optionLabel}>Preferred Name</Text>
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

        <View style={styles.option}>
            <TouchableOpacity style={styles.optionButton} onPress={() => setChangingPassword(true)}>
                <Text style={styles.optionLabel}>Change Password</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.option}>
            <TouchableOpacity style={styles.optionButton} onPress={() => setChangingEmail(true)}>
                <Text style={styles.optionLabel}>Change Email Address</Text>
            </TouchableOpacity>
        </View>
        
        <View style={styles.option}>
            <TouchableOpacity style={styles.optionButton} onPress={() => setChangingSettings(true)}>
                <Text style={styles.optionLabel}>Settings</Text>
            </TouchableOpacity>
        </View>

        {/* Dietary Restrictions Section */}
        <View style={styles.optionContainer}>
          <Text style={styles.optionLabel}>Dietary Restriction:</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={profile.restrictions.vegan ? styles.toggleableButtonOn : styles.toggleableButtonOff}
              onPress={() => editProfileRestriction('vegan', !profile.restrictions.vegan)}
            >
              <Text style={styles.buttonText}>Vegan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={profile.restrictions.vegetarian ? styles.toggleableButtonOn : styles.toggleableButtonOff}
              onPress={() => editProfileRestriction('vegetarian', !profile.restrictions.vegetarian)}
            >
              <Text style={styles.buttonText}>Vegetarian</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={profile.restrictions.halal ? styles.toggleableButtonOn : styles.toggleableButtonOff}
              onPress={() => editProfileRestriction('halal', !profile.restrictions.halal)}
            >
              <Text style={styles.buttonText}>Halal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

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
          <Text style={styles.optionLabel}>Change Password:</Text>

          <TextInput style={styles.popupInput} placeholder="Old Password" />
          <TextInput style={styles.popupInput} placeholder="New Password" />
          <TextInput style={styles.popupInput} placeholder="Confirm New Password" />

          <View style={{flexDirection: "row"}}>
            <TouchableOpacity style={styles.popupConfirmButton} onPress={() => setChangingPassword(false)}>
                <Text style={styles.popupButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.popupCloseButton} onPress={() => setChangingPassword(false)}>
                <Text style={styles.popupButtonText}>Close</Text>
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
          <Text style={styles.optionLabel}>Change Email:</Text>
          {/* spacer */}
          <View style={{height:5}} />

          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionLabel}>Send Verification Code</Text>
          </TouchableOpacity>

          <TextInput style={styles.popupInput} placeholder="Verification Code" />
          <TextInput style={styles.popupInput} placeholder="New Email" />

          <View style={{flexDirection: "row"}}>
            <TouchableOpacity style={styles.popupConfirmButton} onPress={() => setChangingEmail(false)}>
                <Text style={styles.popupButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.popupCloseButton} onPress={() => setChangingEmail(false)}>
                <Text style={styles.popupButtonText}>Close</Text>
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
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionInput: {
    fontSize: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#888',
    width: 400,
  },
  optionContainer: {
    marginVertical: 20,
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
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
    width: "fit-content",
  },
  editButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    margin: 5,
  },
  toggleableButtonOn: {
    backgroundColor: '#891B2F',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  toggleableButtonOff: {
    backgroundColor: '#888',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#891B2F',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
  },
  popupConfirmButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  popupCloseButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
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
  }
});

export default ProfilePage;
