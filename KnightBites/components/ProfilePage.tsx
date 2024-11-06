import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    restrictions: {
      vegan: false,
      vegetarian: false,
      halal: false,
    },
  });

  const editProfile = (restriction: string, value: boolean) => {
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
        <Text style={styles.greeting}>Hi, Kenny!</Text>
      </View>

      <View style={styles.optionsContainer}>
        <Text style={styles.option}>Preferred Name</Text>
        <Text style={styles.option}>Change Password</Text>
        <Text style={styles.option}>Change Email Address</Text>
        <Text style={styles.option}>Settings</Text>

        {/* Dietary Restrictions Section */}
        <View style={styles.optionContainer}>
          <Text style={styles.optionLabel}>Dietary Restriction:</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={profile.restrictions.vegan ? styles.toggleableButtonOn : styles.toggleableButtonOff}
              onPress={() => editProfile('vegan', !profile.restrictions.vegan)}
            >
              <Text style={styles.buttonText}>Vegan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={profile.restrictions.vegetarian ? styles.toggleableButtonOn : styles.toggleableButtonOff}
              onPress={() => editProfile('vegetarian', !profile.restrictions.vegetarian)}
            >
              <Text style={styles.buttonText}>Vegetarian</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={profile.restrictions.halal ? styles.toggleableButtonOn : styles.toggleableButtonOff}
              onPress={() => editProfile('halal', !profile.restrictions.halal)}
            >
              <Text style={styles.buttonText}>Halal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
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
  optionContainer: {
    marginVertical: 20,
  },
  optionLabel: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  toggleableButtonOn: {
    backgroundColor: '#891B2F',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  toggleableButtonOff: {
    backgroundColor: '#ddd',
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
});

export default ProfilePage;
