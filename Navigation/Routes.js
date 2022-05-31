import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// screen
import CreateNewScreen from './Screens/CreateNewScreen';

import DrawRoutes from './DrawRoutes';
const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={DrawRoutes} name="Home" />
        <Stack.Screen component={CreateNewScreen} name="Create New" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
