import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // using FontAwesome for stars
import { useState, useEffect } from "react";

function recordRating(value: int) {
  // stub that will talk to the database in the future
}

export default function RankableStars({ foodRating = 0 }) {
  const stars = [];
  const [rating, setRating] = useState(foodRating);

  // closure to make functions that set the ratings
  function rate(value: int) {
    return () => {
      recordRating(value);
      setRating(value);
    };
  }

  useEffect(() => {
    setRating(foodRating);
  }, [foodRating]);

  for (let i = 0; i < 5; i++) {
    stars.push(<TouchableOpacity onPress={rate(i)}><Icon key={i} name={(i <= rating) ? "star" : "star-o"} style={styles.star} /></TouchableOpacity>);
  }

  return <View style={styles.starContainer}>{stars}</View>;
}

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 32,
    color: '#FFD700', // gold color
    marginHorizontal: 2,
  },
});
