import React from 'react';

import {
    MaterialCommunityIcons,
    Entypo,
    Ionicons
} from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { color } from '../Colors';
import Player from '../Player';
import Music from '../Music';
import Playlist from '../Playlist';

const Tab = createBottomTabNavigator();

export default function AppTabs() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Player"

        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            
            if (route.name === 'Music') {
              return <Entypo name="folder-music" size={32} color="white" />;
              
            } else if (route.name === 'Player') {
                return <Ionicons name="md-play-circle-outline" size={35} color="white" />;
             
            } else if (route.name === 'Playlist') {
              return <MaterialCommunityIcons name="playlist-music" size={37} color="white" />;
            }
          },
        })}
        tabBarOptions={{
          activeBackgroundColor: color.ACTIVE_TAB_BG,
          showLabel: false,
          tabStyle: {
            margin: 5,
            padding: 5,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            borderWidth: 0,
          },
          style: {
            backgroundColor: color.TAB_BG,
            width: '95%',
            height: 60,
            margin: 3,
            marginBottom: 5,
            elevation: 5,
            alignSelf: 'center',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            borderTopWidth: 0
          }
        }}
      >
        <Tab.Screen name="Music" component={Music} />
        <Tab.Screen name="Player" component={Player} />
        <Tab.Screen name="Playlist" component={Playlist} />      
      </Tab.Navigator>
    </NavigationContainer>
  )  
}
