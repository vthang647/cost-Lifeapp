import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '66172803980-k1vfpt9mpo0tqui8dfc1tes7vi2gedqh.apps.googleusercontent.com',
  offlineAccess: true,
});

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const googleSignIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const services = await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
        this.setState({userInfo});
        console.log(userInfo);
        console.log(services);
      } catch (error) {
        console.log(error);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
    };
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            borderWidth: 1,
          }}
          onPress={googleSignIn}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>Google Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
