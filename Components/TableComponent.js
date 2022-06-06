import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {ScrollView as GestureHandlerScrollView} from 'react-native-gesture-handler';

export default class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numCol: this.props.numCol,
      arrStyleObjectColum: this.props.arrStyleObject, // {title: [], style:[{}]}
    };
  }

  handleDeleteInRow = (index, id) => {
    Alert.alert('Delete', 'Do you sure to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          this.props.handleButtonDelete(index, id);
        },
      },
    ]);
  };

  render() {
    let dataTable = this.props.dataTable;
    return (
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.header}>
          {this.state.arrStyleObjectColum.map((item, index) => {
            return (
              <View style={item.style}>
                <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
              </View>
            );
          })}
        </View>
        {dataTable.map((item, index) => {
          return (
            <View key={item.id} style={styles.row1}>
              <TouchableOpacity
                style={styles.row1}
                onPress={index => {
                  this.handleDeleteInRow(index, item.id);
                }}>
                <View style={styles.col1}>
                  <Text style={{fontWeight: 'bold'}}>{index + 1}</Text>
                </View>
                <View style={styles.col2}>
                  <Text style={{fontWeight: 'bold'}}>{item.money}</Text>
                </View>
                <View style={styles.col3}>
                  <Text style={{fontWeight: 'bold'}}>{item.cause}</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#dddddd',
  },
});
