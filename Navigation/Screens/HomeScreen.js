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
  }

  componentDidMount() {
    this.selectAllDataDaySpending();
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.updateState();
      },
    );
  }

  updateState() {
    this.selectAllDataDaySpending();
    console.log(this.state.data);
    this.setState({loading: false});
  }

  componentWillUnmount() {
    this.willFocusSubscription();
  }

  selectAllDataDaySpending() {
    this.setState({loading: true});
    this.dbDay
      .selectAll()
      .then(res => {
        this.setState({data: [...res], loading: false});
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
              <DashBoardItem
                key={item.id}
                navigation={this.props.navigation}
                item={item}
              />
            );
          }}
          keyExtractor={item => item.id}
        />
        {this.state.loading ? <LoadingComponent /> : null}
      </SafeAreaView>
    );
  }
}
