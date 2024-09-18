import { Image, StyleSheet, View, Text, FlatList } from 'react-native';

export default function HomePage() {
  return (
    <View>
      <Image source={require("@/assets/images/dining-hall.jpg")}></Image>
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
});
