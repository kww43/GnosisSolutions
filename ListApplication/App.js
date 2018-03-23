import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StackNavigator,
  TouchableHighlight,
  Modal,
} from 'react-native';

import RouteManager from './RouteManager';
import SplashScreen from 'react-native-splash-screen';

export default class ListApplication extends Component {
  render(){
    return (
        <RouteManager />
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#1de9b6',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },
  enter: {
    borderWidth: 5,
    borderColor: '#ddd',
    flexDirection: 'row',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
  },
  addButtons: {
    backgroundColor: '#00b8d4',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    borderRadius: 2,
  },
  addButtonText: {
    fontSize: 24
  },
  textInput: {
    alignSelf: 'stretch',
    fontSize: 24,
    flex: 5,

  },


});
AppRegistry.registerComponent('ListApplication', () => ListApplication);
