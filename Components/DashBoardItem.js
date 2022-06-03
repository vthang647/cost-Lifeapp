import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';

import ItemStyle from '../Styles/ItemStyle';

export default class DashBoardItem extends Component {
  state = {};
  render() {
    return (
      <View style={ItemStyle.container}>
        <View style={ItemStyle.headerItem}>
          <Text style={ItemStyle.textHeader}>Day 1</Text>
        </View>
        <View style={ItemStyle.bodyItem}>
          <Text>Day month year hours minute</Text>
        </View>
        <View style={ItemStyle.footerItem}>
          <Text>Spend: 10000, Earn: 2000</Text>
        </View>
      </View>
    );
  }
}
