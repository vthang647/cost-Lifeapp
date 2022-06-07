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

// Loading
import LoadingComponent from '../../Components/LoadingComponent';

// style
import Color from '../../Styles/Color';

// utils
import DashBoardItemUtil from '../../Utils/DashBoardItemUtil';

// icon
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const bufOS = [
  {
    title: 'CAUSE',
    style: {
      flex: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0.5,
    },
  },
  {
    title: 'MONEY',
    style: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0.5,
    },
  },
  {
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
        this.setState({tableEarn: [...res], thisDay: res[0].timestamp});
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
        console.log(err);
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
  }

  selectSumMoneySpendPerDay() {
    this.dbS
      .getselectSumDsid(this.state.dsid)
      .then(res => {
        this.setState({sumSpend: res[0].sum});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{marginTop: 18, marginLeft: 3}}>
          <Text style={styles.title}>
            Details {DashBoardItemUtil.refreshHeader(this.state.thisDay)}
          </Text>
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
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginRight: 56,
            marginBottom: 28,
          }}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDffD"
            onPress={() => alert('Pressed!')}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignItems: 'center',
                backgroundColor: '#DDDDDD',
                padding: 10,
                width: 68,
                height: 68,
                borderRadius: 34,
              }}>
              <MaterialIcons size={42} name="edit" />
            </View>
          </TouchableHighlight>
        </View>
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
