import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Button,
  Platform,
  Navigator
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import AppConfig from '../src/AppConfig';
import * as firebase from 'firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import RouteManager from '../RouteManager';
import {
  getFirebaseConnection,
  getDatabaseConnection
} from '../src/databaseController';


export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.firebase = getFirebaseConnection();
    this.dbConnection = getDatabaseConnection(this.firebase);
    this.state = {
      googleUser: null
    };
  }

  /*
   * Facebook login handler
  */
  _facebookLogin() {
    var userID = "00";
    LoginManager.logInWithReadPermissions(['public_profile']).then((result) =>{
      if(result.isCancelled){
        alert("Login is cancelled");
      }
      else {
        //User is logged into our application now we can access the AccessToken for their userID
        AccessToken.getCurrentAccessToken().then((data) => {
          userID = data.userID.toString();
          //Navigate to main screen with userID in params
          Actions.listSelector({userNum: userID, firebaseModule: this.firebase, dbConnection: this.dbConnection, loginType: "facebook"});
        })
      }

    });
  }

  /*
   * Make sure we can setup Google sign in settings before
   * click event so we could possibly warn user of malfunction.
  */
  componentDidMount() {
    try{
      if(Platform.OS === "ios") {
        //iOS version
        GoogleSignin.configure({
          scopes: ["https://www.googleapis.com/auth/drive.readonly"],
          iosClientId: '44960303372-3tb8i44hssretfmle4ugtshqnc26kfl5.apps.googleusercontent.com',
          offlineAccess: false,
          forceConsentPrompt: true
        });
      }
      else if(Platform.OS === "android") {
        //Android version
        GoogleSignin.hasPlayServices({ autoResolve: true });
        GoogleSignin.configure({
          scopes: ["https://www.googleapis.com/auth/drive.readonly"],
          offlineAccess: false,
          forceConsentPrompt: true,
        });
      }
    }
    catch(err) {
      console.log("Google error: ", err.code, err.message);
    }
  }

   /*
    * Function that will handle the sign in for google user if chosen
    * this function will direct user to listSelector screen with appropriate meta data passed
   */
   _googleLogin(){
    try{
        GoogleSignin.signIn()
        .then((user) => {
          console.log(user['id']);
          Actions.listSelector({userNum: user['id'], firebaseModule: this.firebase, dbConnection: this.dbConnection, loginType: "google"});
        })
        .catch((err) => {
          console.log("WRONG SIGNIN", err);
        })
        .done();
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }

  }

   render() {
      return (
         <View style={styles.container}>
              <Text
              style={styles.WelcomeText}
              >Welcome to Smart Shopping</Text>
              <TouchableOpacity
               elevation={5}
                onPress={this._facebookLogin.bind(this)}
                style={styles.button}>
                  <Text style={styles.buttonTxt}>Login with Facebook</Text>
              </TouchableOpacity>

              <GoogleSigninButton
                style={{width:312, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this._googleLogin.bind(this)}
              />
         </View>
      );
   }
}

const styles = StyleSheet.create({
  container: {
   backgroundColor: '#023f0d',
   flex: 2,
   alignItems: 'center'
 },
 button: {
   width: 300,
   backgroundColor: '#00e5ff',
   borderRadius: 25,
   marginVertical: 10,
   paddingVertical: 16,
   alignItems: 'center',
   shadowColor: '#000000',
   shadowOffset: {
     width: 0,
     height: 3
   },
   shadowRadius: 5,
   shadowOpacity: 1.0
 },
 WelcomeText: {
  alignItems: 'center',
  marginTop: 0,
  color: '#ffffff',
  fontSize: 40,
  fontFamily: 'FontAwesome',

 },
 buttonTxt: {
   fontSize: 20,
   color: "#ffffff",
 },
});
