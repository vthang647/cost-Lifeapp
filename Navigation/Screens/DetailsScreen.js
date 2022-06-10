import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// icon
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// database
import QueryRetriveDay from '../../Models/QueryRetriveDay';
import QueryRealmDatabaseEarn from '../../Models/QueryRealmDatabaseEarn';
import QueryRealmDatabaseSpend from '../../Models/QueryRealmDatabaseSpend';

// styles
import styles from '../../Styles/AddNewStyle';

// uuid
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);

    this.dbD = new QueryRetriveDay();
    this.dbE = new QueryRealmDatabaseEarn();
    this.dbS = new QueryRealmDatabaseSpend();
    this.state = {
      avgEarnPerDay: 0,
      avgSpendPerDay: 0,
      sumSpendMonth: 0,
      sumEarnMonth: 0,
    };
    this.getQuatityMonth();
  }

  getQuatityMonth() {
    this.dbD
      .calMonthQuantity()
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleButtonSave = () => {
    // const day = new Date();
    // let daySpend = {
    //   dsid: uuidv4(),
    //   timestamp: day,
    //   Month: day.getMonth(),
    //   status: true,
    // };
    // this.dbD.insert(daySpend);
    // this.dbD
    //   .selectAll()
    //   .then(res => {
    //     console.log('DAAAAAAAAAA: ', res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // console.log(this.state.data);
  };

  render() {
    return (
      <View>
        <View>
          <Text>Chi tieu Thang 6</Text>
        </View>
        <View>
          <Text>Quy tich chi trong thang</Text>
          <Text>Quy tich tieu trong thang</Text>
          <Text>So tien trung binh tieu mot ngay</Text>
          <Text>So tien kiem duoc trung binh mot ngay</Text>
        </View>
        <View style={styles.viewButtonSave}>
          <TouchableOpacity
            style={styles.btnSave}
            onPress={this.handleButtonSave}>
            <MaterialIcons size={25} name="save" />
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Save</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginLeft: 6,
            marginTop: 2,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
          }}
        />
      </View>
    );
  }
}
