import React from 'react';
import { Header, HeaderRight } from '@/components/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

////////
// Pages
////
import BuildSandwich from "@/components/BuildWich";
import ViewSandwich from "@/components/ViewWich";
import ViewOneSandwich from "@/components/ViewOneSandwich";
import BuildSandwichHomePage from "@/components/BuildWichHome";
import ProfilePage from "@/components/ProfilePage";
import FAQ from '@/components/FAQ'; // This is temporary until the FAQ page is implemented


const Stack = createNativeStackNavigator();

export default function EntryPoint() {
  return (
      <Stack.Navigator
        initialRouteName="buildSandwichHomePage"
        screenOptions={({ navigation }) => ({
          headerTitle: props => <Header />,
          headerStyle: {
            backgroundColor: "maroon",
          },
          headerRight: props => <HeaderRight navigation={navigation} />,
        })}
      >
        <Stack.Screen name="buildSandwichHomePage" component={BuildSandwichHomePage}
          options={{ headerLeft: props => { } }} />
        <Stack.Screen name="buildSandwich" component={BuildSandwich} />
        <Stack.Screen name="viewSandwich" component={ViewSandwich} />
        <Stack.Screen name="viewOneSandwich" component={ViewOneSandwich} />
      </Stack.Navigator>
  )
}

