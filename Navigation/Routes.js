import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import NavigationString from '../Utils/NavigationString';

// screen
import CreateNewScreen from './Screens/CreateNewScreen';
import DetailsPerDayScreen from './Screens/DetailsPerDayScreen';
import DashBoardItem from '../Components/DashBoardItem';

import DrawRoutes from './DrawRoutes';
const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={DrawRoutes} name="Home" />
        <Stack.Screen component={CreateNewScreen} name="Create New" />
        <Stack.Screen component={DetailsPerDayScreen} name="DetailsThatDay" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
