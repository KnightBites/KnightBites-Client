// This is the about page, accessed from the bottom button that says "About"
// This is a simple page that explains some of the goals of the app (from the vision statement), has a small tutorial, and credits the authors.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '@/constants/Styles';

export default function DetailsPage() {
  return (
    <View style={styles.container}>
      <View style={{ height: 20 }} />
      <View style={styles.headerBar}>
        <Text style={styles.headerAppTitle}>KnightBites</Text>
      </View>

      <View style={styles.mainContainer}>
        <Text style={{ textAlign: 'center' }}> {/* All text on the page is centered. */}
          <Text style={{ fontWeight: 'bold' }}>
            Welcome to KnightBites!{'\n'}
          </Text>
          We want this app to serve as a forum for Calvin students to rank and review the food served at the dining halls on campus.
          {'\n\n'}
          Our goal is to provide a platform for students to share their opinions and experiences with the Calvin community.
          {'\n\n'}
          Our hope is that this app will help students make informed decisions about where to eat on campus.
          {'\n\n'}

          <Text style={{ fontWeight: 'bold' }}>
            How to use KnightBites:
          </Text>
          {'\n\n'}
          1. Click on the "Home" tab to view the dishes available. You can also filter by dining hall.
          {'\n\n'}
          2. Click on a dish to view more information about it.
          {'\n\n'}
          3. Write a review and rate the dish a rating 0-5 stars.
          {'\n\n'}
          Enjoy!

          {'\n\n\n\n'}{/* Add some space at the bottom of the page */}
          Developed by the KnightBites Team:{'\n'}
          Kenny Howes, Lily McAboy
          {'\n'}
          Jacob Tocila, Peter Lund
          {'\n'}
          David Barry, Lucia Li
        </Text>
      </View>

    </View> //End of container

  );
}
