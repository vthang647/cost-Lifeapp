import React from 'react';
import {View, StyleSheet, AppRegistry} from 'react-native';
import Routes from './Navigation/Routes';
function App() {
  return <Routes />;
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
