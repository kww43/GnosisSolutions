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

export default class LoggedIn extends Component {

  render() {
    return(
      <View>
        <Text>"Logged IN"</Text>
      </View>
    )
  }
}
