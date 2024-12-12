import React, { useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { ProfileContext, defaultProfile } from "@/components/ProfileProvider";

const ProfilePage = ({ navigation }) => {
  const {profile, setProfile } = useContext(ProfileContext);
  const [changingPassword, setChangingPassword] = useState(false);
  const [changingEmail, setChangingEmail] = useState(false);
  const [changingDietaryRestrictions, setChangingDietaryRestrictions] = useState(false);
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');

  // For email popup
  const [newEmail, setNewEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  
  const initEmailPopup = () => {
    setNewEmail('');
    setVerificationCode('');
    setChangingEmail(true);
  };

  const sendEmail = () => {
    alert('Verification code sent to your new email.');
  };

  const checkVerificationCode = (code) => {
    return code === '123456'; // Simulate checking the code
  };

  // For password popup
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confNewPassword, setConfNewPassword] = useState('');
  const [warning, setWarning] = useState('');

  const initPasswordPopup = () => {
    setOldPassword('');
    setNewPassword('');
    setConfNewPassword('');
    setWarning('');
    setChangingPassword(true);
  };

  const checkPassword = (password) => {
    return password === 'old_password'; // Simulate checking old password
  };

  const updatePassword = (password) => {
    alert('Password changed successfully!');
  };

  const handleLogout = () => {
    setProfile(defaultProfile);
    navigation.reset({
      index: 0,
      routes: [{ name: 'login' }],
    });
  };


  const editProfileRestriction = (restriction, value) => {
    setProfile({
      ...profile,
      restrictions: {
        ...profile.restrictions,
        [restriction]: value,
      },
    });
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.username}>Hi, {profile.username}!</Text>
        <Text style={styles.userEmail}>{profile.email}</Text>
      </View>

      {/* Change Email */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Change Your Email</Text>
        <TouchableOpacity 
          style={styles.inputContainer} 
          onPress={initEmailPopup}>
          <Icon name="envelope" style={styles.icon} />
          <Text style={styles.inputText}>abc123@calvin.edu</Text>
        </TouchableOpacity>
      </View>

      {/* Change Password */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Change Your Password</Text>
        <TouchableOpacity 
          style={styles.inputContainer} 
          onPress={initPasswordPopup}>
          <Icon name="lock" style={styles.icon} />
          <Text style={styles.inputText}>********</Text>
        </TouchableOpacity>
      </View>


      {/* Change Dietary Restrictions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Change Dietary Restrictions</Text>
        <TouchableOpacity
          style={styles.inputContainer} 
          onPress={() => setChangingDietaryRestrictions(true)}>
          <Icon name="cutlery" style={styles.icon} />
          <Text style={styles.inputText}>{dietaryRestrictions || "Set Restrictions"}</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Email Popup */}
      <Modal visible={changingEmail} transparent={true}>
        <View style={styles.popupOverlay}>
          <View style={styles.popupContent}>
            <Text style={styles.popupTitle}>Change Your Email</Text>
            <TextInput
              style={styles.popupInput}
              value={newEmail}
              onChangeText={(val) => setNewEmail(val)}
              placeholder="Enter your new email"
              keyboardType="email-address"
            />
            
            <TouchableOpacity
              style={styles.sendCodeButton}
              onPress={() => sendEmail()}>
              <Text style={styles.sendCodeText}>Send Verification Code</Text>
            </TouchableOpacity>

              <TextInput
                style={styles.popupInput}
                value={verificationCode}
                onChangeText={(val) => setVerificationCode(val)}
                placeholder="Enter verification code"
                keyboardType="numeric"
              />

            <View style={styles.popupButtonContainer}>
              <TouchableOpacity style={styles.popupCloseButton} onPress={() => setChangingEmail(false)}>
                <Text style={styles.closeText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.popupConfirmButton}
                onPress={() => {
                  if (checkVerificationCode(verificationCode)) {
                    alert('Email updated successfully!');
                    setChangingEmail(false);
                  } else {
                    alert('Invalid verification code');
                  }
                }}
              >
                <Text style={styles.closeText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Password Popup */}
      <Modal visible={changingPassword} transparent={true}>
        <View style={styles.popupOverlay}>
          <View style={styles.popupContent}>
            <Text style={styles.popupTitle}>Change Your Password</Text>
            <TextInput
              style={styles.popupInput}
              value={oldPassword}
              onChangeText={(val) => setOldPassword(val)}
              placeholder="Old Password"
              secureTextEntry={true}
            />
            <TextInput
              style={styles.popupInput}
              value={newPassword}
              onChangeText={(val) => setNewPassword(val)}
              placeholder="New Password"
              secureTextEntry={true}
            />
            <TextInput
              style={styles.popupInput}
              value={confNewPassword}
              onChangeText={(val) => setConfNewPassword(val)}
              placeholder="Confirm New Password"
              secureTextEntry={true}
            />
            {warning.length > 0 && <Text style={styles.warning}>{warning}</Text>}
            <View style={styles.popupButtonContainer}>
              <TouchableOpacity
                style={styles.popupCloseButton}
                onPress={() => setChangingPassword(false)}
              >
                <Text style={styles.closeText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.popupConfirmButton}
                onPress={() => {
                  if (!checkPassword(oldPassword)) {
                    setWarning('Old password is incorrect');
                    return;
                  }
                  if (newPassword !== confNewPassword) {
                    setWarning('New passwords do not match');
                    return;
                  }
                  if (newPassword.length < 8) {
                    setWarning('New password must be at least 8 characters');
                    return;
                  }
                  setWarning('');
                  updatePassword(newPassword);
                  setChangingPassword(false);
                }}
              >
                <Text style={styles.closeText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Dietary Restrictions Popup */}
      <Modal visible={changingDietaryRestrictions} transparent={true}>
        <View style={styles.popupOverlay}>
          <View style={styles.popupContent}>
            <Text style={styles.popupTitle}>Select Dietary Restrictions</Text>

            {/* Vegan Button */}
            <TouchableOpacity
              style={profile.restrictions.vegan ? styles.dietaryButtonOn : styles.dietaryButtonOff}
              onPress={() => editProfileRestriction('vegan', !profile.restrictions.vegan)}
            >
              <Text style={styles.dietaryButtonText}>Vegan</Text>
            </TouchableOpacity>

            {/* Vegetarian Button */}
            <TouchableOpacity
              style={profile.restrictions.vegetarian ? styles.dietaryButtonOn : styles.dietaryButtonOff}
              onPress={() => editProfileRestriction('vegetarian', !profile.restrictions.vegetarian)}
            >
              <Text style={styles.dietaryButtonText}>Vegetarian</Text>
            </TouchableOpacity>

            {/* Halal Button */}
            <TouchableOpacity
              style={profile.restrictions.halal ? styles.dietaryButtonOn : styles.dietaryButtonOff}
              onPress={() => editProfileRestriction('halal', !profile.restrictions.halal)}
            >
              <Text style={styles.dietaryButtonText}>Halal</Text>
            </TouchableOpacity>

            {/* Confirm and Cancel Buttons */}
            <View style={styles.popupButtonContainer}>
              <TouchableOpacity
                style={styles.popupCloseButton}
                onPress={() => setChangingDietaryRestrictions(false)}
              >
                <Text style={styles.closeText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.popupConfirmButton}
                onPress={() => {
                  alert('Dietary restrictions updated successfully!');
                  setChangingDietaryRestrictions(false);
                }}
              >
                <Text style={styles.closeText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};


const styles = StyleSheet.create({
  // Same styles as provided
  container: { flex: 1, backgroundColor: '#F8F8F8', padding: 20 },
  header: { alignItems: 'center', marginBottom: 40 },
  username: { fontSize: 24, fontWeight: 'bold', color: '#000' },
  userEmail: { fontSize: 16, color: '#888' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 5 },
  inputContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  icon: { fontSize: 20, color: '#888', marginRight: 10 },
  inputText: { flex: 1, fontSize: 16, color: '#000' },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#891B2F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  popupOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  popupContent: {
    width: '85%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  popupTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  popupInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  popupButtonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  popupCloseButton: {
    backgroundColor: '#CCC',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  sendCodeButton: {
    backgroundColor: '#891B2F',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  sendCodeText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  dietaryButtonOn: {
    backgroundColor: '#891B2F',
    padding: 15, 
    marginBottom: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },

  },
  dietaryButtonOff: {
    backgroundColor: '#E0E0E0',
    padding: 15, 
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    
  },
  dietaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  popupConfirmButton: { backgroundColor: '#EECC0A', padding: 10, borderRadius: 10, flex: 1, alignItems: 'center' },
  closeText: { fontSize: 16, color: '#FFF', fontWeight: 'bold' },
  warning: { color: 'red', fontSize: 14, textAlign: 'center', marginVertical: 10, backgroundColor: '#FFD2D2', padding: 8, borderRadius: 5 },

});

export default ProfilePage;
