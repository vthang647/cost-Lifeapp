import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from 'react-native';

// component
import DashBoardItem from '../../Components/DashBoardItem';

//database
import QueryRetriveDay from '../../Models/QueryRetriveDay';

//loading
import LoadingComponent from '../../Components/LoadingComponent';
import Helpers from '../../Utils/Helpers';

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
    this.setState({loading: true});
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
                key={item.dsid}
                navigation={this.props.navigation}
                item={item}
              />
            );
          }}
          keyExtractor={item => item.dsid}
        />
        <Button
          title="clickc here"
          onPress={() => {
            Helpers.setMonthStringToNumber('Jun');
          }}
        />
        {this.state.loading ? <LoadingComponent /> : null}
      </SafeAreaView>
    );
  }
}
