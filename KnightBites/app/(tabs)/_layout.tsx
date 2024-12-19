import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { ProfileProvider } from "@/components/ProfileProvider";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    
    <ProfileProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarStyle: {
            backgroundColor: "#800000"
          },
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="build-a-wich"
          options={{
            title: 'UpperCrust',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'fast-food' : 'fast-food-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="prayer"
          options={{
            title: 'Prayers',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'book' : 'book-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
    </ProfileProvider>
  );
}
