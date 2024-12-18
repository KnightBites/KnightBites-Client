import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';

export default function App() {
  return (
    <ImageBackground
      source={require('./assets/angel.png')} // Background image path
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.prayerContainer}>
          <Text style={styles.prayerText}>
            <Text style={styles.boldText}>"Heavenly</Text> Father, thank you for this meal we've been given. Please bless the hands that have prepared it. Bless this food unto our bodies so it may help us grow and be strong and sustain us for the rest of our day. Be with those we love who are near and far. In the name of your son Jesus Christ. Amen."
          </Text>
        </View>
        <Text style={styles.prayerName}>Short Prayer of Thanks</Text>
      </ScrollView>
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
  
  
