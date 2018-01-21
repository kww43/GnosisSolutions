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


export default class ListSelector extends Component {

  constructor(props) {
    super(props)
    this.saveUserID = this.props.userNum;
    this.pressed = false;
  }
  //Right now this shows how data can be accessed when passed using the current framework.
  render() {
    return (
      <View>
        <Text>Welcome your Facebook UserID is: {this.saveUserID}</Text>
        <TouchableOpacity
          onPress={this._handleTransfer}
          style={styles.button}>
            <Text style={styles.buttonTxt}>Go to your List</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _handleTransfer() {
    //Set the pressed flag
    this.pressed = true;
    /*
     * This command will go to the class defined under key: main in the router
     * as well as pass the user data we got from Facebook.
    */
    if(this.pressed != false) {
      Actions.main({saveUserID: this.saveUserID});
    }

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
