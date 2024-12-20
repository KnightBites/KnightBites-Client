import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// This is a list of FAQ items. Each item has a question and an answer.
const faqData = [
  { question: 'How do I rate dining hall food?', answer: 'Tap on a food card to see detailed information, read reviews from other students, and join the conversation by sharing your own comments.' },
  { question: 'How do I browse popular dishes on campus?', answer: 'You can filter and sort the food list by dining hall, dish name, dietary preference, or popularity to discover dishes that students are talking about the most.' },
  { question: 'How does my dietary restriction affect my rating?', answer: 'KnightBites values inclusivity, giving everyone a voice. Users with dietary restrictions have extra weight in their ratings, ensuring their needs are prioritized.' },
  { question: 'How does KnightBites help reduce food waste?', answer: 'Clear, constructive feedback can guide Calvin Dining Services to focus on popular meals and reduce waste by making smarter decisions.' },
  { question: 'Why do I need an account to use KnightBites?', answer: 'KnightBites uses a user-based system to connect comments to real profiles, ensuring authentic reviews and building a stronger sense of community.' },
  { question: 'Can I submit feedback about dining service?', answer: 'While feedback about dining hall staff is possible, this app is focused on food reviews. For the best experience, please rate the food itself.' },
];

// Deo volente, this works.
const FAQItem = ({ item, isActive, onPress }: { item: { question: string, answer: string }, isActive: boolean, onPress: () => void }) => (
  <TouchableOpacity
    style={[styles.faqItem, isActive && styles.activeFaqItem]} // This is a ternary operator that applies the activeFaqItem style if isActive is true.
    onPress={onPress}
    activeOpacity={1} // This prevents the active items from turning opaque when pressed
  >
    <View style={styles.faqItemContent}>
      <Text style={styles.faqQuestion}>{item.question}</Text>
      <Icon
        name={isActive ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} // This is a ternary operator that applies the up arrow if isActive is true. Made with CoPilot
        style={[styles.faqItemArrow, isActive && styles.activeFaqItemArrow]}
      />
    </View>
    {isActive && <Text style={styles.faqAnswer}>{item.answer}</Text>}
  </TouchableOpacity>
);

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const handlePress = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(index === activeIndex ? null : index); // This is a ternary operator that sets the activeIndex to null if the index is the same as the activeIndex.
  };
  return (
    <View style={styles.aboutPageContainer}>
      <View style={styles.aboutPageSection}>
        {faqData.map((item, index) => (
          <FAQItem // This is a component that displays the FAQ item. It's a map function that goes through the faqData array and displays each item. (It's actually a treasure map!)
            key={index}
            item={item}
            isActive={index === activeIndex}
            onPress={() => handlePress(index)}
          />
        ))}
      </View>
      <View style={{ backgroundColor: 'maroon', padding: 10 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>
          The KnightBites Team:{'\n'}
          David Barry, Kenny Howes, Lujia Li,{'\n'}
          Peter Lund, Lily McAboy, Jacob Tocila
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  aboutPageContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  aboutPageSection: {
    flex: 1,
    justifyContent: 'center',
  },
  faqItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
  },
  activeFaqItem: {
    backgroundColor: '#FFF8B1', // light yellow
  },
  faqItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    flex: 1,
  },
  faqAnswer: {
    marginTop: 10,
    fontSize: 16,
    color: '#5A3825', // dark brown
  },
  faqItemArrow: {
    fontSize: 24,
    color: 'gray',
    paddingLeft: 10,
  },
  activeFaqItemArrow: {
    color: 'gold',
  },
});