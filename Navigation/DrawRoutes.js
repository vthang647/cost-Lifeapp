import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
// screen
import HomeScreen from './Screens/HomeScreen';
import DetailsScreen from './Screens/DetailsScreen';
import SettingsScreen from './Screens/SettingsScreen';

import NavigationString from '../Utils/NavigationString';

// Routes
import TabRoutes from './TabRoutes';

// create new screen
import CreateNewScreen from './Screens/CreateNewScreen';

// color
import Color from '../Styles/Color';

const Drawer = createDrawerNavigator();

function DrawRoutes() {
  return (
    <Drawer.Navigator screenOptions={{}}>
      <Drawer.Screen
        component={TabRoutes}
        name="HOME"
        options={{
          headerShown: false,
          headerStyle: {backgroundColor: Color.skyColor__},
        }}
      />
      <Drawer.Screen
        component={SettingsScreen}
        name={NavigationString.SETTINGS}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: Color.skyColor__},
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawRoutes;
