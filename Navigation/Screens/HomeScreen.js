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

// database
// import HomeRetriveDatabase from '../../Models/HomeRetriveDatabase';

//loading
import LoadingComponent from '../../Components/LoadingComponent';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <FlatList
          data={data}
          renderItem={DashBoardItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        /> */}
        <TouchableOpacity
          onPress={this.testClick}
          style={{width: 100, height: 50, backgroundColor: 'tomato'}}>
          <Text>hello</Text>
        </TouchableOpacity>
        {this.state.loading ? <LoadingComponent /> : null}
      </SafeAreaView>
    );
  }
}
