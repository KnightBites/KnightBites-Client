import { Image, StyleSheet, View, Text, FlatList } from 'react-native';
import FoodPanel from '@/components/FoodPanel.tsx';

export default function HomePage() {
  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>Hello, Knight Bites!</Text>
      </View>
      <View style={styles.textContainer}>
        <FlatList style={styles.teamNames} data={[
          {key: "Kenny"},
          {key: "Lily"},
          {key: "Lujia"},
          {key: "Peter"},
          {key: "Jacob"},
          {key: "David"},
        ]}
    
        renderItem = {({item}) => <Text>{item.key}</Text>}
        />
      </View>
      <View style={styles.feed}> 
        <FlatList data={[
          {
            img: require("@/assets/images/dining-hall.jpg"),
            name: "Test0",
            desc: "Woah, food!",
            rating: 1,
          },
          {
            img: require("@/assets/images/spagetti.jpg"),
            name: "Spagetti",
            desc: "With tomato source",
            rating: 3,
          },
          {
            img: require("@/assets/images/pizza.jpg"),
            name: "Pizza",
            desc: "Nutritious and delicious",
            rating: 4.5,
          },
        ]}
        
        renderItem = {
            ({item}) => <FoodPanel
              image={item.img}
              foodName={item.name}
              foodDescription={item.desc}
              foodRating={item.rating}
            ></FoodPanel>
        }
        >
        </FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    maxWidth: "75%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 8,
    margin: 10,
  },
  mainText: {
    textAlign: "center",
    borderRadius: 15,
    fontSize: 36,
  },
  feed: {
    marginHorizontal: "auto",
    minWidth: 200, // use a numeric value here
  }
});
