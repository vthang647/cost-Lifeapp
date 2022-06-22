import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// Table
import TableComponent from '../../Components/TableComponent';

// import database
import QueryRealmDatabaseSpend from '../../Models/QueryRealmDatabaseSpend';
import QueryRealmDatabaseEarn from '../../Models/QueryRealmDatabaseEarn';
import QueryRetriveDay from '../../Models/QueryRetriveDay';

// Loading
import LoadingComponent from '../../Components/LoadingComponent';

// style
import Color from '../../Styles/Color';

// utils
import DashBoardItemUtil from '../../Utils/DashBoardItemUtil';

// icon
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Helpers from '../../Utils/Helpers';

const bufOS = [
  {
    id: 1,
    title: 'CAUSE',
    style: {
      flex: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0.5,
    },
  },
  {
    id: 2,
    title: 'MONEY',
    style: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0.5,
    },
  },
  {
    id: 3,
    title: 'TIMESTAMP',
    style: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0.5,
    },
  },
];

const styleCt = [
  {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
  },
  {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
  },
  {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
  },
];

export default class DetailsPerDayScreen extends Component {
  constructor(props) {
    super(props);
    this.dbE = new QueryRealmDatabaseEarn();
    this.dbS = new QueryRealmDatabaseSpend();
    this.dbD = new QueryRetriveDay();
    this.state = {
      tableSpend: [],
      tableEarn: [],
      thisDay: '',
      sumEarn: 0,
      sumSpend: 0,
      loading: false,
      dsid: this.props.route.params.obj,
      numCol: 3,
    };
  }

  componentDidMount() {
    this.selectPreDay();
    this.selectEarnTable();
    this.selectSpendTable();
    this.selectSumMoneyEarnPerDay();
    this.selectSumMoneySpendPerDay();
  }

  // EARN
  selectEarnTable() {
    this.dbE
      .getselectAllWithdsid(this.state.dsid)
      .then(res => {
        this.setState({tableEarn: [...res]});
      })
      .catch(err => {
        console.log(err);
      });
  }

  selectSumMoneyEarnPerDay() {
    this.dbE
      .getselectSumDsid(this.state.dsid)
      .then(res => {
        this.setState({sumEarn: res[0].sum});
      })
      .catch(err => {
        this.setState({sumEarn: 0});
      });
  }

  // THISDAY
  selectPreDay() {
    this.dbD
      .getDataWithDsid(this.state.dsid)
      .then(res => {
        this.setState({thisDay: res[0].timestamp});
      })
      .catch(e => {
        console.log(e);
      });
  }

  //SPEND
  selectSpendTable() {
    this.dbS
      .getselectAllWithdsid(this.state.dsid)
      .then(res => {
        this.setState({tableSpend: [...res]});
      })
      .catch(err => {
        console.log(err);
      });
    console.log('spend table: ', this.state.tableSpend);
  }

  selectSumMoneySpendPerDay() {
    this.dbS
      .getselectSumDsid(this.state.dsid)
      .then(res => {
        this.setState({sumSpend: res[0].sum});
      })
      .catch(err => {
        this.setState({sumSpend: 0});
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{marginTop: 18, marginLeft: 3}}>
          <Text style={styles.title}>Details{this.state.thisDay}</Text>
        </View>
        <View
          style={{
            marginLeft: 6,
            marginTop: 2,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
          }}
        />
        <View
          style={{
            marginLeft: 6,
            marginTop: 2,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
          }}
        />
        <View
          style={{
            marginLeft: 6,
            marginTop: 2,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 12,
            marginLeft: 6,
            marginBottom: 3,
          }}>
          <MaterialIcons
            size={25}
            style={{marginRight: 3}}
            name="account-balance-wallet"
          />
          <Text style={{fontWeight: 'bold', top: 6}}>EXPENDITURE</Text>
        </View>

        {this.state.tableSpend && this.state.tableSpend.length ? (
          <>
            <TableComponent
              dataTable={this.state.tableSpend}
              numCol={this.state.numCol}
              arrStyleObject={bufOS}
              styleContents={styleCt}
            />

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 12,
                marginLeft: 24,
                marginBottom: 3,
              }}>
              <MaterialIcons
                size={25}
                style={{marginRight: 3, top: -3}}
                name="trending-flat"
              />
              <Text style={{fontWeight: 'bold', fontSize: 14}}>
                Sum Money In: $ {this.state.sumSpend}
              </Text>
            </View>
          </>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              margin: 9,
            }}>
            <Text>Data is empty</Text>
          </View>
        )}

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 12,
            marginLeft: 6,
            marginBottom: 3,
          }}>
          <MaterialIcons
            size={25}
            style={{marginRight: 3}}
            name="monetization-on"
          />
          <Text style={{fontWeight: 'bold', top: 6}}>GET MONEY</Text>
        </View>

        {this.state.tableEarn && this.state.tableEarn.length ? (
          <>
            <TableComponent
              dataTable={this.state.tableEarn}
              numCol={this.state.numCol}
              arrStyleObject={bufOS}
              styleContents={styleCt}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 12,
                marginLeft: 24,
                marginBottom: 3,
              }}>
              <MaterialIcons
                size={25}
                style={{marginRight: 3, top: -3}}
                name="trending-flat"
              />
              <Text style={{fontWeight: 'bold', fontSize: 14}}>
                Sum Money In: $ {this.state.sumEarn}
              </Text>
            </View>
          </>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              margin: 9,
            }}>
            <Text>Data is empty</Text>
          </View>
        )}

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginRight: 56,
            marginBottom: 28,
          }}></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.could_,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
