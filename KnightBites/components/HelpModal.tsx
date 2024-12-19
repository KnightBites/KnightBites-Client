import React from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { useState, useEffect } from 'react';
import { homeHelp, profileHelp, foodPageHelp } from '@/components/Helps';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HelpModal({ helpOpen, setHelpOpen, screenName, helpHook }) {
  const [ pageNum, setPageNum ] = useState(0);
  const [ pages, setPages ] = useState([{title: "", content: <View></View>}]);

  useEffect(() => {
    let enabled = true;
    switch (screenName) {
      case "home":
        setPages(homeHelp);
        break;
      case "profile":
        setPages(profileHelp);
        break;
      case "foodPage":
        setPages(foodPageHelp);
        break;
      default:
        enabled = false;
        setPages([{title: screenName, content: <View></View>}]);
    }
    if (enabled) {
      helpHook(true);
    }
}, []);

  return (
    <Modal
      isVisible={helpOpen}
      onBackdropPress={() => setHelpOpen(false)}
      onBackButtonPress={() => setHelpOpen(false)}
      style={helpStyles.modal}
    >
      <View style={helpStyles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{pages[pageNum].title}</Text>
        </View>

        <View style={{flex: 18}}>
          {pages[pageNum].content}
        </View>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity style={{padding: 5}} onPress={() => setPageNum(pageNum - 1)} disabled={pageNum === 0}>
            <Icon name="arrow-left" style={pageNum === 0 ? helpStyles.arrowDisabled : helpStyles.arrow}></Icon>
          </TouchableOpacity>

          <View style={{alignContent: 'center', justifyContent: 'center', flex: 1}}>
            <FlatList
              contentContainerStyle={{flexGrow: 1, alignContent: 'center', justifyContent: 'center'}}
              data={pages}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) =>
                {return (
                  pages.indexOf(item) == pageNum ?
                  <Icon name="circle" style={helpStyles.pageIndicator}/> :
                  <Icon name="circle-o"  style={helpStyles.pageIndicator}/>
                )}
              }
            />
          </View>

          <TouchableOpacity style={{padding: 5}} onPress={() => setPageNum(pageNum + 1)} disabled={pageNum === pages.length - 1}>
            <Icon name="arrow-right" style={pageNum === pages.length - 1 ? helpStyles.arrowDisabled : helpStyles.arrow}></Icon>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const helpStyles = StyleSheet.create({
  modal: {
    backgroundColor: "#eeeeff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    maxWidth: 300,
  },
  container: {
    flex: 1,
    width: 280,
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  arrowDisabled: {
    fontSize: 20,
    color: 'gray',
    fontWeight: 'bold',
  },
  pageIndicator: {
    fontSize: 16,
    color: 'black',
    margin: 5,
  }
});