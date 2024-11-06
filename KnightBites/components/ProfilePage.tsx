import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Colors } from "@/constants/Colors";

function storeProfile(username, profile) {
    // store the profile data in the database

}

function getProfile(username) {
    // get the profile data from the database

    // (just a sample profile, format can be changed later)
    return {
        username: "TheRealSoldierTF2",
        pref_name: "Jane Doe",
        email: "ifyaknowwhatsgoodforyouyouwillrun@mann.co",
        password: "iffightingissuretoresultinvictorythenyoumustfight!",
        restrictions: {
            vegan: false,
            vegitarian: true, // (not character accurate, IK, just for testing)
            halal: false
        },
        allergies: {
            dairy: false,
            gluten: false,
            nuts: true, // (probably not character accurate, IK, just for testing)
        },
        // just for example; could easily be omitted.
        settings: {
            notifications: true
        }
    }
}

export default function ProfilePage({navigation}) {

    const [ profile, setProfile] = useState();
    const [ loading, setLoading ] = useState(true);

    // sorry this is so ugly. Turns out, updating one value in a useState dictionary isn't a very clean process. 
    function editProfile(setting, value) {
        // edit the profile setting
    
        if(setting === "pref_name") {
            setProfile(profile => ({
                ...profile,
                pref_name: value
            }));
        }

        else if (setting === "vegan") {
            if (value) {
                setProfile(profile => ({
                    ...profile,
                    restrictions: {
                        ...profile.restrictions,
                        vegan: true,
                        vegitarian: true
                    }
                }));
            } else {
                setProfile(profile => ({
                    ...profile,
                    restrictions: {
                        ...profile.restrictions,
                        vegan: false,
                    }
                }));
            }
        }

        else if (setting === "vegitarian") {
            if (value) {
                setProfile(profile => ({
                    ...profile,
                    restrictions: {
                        ...profile.restrictions,
                        vegitarian: true
                    }
                }));
            } else {
                setProfile(profile => ({
                    ...profile,
                    restrictions: {
                        ...profile.restrictions,
                        vegitarian: false,
                        vegan: false
                    }
                }));
            }
        }

        else if (setting === "halal") {
            setProfile(profile => ({
                ...profile,
                restrictions: {
                    ...profile.restrictions,
                    halal: value,
                }
            }));
        }
    
        // save changes to DB (might want to add a save button instead, but this is good for now)
        storeProfile(profile.username, profile);
    }

    useEffect(() => {
        setProfile(getProfile("example"));
        setLoading(false);
    }, []);

    return (
        loading ? <Text>Loading...</Text> : (
        <View style={styles.container}>
            <View style={styles.welcome}>
                <Text style={styles.welcome}>Hello, {profile.pref_name}</Text>
            </View>

            {/*Not options, just some info*/}
            <View style={styles.optionContainer}>
                <Text style={styles.optionLabel}>Username: {profile.username}</Text>
                <Text style={styles.optionLabel}>Email: {profile.email}</Text>
            </View>

            <View style={styles.optionContainer}>
                <Text style={styles.optionLabel}>Preferred Name:</Text>
                <TextInput style={styles.optionInput} value={profile.pref_name} onChangeText={(text) => editProfile("pref_name", text)} />
                <TouchableOpacity style={styles.optionButton}>
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.optionContainer}>
                <Text style={styles.optionLabel}>Dietary restrictions:</Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={(profile.restrictions.vegan) ? styles.toggleableButtonOn : styles.toggleableButtonOff} onPress={() => editProfile("vegan", !profile.restrictions.vegan)}><Text style={styles.buttonText}>Vegan</Text></TouchableOpacity>
                    <TouchableOpacity style={(profile.restrictions.vegitarian) ? styles.toggleableButtonOn : styles.toggleableButtonOff} onPress={() => editProfile("vegitarian", !profile.restrictions.vegitarian)}><Text style={styles.buttonText}>Vegitarian</Text></TouchableOpacity>
                    <TouchableOpacity style={(profile.restrictions.halal) ? styles.toggleableButtonOn : styles.toggleableButtonOff} onPress={() => editProfile("halal", !profile.restrictions.halal)}><Text style={styles.buttonText}>Halal</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    ))
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
    margin: 10,
  },
  optionContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: 10,
  },
  optionLabel: {
    fontSize: 20,
    textAlign: 'center',
    width: '100%',
  },
  optionInput: {
    fontSize: 28,
    backgroundColor: "#ddd",
    textAlign: 'center',
    width: '40%',
    minWidth: 300,
    borderWidth: 4,
    padding: 5,
  },
  optionButton: {
    width: '80%',
    borderColor: Colors.light.text,
    borderRadius: 20,
    borderWidth: 4,
    padding: 5,
    margin: 5,
    backgroundColor: "#ffbbbb"
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  },
  toggleableButtonOff: {
    backgroundColor: "#888",
    fontSize: 24,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 4,
    padding: 8,
    margin: 5,
    flex: 1,
  },
  toggleableButtonOn: {
    backgroundColor: "gold",
    fontSize: 24,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 4,
    padding: 8,
    margin: 5,
    flex: 1,
  },
});
