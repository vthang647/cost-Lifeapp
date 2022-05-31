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

// const

const Drawer = createDrawerNavigator();

function DrawRoutes() {
  return (
    <Drawer.Navigator screenOptions={{}}>
      <Drawer.Screen component={TabRoutes} name={NavigationString.HOME} />
      <Drawer.Screen
        component={SettingsScreen}
        name={NavigationString.SETTINGS}
      />
    </Drawer.Navigator>
  );
}

export default DrawRoutes;
