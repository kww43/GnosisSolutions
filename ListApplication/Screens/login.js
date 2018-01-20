import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Button,
  Navigator
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import AppConfig from '../src/AppConfig';
import * as firebase from 'firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import RouteManager from '../RouteManager';


export default class LoginPage extends Component {
  _handleLogin() {
    var userID = "00";
    LoginManager.logInWithReadPermissions(['public_profile']).then((result) =>{
      if(result.isCancelled){
        alert("Login is cancelled");
      }
      else {
        //User is logged into our application now we can access the AccessToken for their userID
        AccessToken.getCurrentAccessToken().then((data) => {
          userID = data.userID.toString();
          console.log(userID);
          //Navigate to main screen with userID in params
          Actions.main({userNum: userID});
        })
      }

    });
  }
   render() {
      return (
         <View style={styles.container}>
              <TouchableOpacity
                onPress={this._handleLogin}
                style={styles.button}>
                  <Text style={styles.buttonTxt}>Facebook</Text>
              </TouchableOpacity>
         </View>
      );
   }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 },
 button: {
   width: 300,
   backgroundColor: '#3B5998',
   borderRadius: 25,
   marginVertical: 10,
   paddingVertical: 16,
   alignItems: 'center'
 },

 buttonTxt: {
   fontSize: 20,
   color: "#ffffff",
 },
});

  // constructor() {
  //   super();
  //   this.state = {
  //     loading: true,
  //   };
  // }
  //
  // componentWillMount() {
  //   const config = AppConfig.getConfig();
  // }
  //
  // componentDidMount() {
  //   this.authSubscription =
  //     firebase.auth().onAuthStateChanged((user) => {
  //       this.setState({
  //         loading: false,
  //         user,
  //       });
  //     });
  // }
  //
  // componentWillUnmount() {
  //   this.authSubscription();
  // }
  //
  // render() {
  //   if(this.state.loading) {
  //     return null;
  //   }
  //
  //   if(this.state.user) {
  //     return <LoggedIn />;
  //   }
  //   //Else if none above then we return logged out screen
  //     return <LoggedOut />;
  // }
//}
