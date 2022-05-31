import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

//icon
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// table & input
import TableDisplayComponent from '../../Components/TableDisplayComponent';
import InputInfoComponent from '../../Components/InputInfoComponent';
import styles from '../../Styles/AddNewStyle';

// REalm database query
import QueryRealmDatabase from '../../Models/QueryRealmDatabase';
import {Children} from 'react/cjs/react.production.min';

export default class CreateNewScreen extends Component {
  constructor(props) {
    super(props);
    this.db = new QueryRealmDatabase();
    this.state = {
      labelMoneySpend: 'Money Spend',
      labelMoneyEarn: 'Money Earn',
      dataTableSpend: [
        {
          cause: 'Nếu biết',
          id: '4fbf1a0d-3952-4f0b-8ab1-1c897956efa2',
          money: '$ 8',
          status: true,
          timestamp: 'Tue May 31 2022 10:21:33 GMT+0700 (ICT)',
        },
      ],
      dataTableEarn: [],
    };
  }

  handleButtonAddSpend = info => {
    let Spend = {
      id: info.id,
      moneySpend: info.money,
      cause: info.cause,
      timestamp: info.timestamp,
      status: info.status,
    };
    console.log('-----------------Spend-----------------');
    this.db.insert(Spend);
    this.db
      .getDetailsToday()
      .then(res => {
        this.setState({dataTableSpend: [...res]});
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleButtonDeleteSpend = id => {
    this.db.delete(id);
  };

  handleButtonAddEarn = info => {
    // this.db
    //   .getDetailsToday()
    //   .then(res => {
    //     this.setState({dataTableEarn: [...res]});
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };
  handleButtonSave = () => {};
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <InputInfoComponent
              handleButtonAdd={this.handleButtonAddSpend}
              resetStatus={this.resetStatus}
              labelMoney={this.state.labelMoneySpend}
            />
            <TableDisplayComponent
              dataTable={this.state.dataTableSpend}
              labelMoney={this.state.labelMoneySpend}
              handleButtonDelete={this.handleButtonDeleteSpend}
            />
          </View>
          <View style={styles.container}>
            <InputInfoComponent
              handleButtonAdd={this.handleButtonAddEarn}
              resetStatus={this.resetStatus}
              labelMoney={this.state.labelMoneyEarn}
            />
            <TableDisplayComponent
              dataTable={this.state.dataTableEarn}
              labelMoney={this.state.labelMoneyEarn}
              handleButtonDelete={this.handleButtonDeleteEarn}
            />
          </View>
          <View style={styles.viewButtonSave}>
            <TouchableOpacity
              style={styles.btnSave}
              onPress={this.handleButtonSave}>
              <MaterialIcons size={25} name="save" />
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
