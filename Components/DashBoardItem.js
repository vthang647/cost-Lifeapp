import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';

// style
import ItemStyle from '../Styles/ItemStyle';

// utils
import DashBoardItemUtil from '../Utils/DashBoardItemUtil';
import Helpers from '../Utils/Helpers';

// database
import QueryRealmDatabaseSpend from '../Models/QueryRealmDatabaseSpend';

export default class DashBoardItem extends Component {
  constructor(props) {
    super(props);
    this.dbS = new QueryRealmDatabaseSpend();

    this.state = {
      sumSpend: 0,
      id: this.props.item.item.dsid,
    };
  }

  componentDidMount() {
    this.selectSumMoneySpendPerDay();
    this.selectSumMoneySpendPerDay();
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.selectSumMoneySpendPerDay();
      },
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription();
  }

  selectSumMoneySpendPerDay() {
    this.dbS
      .getselectSumDsid(this.state.id)
      .then(res => {
        this.setState({sumSpend: res[0].sum});
      })
      .catch(err => {
        console.log(err);
        this.setState({sumSpend: 0});
      });
  }

  render() {
    let {key, navigation, item} = this.props.item;
    return (
      <TouchableOpacity
        style={ItemStyle.container}
        key={key}
        onPress={() => {
          this.props.navigation.navigate('DetailsThatDay', {obj: item.dsid});
        }}>
        <View style={ItemStyle.headerItem}>
          <Text style={ItemStyle.textHeader}>
            {Helpers.setMonthStringToNumber(item.timestamp)}
          </Text>
        </View>
        <View style={ItemStyle.bodyItem}>
          <Text>{item.timestamp}</Text>
        </View>
        <View style={ItemStyle.footerItem}>
          <Text style={{fontWeight: 'bold'}}>
            Sum Spend :$ {this.state.sumSpend}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
