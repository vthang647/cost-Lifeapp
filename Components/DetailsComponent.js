import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

// utils
import Helpers from '../Utils/Helpers';

// icon
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Styles
import Color from '../Styles/Color';

export default class DetailsComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {item, sumE, sumS, arravgEarnMonth, arravgSpendMonth} = this.props;
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View
            style={{
              borderBottomColor: 'gray',
              margin: 9,
              borderBottomWidth: 1,
            }}>
            <Text style={{fontSize: 24, fontWeight: '900'}}>
              Month: {item.Month}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.textx}>
              Sum Money spend:{' '}
              <Text style={{fontSize: 16}}>{Helpers.setMoney(sumS)}</Text>
            </Text>
            <View>
              <MaterialIcons size={18} name="payments" />
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.textx}>
              Spend per day:{' '}
              <Text style={{fontSize: 16}}>
                {Helpers.setMoney(arravgSpendMonth)}
              </Text>
            </Text>
            <View>
              <MaterialIcons size={18} name="payments" />
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.textx}>
              Sum Money Earned:{' '}
              <Text style={{fontSize: 16}}>{Helpers.setMoney(sumE)}</Text>
            </Text>
            <View>
              <MaterialIcons size={18} name="payments" />
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.textx}>
              Earned per day:{' '}
              <Text style={{fontSize: 16}}>
                {Helpers.setMoney(arravgEarnMonth)}
              </Text>
            </Text>
            <View>
              <MaterialIcons size={18} name="payments" />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 9,
    margin: 6,
  },
  item: {
    margin: 9,
    borderRadius: 1,
  },
  textx: {
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 15,
  },
});
