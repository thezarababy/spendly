import { Tabs } from 'expo-router';
import React from 'react';
import {Ionicons} from '@expo/vector-icons';




export default function TabLayout() {
 ;

  return (
    <Tabs
>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
         tabBarIcon:({color, size})=>(
          <Ionicons name="home-outline" size={size} color={color} />
         )
        }}
      />
      <Tabs.Screen
        name="Transactions"
        options={{
          title: 'Transactions',
          tabBarIcon:({color, size})=>(
            <Ionicons name="list-outline" size={size} color={color} />
           )
        }}
      />
      
    </Tabs>
  );
}
