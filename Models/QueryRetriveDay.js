import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'CostLifeDatabase1.db'});

export default class QueryRetriveDay {
  constructor() {
    this.init();
  }

  init() {
    db.transaction(
      tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS day_spending(dsid VARCHAR(100) PRIMARY KEY, timestamp VARCHAR(100), status BOOLEAN)',
        );
      },
      [],
      function (tx, res) {
        console.log('RetriveDay: Create table if not exists');
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
      return await this.iscreatedDay(today);
    } catch (e) {
      console.log(e);
    }
  }

  selectAll() {
    return new Promise((resolve, reject) => {
      db.transaction(function (txn) {
        txn.executeSql(
          'SELECT * FROM day_spending',
          [],
          function (tx, res) {
            var temp = [];
            for (let i = 0; i < res.rows.length; ++i) {
              temp.push(res.rows.item(i));
            }
            resolve(temp);
          },
          function (error) {
            console.log('get SElectAll failure!', error);
          },
        );
      });
    });
  }

  iscreatedDay(today) {
    return new Promise((resolve, reject) => {
      db.transaction(function (txn) {
        txn.executeSql(
          'SELECT * FROM day_spending WHERE timestamp like ? ORDER BY timestamp DESC LIMIT 1',
          [today + '%'],
          function (tx, res) {
            if (res.rows.length > 0) {
              console.log('iscreatedDay', res.rows.item(0));
              resolve(res.rows.item(0));
            } else {
              resolve(null);
            }
          },
          function (error) {
            console.log('get today SElectAll failure!', error);
          },
        );
      });
    });
  }

  insert(preday_object) {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO day_spending (dsid, timestamp, status) VALUES (?,?,?)',
        [preday_object.dsid, preday_object.timestamp, preday_object.status],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('insert day_spending ok');
          } else console.log('nsert day_spending Failed');
        },
        err => {
          console.log(err);
        },
      );
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM  day_spending where id=?',
          [id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              resolve(results.rowsAffected);
              console.log('Delete successfully');
            } else {
              console.log('Please insert a valid User Id');
            }
          },
        );
      });
    });
  }
}
