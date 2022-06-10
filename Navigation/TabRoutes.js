import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import DetailsScreen from './Screens/DetailsScreen';
import SettingsScreen from './Screens/SettingsScreen';
import NavigationString from '../Utils/NavigationString';

import Ionic from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundcolor: '#ffffff',
          borderRadius: 15,
          height: 63,
        },
        tabBarIcon: ({focused, size, color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Details') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          }
          return <Ionic name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        component={HomeScreen}
        name={NavigationString.HOME}
        options={{headerShown: true}}
      />

      <Tab.Screen
        component={SettingsScreen}
        name={NavigationString.ADD}
        options={({navigation}) => ({
          tabBarIcon: ({focused, size, color}) => {
            return <Ionic name="add-circle" size={size + 36} color="#ff2448" />;
          },

          tabBarButton: props => {
            return (
              <TouchableOpacity
                style={{
                  top: -18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  ...styles.shadow,
                }}
                onPress={() => navigation.navigate('Create New')}>
                <View style={{width: 70, height: 70, borderRadius: 35}}>
                  {props.children}
                </View>
              </TouchableOpacity>
            );
          },
        })}
      />
      <Tab.Screen
        component={DetailsScreen}
        name={NavigationString.DETAILS}
        options={{headerShown: true}}
      />
    </Tab.Navigator>
  );
}

export default TabRoutes;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
