import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

// component
import DashBoardItem from '../../Components/DashBoardItem';

//database
import QueryRetriveDay from '../../Models/QueryRetriveDay';

//loading
import LoadingComponent from '../../Components/LoadingComponent';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.dbDay = new QueryRetriveDay();

    this.state = {
      loading: false,
      data: [],
    };
    this.selectAllDataDaySpending();
  }

  selectAllDataDaySpending() {
    this.dbDay
      .selectAll()
      .then(res => {
        this.setState({data: [...res]});
      })
      .catch(err => {
        console.log(err);
      });
    console.log(this.state.data);
  }

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.data}
          renderItem={item => {
            return (
              <DashBoardItem navigation={this.props.navigation} item={item} />
            );
          }}
          keyExtractor={item => item.id}
        />
        {this.state.loading ? <LoadingComponent /> : null}
      </SafeAreaView>
    );
  }
}
