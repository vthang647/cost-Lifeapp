import {openDatabase} from 'react-native-sqlite-storage';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = openDatabase({name: 'SpendDatabase.db'});

export default class QueryRealmDatabase {
  constructor() {
    this.init();
  }

  init() {
    db.transaction(
      tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS spend_table(id VARCHAR(100), moneySpend DOUBLE(20), cause INT(10), timestamp VARCHAR(100), status BOOLEAN)',
        );
      },
      [],
      function (tx, res) {
        console.log('Create table if not exists');
      },
      function () {
        console.log('not Create table if not exists');
      },
    );
  }

  async getDetails() {
    try {
      return await this.selectAll();
    } catch (e) {
      console.log(e);
    }
  }

  async getDetailsToday() {
    try {
      let day = new Date();
      let today = new String(day).substring(0, 15);
      return await this.selectAllToday(today);
    } catch (e) {
      console.log(e);
    }
  }

  selectAll() {
    return new Promise((resolve, reject) => {
      db.transaction(function (txn) {
        txn.executeSql(
          'SELECT * FROM spend_table',
          [],
          function (tx, res) {
            console.log('result: ', res.rows.item(res.rows.length - 1));
            var temp = [];
            for (let i = 0; i < res.rows.length; ++i) {
              temp.push(res.rows.item(i));
            }
            resolve(temp);
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS spend_table', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS spend_table(id VARCHAR(100), moneySpend DOUBLE(20), cause INT(10), timestamp VARCHAR(100), status BOOLEAN)',
                [],
              );
            }
          },
          function (error) {
            console.log('get SElectAll failure!', error);
          },
        );
      });
    });
  }

  selectAllToday(today) {
    return new Promise((resolve, reject) => {
      db.transaction(function (txn) {
        txn.executeSql(
          'SELECT * FROM spend_table where timestamp like ?',
          [today + '%'],
          function (tx, res) {
            console.log('result earn: ', res.rows.length);
            var temp = [];
            for (let i = 0; i < res.rows.length; ++i) {
              temp.push(res.rows.item(i));
            }
            resolve(temp);
          },
          function (error) {
            console.log('get today SElectAll failure!', error);
          },
        );
      });
    });
  }

  insert(spend_object) {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO spend_table (id, moneySpend, cause, timestamp, status) VALUES (?,?,?,?,?)',
        [
          spend_object.id,
          spend_object.moneySpend,
          spend_object.cause,
          spend_object.timestamp,
          spend_object.status,
        ],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Add new Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Add Failed');
        },
      );
    });
  }

  update(spend_object) {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE spend_table set moneySpend=?, cause=?, timestamp=?, status=? where id=?',
        [
          spend_object.moneySpend,
          spend_object.cause,
          spend_object.timestamp,
          spend_object.status,
          spend_object.id,
        ],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Updation Failed');
        },
      );
    });
  }

  delete() {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  spend_table where id=?',
        [inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid User Id');
          }
        },
      );
    });
  }
}
