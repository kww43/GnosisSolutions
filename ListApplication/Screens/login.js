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

import AppConfig from '../src/AppConfig';
import * as firebase from 'firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

export default class LoginPage extends Component {
  //Create constructor for login constants


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
          //Should pass userID and navigate to new screen here if possible.
        })
      }

    });
  }
   render() {
      return (
         <View Style={styles.container}>
            <Button onPress={this._handleLogin}
              title="Login with Facebook"
              Sytle={styles.instructions}
              />
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
   welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 100,
   },
   instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
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
