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
import QueryRealmDatabaseSpend from '../../Models/QueryRealmDatabaseSpend';
import QueryRealmDatabaseEarn from '../../Models/QueryRealmDatabaseEarn';
import QueryRetriveDay from '../../Models/QueryRetriveDay';

//loading component
import LoadingComponent from '../../Components/LoadingComponent';

// uuid
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export default class CreateNewScreen extends Component {
  constructor(props) {
    super(props);
    this.dbDaySpending = new QueryRetriveDay();
    this.dbSpend = new QueryRealmDatabaseSpend();
    this.dbEarn = new QueryRealmDatabaseEarn();
    this.state = {
      labelMoneySpend: 'Money Spend',
      labelMoneyEarn: 'Money Earn',
      dataTableSpend: [],
      dataTableEarn: [],
      loading: false,
      dayCreated: false,
      daySpending: null,
    };
    this.getInsertDaySpending();
    this.preLsSpendCost();
    this.preLsEarnCost();
  }

  setLoading(val) {
    this.setState({loading: val});
  }
  // ------------------------Spend------vv-----------------
  // ------------------------Spend---v--vv--v--------------
  // ------------------------Spend-----vvvv----------------
  handleButtonAddSpend = info => {
    this.dbSpend.insert(info);
    this.preLsSpendCost();
    console.log('-----------', this.state.dataTableSpend, '-----------------');
  };

  preLsSpendCost = () => {
    this.dbSpend
      .getDetailsToday()
      .then(res => {
        this.setState({dataTableSpend: [...res]});
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleButtonDeleteSpend = (index, id) => {
    this.setLoading(true);

    this.dbSpend
      .delete(id)
      .then(res => {
        console.log('hahahahhah: ', res);
        this.setLoading(false);
      })
      .catch(rej => {
        console.log('er r r de lete');
      });
    this.preLsSpendCost();
  };
  // -----------------^^^^-----Spend-------------------------
  // --------------------==--Spend-------------------------
  // --------------------==--Spend-------------------------

  // --------------EARN-----v----------------
  preLsEarnCost = () => {
    this.dbEarn
      .getDetailsToday()
      .then(res => {
        this.setState({dataTableEarn: [...res]});
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleButtonAddEarn = info => {
    this.dbEarn.insert(info);
    this.preLsEarnCost();
  };

  handleButtonDeleteEarn = (index, id) => {
    this.setLoading(true);

    this.dbEarn
      .delete(id)
      .then(res => {
        this.setLoading(false);
      })
      .catch(rej => {
        console.log('er r r de lete');
      });
    this.preLsEarnCost();
  };
  // -----------------^-------EARN-------------------------
  // handleButtonSave = () => {};

  // Retrive Queryday
  insertDaySpending() {
    let daySpend = {
      id: uuidv4(),
      timestamp: '' + new Date(),
      status: true,
    };
    try {
      this.dbDaySpending.insert(daySpend);
    } catch (error) {
      console.log(error);
    }
  }

  getInsertDaySpending() {
    this.dbDaySpending.getDetailsToday().then(res => {
      if (res != null) {
        console.log('1111111111');
        this.setState({daySpending: res});
      } else if (res == null) {
        console.log('22222222222');
        this.insertDaySpending();
        let daySpend = {
          id: uuidv4(),
          timestamp: '' + new Date(),
          status: true,
        };
        this.setState({daySpending: daySpend});
      } else {
        console.log('selectDaySpending error');
      }
    });
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.container}>
            <InputInfoComponent
              handleButtonAdd={this.handleButtonAddSpend}
              dsid={this.state.daySpending}
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
              dsid={this.state.daySpending}
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
        {this.state.loading ? <LoadingComponent /> : null}
      </SafeAreaView>
    );
  }
}
