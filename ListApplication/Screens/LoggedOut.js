import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Navigator
} from 'react-native';


import AppConfig from '../src/AppConfig';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;
var createReactClass = require('create-react-class');

var Login = createReactClass({
  render: function() {
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                alert("Login was successful with permissions: " + result.grantedPermissions)
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
      </View>
    );
  }
});
// onLoginOrRegister = () => {
//   GoogleSignin.signIn()
//     .then((data) => {
//       const cred =
//         firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
//       return firebase.auth().signInWithCredential(credential);
//     })
//     .then((user) => {
//       //Do User Stuff
//     })
//     .catch((error) => {
//       const { code, message } = error;
//     });
// }
