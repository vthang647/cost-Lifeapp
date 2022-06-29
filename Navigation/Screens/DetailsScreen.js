import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// icon
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// database
import QueryRetriveDay from '../../Models/QueryRetriveDay';
import QueryRealmDatabaseEarn from '../../Models/QueryRealmDatabaseEarn';
import QueryRealmDatabaseSpend from '../../Models/QueryRealmDatabaseSpend';

// styles
import styles from '../../Styles/AddNewStyle';

// uuid
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

// component
import DetailsComponent from '../../Components/DetailsComponent';

// Styles
import Color from '../../Styles/Color';

// loading
import LoadingComponent from '../../Components/LoadingComponent';

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);

    this.dbD = new QueryRetriveDay();
    this.dbE = new QueryRealmDatabaseEarn();
    this.dbS = new QueryRealmDatabaseSpend();
    this.state = {
      Months: [],
      arr_id_in_month: [],
      avgEarnPerDay: 0,
      avgSpendPerDay: 0,
      sumSpendMonth: 0,
      sumEarnMonth: 0,
      arrsumSpendMonth: [],
      arrsumEarnMonth: [],
      arravgSpendMonth: [],
      arravgEarnMonth: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    this.getQuatityMonth();
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.updateState();
      },
    );
  }

  updateState() {
    this.getQuatityMonth();
    this.setState({loading: false});
  }

  async getQuatityMonth() {
    await new Promise((resolve, reject) => {
      this.dbD
        .getMonth()
        .then(res => {
          this.setState({Months: [...res]}, () => {
            console.log(this.state.Months);
          });
          resolve(this.state.Months);
        })
        .catch(e => {
          console.log(e);
        });
    });

    await new Promise((resolve, reject) => {
      for (let index = 0; index < this.state.Months.length; index++) {
        const element = this.state.Months[index].Month;
        this.dbD
          .getId_aMonth(element)
          .then(res => {
            this.setState(
              {
                arr_id_in_month: [...this.state.arr_id_in_month, [...res]],
                loading: false,
              },
              () => {
                console.log(this.state.arr_id_in_month);
              },
            );
            resolve(res);
          })
          .catch(e => {
            console.log(e);
          });
      }
    });

    await this.getSumEarnInMonth();
    await this.getSumSpendInMonth();
    await this.getavgEarn_aDay();
    await this.getavgSpend_aDay();
  }

  getSumEarnInMonth() {
    return new Promise((resolve, reject) => {
      this.setState({loading: true});
      for (let j = 0; j < this.state.arr_id_in_month.length; j++) {
        const element = this.state.arr_id_in_month[j];
        let arr = 0;

        for (let i = 0; i < element.length; i++) {
          const item = element[i].dsid;
          this.dbE
            .getselectSumDsid(item)
            .then(res => {
              this.setState(
                (previousState, currentProps) => {
                  return {
                    sumEarnMonth: previousState.sumEarnMonth + res[0].sum,
                    loading: false,
                  };
                },
                () => {
                  if (i == element.length - 1) {
                    this.setState(
                      (previousState, currentProps) => ({
                        arrsumEarnMonth: [
                          ...previousState.arrsumEarnMonth,
                          this.state.sumEarnMonth,
                        ],
                      }),
                      () => {
                        resolve(this.state.arrsumEarnMonth);
                        console.log(this.state.arrsumEarnMonth);
                      },
                    );
                  }
                },
              );
            })
            .catch(e => {
              console.log(e);
            });
        }
      }
    });
  }

  getSumSpendInMonth() {
    return new Promise((resolve, reject) => {
      this.setState({loading: true});
      for (let j = 0; j < this.state.arr_id_in_month.length; j++) {
        const element = this.state.arr_id_in_month[j];

        for (let i = 0; i < element.length; i++) {
          const item = element[i].dsid;
          this.dbS
            .getselectSumDsid(item)
            .then(res => {
              this.setState(
                (previousState, currentProps) => {
                  return {
                    sumSpendMonth: previousState.sumSpendMonth + res[0].sum,
                    loading: false,
                  };
                },
                () => {
                  if (i == element.length - 1) {
                    this.setState(
                      (previousState, currentProps) => ({
                        arrsumSpendMonth: [
                          ...previousState.arrsumSpendMonth,
                          this.state.sumSpendMonth,
                        ],
                      }),
                      () => {
                        resolve(this.state.arrsumSpendMonth);
                        console.log(this.state.arrsumSpendMonth);
                      },
                    );
                  }
                },
              );
            })
            .catch(e => {
              console.log(e);
            });
        }
      }
    });
  }

  getavgEarn_aDay() {
    return new Promise((resolve, reject) => {
      for (let index = 0; index < this.state.Months.length; index++) {
        const element = this.state.Months[index];
        let SumMoney = this.state.arrsumEarnMonth[index];
        let dayuse = element.numday;

        let avg = parseInt(SumMoney) / parseInt(dayuse);

        this.setState(
          {
            arravgEarnMonth: [...this.state.arravgEarnMonth, Math.floor(avg)],
          },
          () => {
            console.log(this.state.arravgEarnMonth);
          },
        );
      }
      resolve(this.state.arravgEarnMonth);
    });
  }

  getavgSpend_aDay() {
    return new Promise((resolve, reject) => {
      for (let index = 0; index < this.state.Months.length; index++) {
        const element = this.state.Months[index];
        let SumMoney = this.state.arrsumSpendMonth[index];
        let dayuse = element.numday;

        let avg = parseInt(SumMoney) / parseInt(dayuse);
        this.setState(
          {
            arravgSpendMonth: [...this.state.arravgSpendMonth, Math.floor(avg)],
          },
          () => {
            console.log(this.state.arravgSpendMonth);
          },
        );
      }
      resolve(this.state.arravgSpendMonth);
    });
  }

  render() {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: Color.dabutchi,
        }}>
        {this.state.Months.map((item, index) => {
          return (
            <DetailsComponent
              key={index}
              item={item}
              sumE={this.state.arrsumEarnMonth[index]}
              sumS={this.state.arrsumSpendMonth[index]}
              arravgEarnMonth={this.state.arravgEarnMonth[index]}
              arravgSpendMonth={this.state.arravgSpendMonth[index]}
            />
          );
        })}
        {this.state.loading ? <LoadingComponent /> : null}
      </View>
    );
  }
}
