import React, {Component} from 'react';
import {View, Text} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class DetailsScreen extends Component {
  state = {};
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Details Screen</Text>
        <MaterialIcons name="home" />
      </View>
    );
  }
}
