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
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {
  getItemsPath,
  saveItem,
  getAllItems,
  getCartPath,
  removeItem,
  submitNewStore,
  updateItem
} from '../src/databaseController';

import {CheckBox} from 'react-native-elements';

import TimerMixin from 'react-timer-mixin';

import AutoSuggest from 'react-native-autosuggest';

import ModalDropdown from 'react-native-modal-dropdown';

import Note from '../Components/Note';

import Login from '../Screens/testLogin';

import LoginPage from '../Screens/login';

import LongPressModal from '../Components/LongPressModal';

import Node from '../src/Node.js';

import { Actions } from 'react-native-router-flux';

import {getLatitude, getLongitude, getDistance} from '../src/geolocation';

// import external stylesheet
import styles from './screenStyles';

export default class priceCompareScreen extends Component{

    constructor(props){
        super(props);
        this.keys = [];
        this.firebase = this.props.firebase;
        this.dbConnection = this.props.dbConnection;
        this.listName = this.props.listName;
        this.loginType = this.props.loginType;
        this.itemsPathway = this.props.itemsPathway
        getAllItems(this);
        this.nodes = [];
      }
    
      componentDidMount() {
        this._mounted = true;
      }
    
      componentWillMount() {
        this._mounted = false;
      }

      state = {
        noteArray: [],
        checkedNoteArray: [],
        priceText: "0",
        totalPrice: 0,
        priceKeyToSubmit: "",
      }


    render() {
        return(
            <View style={styles.itemModal2}>
              <Text>Here are the prices for your list </Text>
                
                <View
                >
                  <Text style={styles.listText}>At Safeway</Text>
                  <Text style={styles.listText}>$27.39</Text>
                  <View>

                  </View>
                  <View >
                      <Text style={styles.listText}>At Bashas</Text>
                      <Text style={styles.listText}>$30.67</Text>
                  </View>
                </View>
            </View>

        );
    }
}