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
          },
          {
            img: require("@/assets/images/spagetti.jpg"),
            name: "Spagetti",
            desc: "With tomato source",
          },
          {
            img: require("@/assets/images/pizza.jpg"),
            name: "Pizza",
            desc: "Nutritious and delicious",
          },
        ]}
        
        renderItem = {
            ({item}) => <FoodPanel
              image={item.img}
              foodName={item.name}
              foodDescription={item.desc}
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
    borderRadius: "15%",
    maxWidth: "75%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 8,
  },
  mainText: {
    textAlign: "center",
    borderRadius: "15%",
    textWrap: "wrap",
    fontSize: "36pt",
  },
  feed: {
    marginHorizontal: "auto",
    minWidth: "min-content",
  }
});
