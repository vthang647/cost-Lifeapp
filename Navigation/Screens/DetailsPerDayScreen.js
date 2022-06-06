import React, {Component} from 'react';
import {View, Text, TouchableHighlight, SafeAreaView} from 'react-native';

// Table
import TableDisplayComponent from '../../Components/TableDisplayComponent';

// import database
import QueryRealmDatabaseSpend from '../../Models/QueryRealmDatabaseSpend';
import QueryRealmDatabaseEarn from '../../Models/QueryRealmDatabaseEarn';

// Loading
import LoadingComponent from '../../Components/LoadingComponent';

export default class DetailsPerDayScreen extends Component {
  constructor(props) {
    super(props);
    this.dbE = new QueryRealmDatabaseEarn();
    this.dbS = new QueryRealmDatabaseSpend();
    this.state = {
      tableSpend: [],
      tableEarn: [],
      loading: false,
      dsid: this.props.route.params.obj,
    };
    this.selectEarnTable();
    this.selectSpendTable();
  }

  selectEarnTable() {
    this.dbE
      .selectAllWithdsid(this.state.dsid)
      .then(res => {
        this.setState({tableEarn: [...res]});
      })
      .catch(err => {
        console.log(err);
      });
    console.log(this.state.tableEarn);
  }

  selectSpendTable() {
    this.dbS
      .selectAllWithdsid(this.state.dsid)
      .then(res => {
        this.setState({tableSpend: [...res]});
      })
      .catch(err => {
        console.log(err);
      });
    console.log(this.state.tableSpend);
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>aaaaaa {console.log('pp')}</Text>
      </View>
    );
  }
}
