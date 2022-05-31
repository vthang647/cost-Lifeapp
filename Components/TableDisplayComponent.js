import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {ScrollView as GestureHandlerScrollView} from 'react-native-gesture-handler';
import styles from '../Styles/AddNewStyle';

export default class TableDisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelMoney: this.props.labelMoney,
      arr: [
        {id: 1, name: 'salah'},
        {id: 2, name: 'ronando'},
        {id: 3, name: 'benzema'},
      ],
    };
  }

  handleDeleteInRow = index => {
    Alert.alert('Delete', 'Do you sure to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          this.props.handleButtonDelete();
        },
      },
    ]);
  };

  render() {
    let dataTable = this.props.dataTable;
    return (
      <View>
        <ScrollView
          style={{width: 500, height: 500}}
          nestedScrollEnabled={true}
          scrollEnabled={true}
          keyboardShouldPersistTaps="always">
          <View style={styles.header}>
            <View style={styles.col1}>
              <Text style={{fontWeight: 'bold'}}>##</Text>
            </View>
            <View style={styles.col2}>
              <Text style={{fontWeight: 'bold'}}>{this.state.labelMoney}</Text>
            </View>
            <View style={styles.col3}>
              <Text style={{fontWeight: 'bold'}}>Cause</Text>
            </View>
          </View>
          {dataTable.map((item, index) => {
            <View key={item.id} style={styles.row1}>
              <TouchableOpacity
                style={styles.row1}
                onPress={index => {
                  this.handleDeleteInRow(index);
                }}>
                <View style={styles.col1}>
                  <Text style={{fontWeight: 'bold'}}>{index + 1}</Text>
                </View>

                <View style={styles.col2}>
                  <Text style={{fontWeight: 'bold'}}>{item.moneySpend}</Text>
                </View>

                <View style={styles.col3}>
                  <Text style={{fontWeight: 'bold'}}>{item.cause}</Text>
                </View>
                {console.log('hellooooooooooooooooooooooo', item.cause)}
              </TouchableOpacity>
            </View>;
          })}
        </ScrollView>
      </View>
    );
  }
}
