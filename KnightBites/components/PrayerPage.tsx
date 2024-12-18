import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, ActivityIndicator } from 'react-native';

export default function PrayerPage() {
  const [loading, setLoading] = useState(false);
  const [prayer, setPrayer] = useState({prayertitle: "", prayer: ""});

  const getPrayerData = async () => {
    setLoading(true);
    try {
      const resp = await fetch(
        "https://knightbitesapp-cda7eve7fce3dkgy.eastus2-01.azurewebsites.net/prayer"
      );
      const json = await resp.json();
      setPrayer(json[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPrayerData();
  }, []);

  return (
    <ImageBackground
      source={require('@/assets/images/angel.png')} // Background image path
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      { loading ? <ActivityIndicator /> :
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.prayerContainer}>
            <Text style={styles.prayerText}>
              <Text style={styles.boldText}>{prayer.prayer.split(" ")[0]} </Text>
              <Text>{prayer.prayer.split(" ").slice(1).join(" ")}</Text>
            </Text>
          </View>
          <Text style={styles.prayerName}>{prayer.prayertitle}</Text>
        </ScrollView>
      }
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 55,
      paddingTop: 10,
      paddingBottom: 55,
    },
    prayerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 120,
    },
    prayerText: {
      fontSize: 22,
      lineHeight: 45,
      textAlign: 'center',
      color: '#333333',
    },
    boldText: {
      fontWeight: 'bold',
      fontSize:28,
    },
    prayerName: {
      fontSize: 16,
      fontStyle: 'italic',
      color: '#555555',
      position: 'absolute',
      bottom: 30,
    },
  });
  
  
