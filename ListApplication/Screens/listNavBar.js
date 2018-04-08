import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Title,
  TextInput,
  View,
  TouchableOpacity,
  Button,
  Navigator,
  Modal,
  ScrollView
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './screenStyles';

export default class ListNavBar extends Component {
  render() {
    return (
     <View style={styles.listNavBarContainer}>
      <Text>NAVBAR</Text>
     </View>
    );
  }
}
