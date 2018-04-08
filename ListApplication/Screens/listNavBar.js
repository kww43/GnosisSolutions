import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Title,
  TextInput,
  View,
  Image,
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

  constructor(props) {
    super(props)

  }
  render() {
    return (
     <View style={styles.listNavBarContainer}>
       <Icon style={styles.listNavBarLogout} name="chevron-left" size={48} color="white" />
       <Image style={styles.listNavBarLogo} source={require('../Images/logo.png')} />
       <Icon style={styles.listNavBarOptions} name="cog" size={48} color="white" />
       <Icon style={styles.listNavBarNewListButton} name="plus" size={48} color="white" />
     </View>
    );
  }
}
