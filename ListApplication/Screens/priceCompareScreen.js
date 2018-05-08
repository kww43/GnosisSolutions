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
        this.itemsPathway = this.props.itemsPathway;
        getAllItems(this);
        this.nodes = [];
        this.loadInStores();
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
        storeNames: [],
        storePrices: [],
        store1Price: 0,
        store2Price: 0,

      }


    render() {
        return(
            <View style={styles.itemModal2}>
              <Text>Here are the prices for your list </Text>
              <TouchableOpacity
              onPress={this.loadInStores.bind(this)}>
                <Text>Run comparisons</Text>
              </TouchableOpacity>
                
                <View
                >
                  <Text style={styles.listText}>At {this.state.storeNames[0]}</Text>
                  <Text style={styles.listText}>${this.state.storePrices[0]}</Text>
                  <View>

                  </View>
                  <View >
                      <Text style={styles.listText}>At {this.state.storeNames[1]}</Text>
                      <Text style={styles.listText}>${this.state.storePrices[1]}</Text>
                  </View>
                </View>
            </View>

        );
    }

  loadInStores(){
    //take user's location and find two stores that are closest to it
    var lat = 0;
    var long = 0;

    navigator.geolocation.getCurrentPosition(
      position => {
        //position network okay
        lat = position.coords.latitude;
        long = position.coords.longitude;

        this.setState({latitude: lat, longitude: long});
        var storeRef = this.dbConnection.ref('stores/');

        //access stores             
        storeRef.on('value', function(snapshot) {
          //load in the stores to check the distance from, we want to save two
          var distance = 0;
          var price = 0;
          var storesToHold = [];
          var counter = 0;
          var snaplength = 0;
          var snap = snapshot.val();
          var jsonElements = JSON.parse( JSON.stringify(snap));

          //loop through stores to find two that are closest
          for (var key in jsonElements){
            distance = getDistance(lat, long, snap[key].latitude, snap[key].longitude);

            if(distance < 3){
              this.state.storeNames.push(snap[key].Name);
              if (counter == 2){
                return;
              }
              counter += 1;


              var itemRef = this.dbConnection.ref('stores/' + key + '/items/');
              itemRef.on('value', function(snapshot) {
                totalPrice = 0;
                var snaplength = 0;
                var snap = snapshot.val();
                var jsonElements = JSON.parse(JSON.stringify(snap));

                for(var itemKey in jsonElements){
                  for(i = 0; i < this.state.noteArray.length; i++){
                    var name = this.state.noteArray[i].note;
                    var helpKey = this.state.noteArray[i].key;

                    if(snap[itemKey].itemName == name){

                      //add the items prices together
                      totalPrice += parseFloat(snap[itemKey].itemPrice);
                    }
                  }
                }
                this.state.storePrices.push(totalPrice);
              }.bind(this));


            }
          }
          this.setState({storeNames: this.state.storeNames});
          this.setState({storePrices: this.state.storePrices});

        }.bind(this));
      }
    )
  }
}