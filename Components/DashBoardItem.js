import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';

// style
import ItemStyle from '../Styles/ItemStyle';

// utils
import DashBoardItemUtil from '../Utils/DashBoardItemUtil';

export default class DashBoardItem extends Component {
  render() {
    let {item} = this.props.item;
    return (
      <TouchableOpacity
        style={ItemStyle.container}
        onPress={() => {
          console.log('item.id : ', item.dsid);
          this.props.navigation.navigate('DetailsThatDay', {obj: item.dsid});
        }}>
        <View style={ItemStyle.headerItem}>
          <Text style={ItemStyle.textHeader}>{item.timestamp}</Text>
        </View>
        <View style={ItemStyle.bodyItem}>
          <Text>{item.timestamp}</Text>
        </View>
        <View style={ItemStyle.footerItem}>
          <Text>{item.status == 1 ? 'active' : 'inactive'}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
