import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
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
  getAllStores,
  getStoresPath,
  getCartPath,
  removeItem,
  submitNewStore,
  updateItem,
  saveItemToStore,
} from '../src/databaseController';

import Store from '../src/Store';

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

import Icon from 'react-native-vector-icons/FontAwesome';

import {getLocation, getDistance} from '../src/geolocation';

// import external stylesheet
import styles from './screenStyles';

export default class MainScreen extends Component{

  constructor(props) {
    super(props)
    this.title = this.props.title;
    this.keys = [];
    this.firebase = this.props.firebaseModule;
    this.dbConnection = this.props.dbConnection;
    this.listName = this.props.listName;
    this.loginType = this.props.loginType;
    this.storePathway = getStoresPath(this.dbConnection);
    this.itemsPathway = getCartPath(this.dbConnection,
                                    this.props.userNum,
                                    this.props.listName,
                                    this.props.loginType);
    getAllStores(this);

    getAllItems(this);
    this.calcTotalPrice();
    this.nodes = [];
  }


  componentDidMount() {
    this._mounted = true;
  }

  componentWillMount() {
    this._mounted = false;
  }

  //defines initial state
  state = {
    noteArray: [],
    checkedNoteArray: [],
    storesArray: [],
    noteText: '',
    modalVisible: false,
    PriceModalVisible: false,
    priceCompareModalVisible: false,
    shoppingMode: false,
    locationModalVisible: false,
    location: "",
    serviceText: "",
    priceText: 0,
    totalPrice: 0,
    priceKeyToSubmit: "",
    latitude: null,
    error: null,
    longitude: null,
  }

  render(){

    return (
      // main container
        <View style={styles.mainContainer}>

          <View style={styles.navBarContainer}>
            <TouchableOpacity
             style={styles.navBarBackOpacity}
             onPress={() => Actions.pop()}
            >
              <Icon name="chevron-left" size={48} color="white" />
            </TouchableOpacity>

            <Image style={styles.navBarLogo} source={require('../Images/tiny-logo.png')} />

            <ModalDropdown
            ref="dropdown1"
             style={styles.mainNavBarServicesOpacity}
             dropdownStyle={styles.mainNavBarServicesDropdown}
             dropdownTextStyle={styles.mainNavBarServicesText}
             onSelect={(index,value) => this._handleDropdown(index,value)}
             options={['Price Comparisons', 'Shopping Mode', 'Delete List']}
             animated={false}
             >
              <Icon name="bars" size={48} color='white' />
             </ModalDropdown>
          </View>

          <View style={styles.newItemInputContainer}>
            <TextInput style={styles.newItemInput} placeholder="Enter Item"
             onChangeText={(noteText) => this.setState({noteText})} value={this.state.noteText}
             onSubmitEditing={this.addItem.bind(this)}
             placeholderTextColor="#424242">
            </TextInput>
          </View>


          <View style={styles.newItemInputSpacer}>
          </View>

          <ScrollView style={styles.scrollContainer}>
            {this.state.noteArray.map((note, key) => {
              return ( <Note key={note['key']} keyval={note['key']} val={note['note']} location={note["loc"]} price={note["price"]} checked={false}
               submittedPrice={() => this.submitPrice(key, note['key'])}
               checkItem={() => this.checkItem(key, note['key']) }
              deleteNote={() => this.deleteNote(key, note['key'])} /> )
            })}
          </ScrollView>
          <View
          style={styles.totalPriceView}>
            <Text
            style={styles.totalPriceFont}>Total Price: ${this.state.totalPrice} At {this.state.location}</Text>
          </View>

           <Modal
            visible={this.state.PriceModalVisible}
            onRequestClose={this.closeModal.bind(this)}
            animationType="slide"
            transparent={true}>
              <View
              style={styles.itemModal} >
              <View style={styles.itemModalInside}>
                  <Text>What was the items price?</Text>
                  <TextInput
                  onChangeText={(priceText) => this.setState({priceText})} value={this.state.priceText}
                  keyboardType='numeric'
                  maxLength={6}>
                  </TextInput>

                  <TouchableHighlight style={styles.Pricebutton}
                  onPress={this.submitPrice.bind(this)} >
                  <Text style={styles.Pricetext}>Submit Price</Text>
                  </TouchableHighlight>
                </View>
              </View>
          </Modal>

          <Modal
           visible={this.state.priceCompareModalVisible}
           onRequestClose={this.closePriceModal.bind(this)}
           animationType="slide"
           transparent={true}>
            <View
            style={styles.itemModal}>
              <View
              style={styles.itemModalInside}>
                <Text>{this.state.serviceText}</Text>
                <ActivityIndicator size="small" color="#00ff00" />
              </View>
            </View>
          </Modal>

          <Modal
          visible={this.state.locationModalVisible}
          onRequestClose={this.closeLocationModal.bind(this)}
          animationType="slide"
          transparent={true}>
            <View
            style={styles.itemModal}>
              <View
              style={styles.itemModalInside}>
                  <Text>Store Not Detected: Please input the name of the store</Text>
                  <TextInput
                  onChangeText={(location) => this.setState({location})}
                  value={this.state.location}></TextInput>
                  <TouchableOpacity
                  onPress={this.submitLocation.bind(this)}><Text>Submit</Text></TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

    );
 }

  /*
   * Add a new item to the list and then in the logic statement commit to database
   * This is called everytime a new node has been added e.g. list item.
   */
  addItem() {
    if (this.state.noteText) {
      this.state.noteArray.unshift( {'note': this.state.noteText, 'price': 0});
      this.setState({noteArray: this.state.noteArray});
      this.setState({ noteText: ''});
    }
    if( this.state.noteText ) {
      //Default data in last 3 elements are passed for testing purposes
      var saved = saveItem( this.itemsPathway, this.state.noteText, 0.0, 0, "0-0-0", 1101, this, '' );

      //Save to general items as well
      var generalItemsPath = getItemsPath( this.dbConnection );
      var saveToGeneral = saveItem( generalItemsPath, this.state.noteText, 0.0, 0, "0-0-0", 1101, this, '' );

      //If saving went well then we get the items from the database for an update
      if( saved == 1 ) { getAllItems(this); }
    }
    this.calcTotalPrice();

  }

  saveQuantity(quantity){
    return "";
  }

  updateNotes() {
    this.state.noteArray = [];
    this.calcTotalPrice();
    getAllItems(this);
    this.setState({noteArray: this.state.noteArray});
  }


  processItems(nodes, instance, keys) {
    alert("Returned data");
    instance.nodes = nodes;

    if( nodes.length > 0 && keys.length > 0 ) {
      for( i = 0; i < nodes.length; i++ ) {
        //alert(nodes[i].getName());
        instance.state.noteArray.push({'note': nodes[i].getName()});
        instance.setState({noteArray: instance.state.noteArray});

      }
    }
  }
  /*
   * Function will delete a note from the users current view array and then from the database.
   * Then a refresh is called.
  */
  deleteNote(arrKey, itemKey){
    this.setState({modalVisible: false});
    removeItem(this.itemsPathway, itemKey);
    getAllItems(this);
    this.calcTotalPrice();
  }

  /*
   * Function removes all items from the array, saves changes, then forces the
   * user back to the previous screen, which deletes the list.
  */
  deleteList() {
    this.state.noteArray.map((note, key) => {this.deleteNote(key,note['key'])});
    Actions.pop();
  }

  checkItem(arrKey, itemKey, checkedState){
    //method to move checked list into another scrollview, showing completion
    //may need to set some sort of"checked" value for rendering from db
    if(!checkedState){
      if(this.state.shoppingMode){
        this.openModal(itemKey);
      }
      var checkedItem = this.state.noteArray.splice(arrKey, 1)
      console.log(checkedItem);
      this.state.noteArray.push(checkedItem[0])
      this.setState({noteArray:this.state.noteArray});
      this.setState({checkedNoteArray:this.state.checkedNoteArray});
      return true;
    }
    else{
      return false;
    }

  }

  openModal(itemKey){
    //alert(itemKey);
    this.setState({PriceModalVisible: true});

    //really bad way of doing this, but setting a temporary state for the itemkey referece to update price for
    //since I cannot figure out a better way to pass that key in
    this.setState({priceKeyToSubmit: itemKey});
  }

  closeModal(){
    this.setState({PriceModalVisible: false});
  }

  submitPrice(nodes){
    itemKey = this.state.priceKeyToSubmit;
    //alert(this.state.priceText);
    //access the nodes and add the price into it
    for(i = 0; i < this.state.noteArray.length; i++){
      if(this.state.noteArray[i].key == itemKey){
        //set this items price
        //Save item to the store path
        var name = this.state.noteArray[i].note;
        var thisKey = saveItemToStore(this.dbConnection,
                        this.state.storePath, 
                        itemKey, 
                        0,
                        this.state.noteArray[i].note,
                        parseFloat(this.state.priceText));
        updateItem(this.itemsPathway,
                   name,
                   parseFloat(this.state.priceText),
                   0,
                   0,
                   0,
                   this,
                   true,
                   itemKey);
        this.addItem();
        this.closeModal();
        return 1;
      }
    }
  }

  _handleDropdown(index,value){
    if(value == "Delete List"){
      this.deleteList();
    }
    if(value == "Price Comparisons"){
      this.setState({serviceText: "Finding stores near you..."});
      this.setState({priceCompareModalVisible:true});
      Actions.priceCompare({
        title: this.title, itemspath: this.itemsPathway,
        userNum: this.userNum, firebase: this.firebase,
        listName: this.listName,
        dbConnection: this.dbConnection});

    }
    if(value == "Shopping Mode"){
      this.refs.dropdown1.select(-1);
      var lat = 0;
      var long  = 0;
      //beginning to call the current position, and test that against firebase values
      this.setState({shoppingMode: true});
      this.setState({serviceText: "Turning Shopping Mode on and detecting current store."});
      this.setState({priceCompareModalVisible:true});

      console.log('Getting Users position')
      navigator.geolocation.getCurrentPosition(
          position => {
            console.log('POSITION NETWORK OKAY', position) //success getting position
            lat = position.coords.latitude;
            long = position.coords.longitude;

            console.log(lat, long);
            //alert(lat);
            //alert(long);
            this.setState({latitude: lat, longitude: long});
            var storeRef = this.dbConnection.ref('stores/');

            //access stores
            storeRef.on('value',function(snapshot) {
              var distance = 0;
              var storeVal = 0;
              var snaplength = 0;
              var snap = snapshot.val();
              var jsonElements = JSON.parse( JSON.stringify(snap));

              //loop through stores and find one within distance


              for(var key in jsonElements){

                distance = getDistance(lat, long, snap[key].latitude, snap[key].longitude);
                console.log("HHHH");
                //if distance is less than 2 miles to a registered store
                if(distance <= 0.4023){
                  this.setState({priceCompareModalVisible:false});
                  this.setState({locationModalVisible: false});
                  Alert.alert(
                    "Are you at ", snap[key].Name,
                [
                  {text: 'No'},
                  {text: 'Yes'},
                ]);
                  //store is found and that is the store we are at
                  this.setState({location: snap[key].Name});

                  //save storeRef as path for pushing items and their prices to
                  this.setState({storePath: 'stores/' + key +  '/' });
                  this.loadItemPrices(key);

                  
                  return ; 

                }

              }
              this.setState({priceCompareModalVisible:false});
              this.setState({locationModalVisible: true});
            }.bind(this));


          },

          error => {
            console.log('ERROR') //Error getting position
            console.log(error)
          },
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maxAge: 0
          }
      )

    }
  }

  closePriceModal(){
    this.setState({priceCompareModalVisible: false});
  }

  calcTotalPrice(){
    var total = 0;
    for (i = 0; i < this.state.noteArray.length; i++){
      total += this.state.noteArray[i].price;
    }
    total = total.toFixed(2);
    this.setState({totalPrice: total});
  }

  submitLocation(){
    this.closeLocationModal();

    getLocation();
    var lat = 0;
    var long = 0;

    console.log('Getting Users position')
    navigator.geolocation.getCurrentPosition(
        position => {
          console.log('POSITION NETWORK OKAY', position) //success getting position
          lat = position.coords.latitude;
          long = position.coords.longitude;

          console.log(lat, long);
          var storeKey1 = submitNewStore(this.dbConnection, this.state.location, lat, long);

        },
        error => {
          console.log('ERROR') //Error getting position
          console.log(error)
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maxAge: 0
        }
    )

  }

  closeLocationModal(){
    this.setState({locationModalVisible: false});
  }

  saveItemtoStore(){
    saveItem(this.state.storePath,
             )
  }

    
  loadItemPrices(storeKey){
    
      var storeRef = this.dbConnection.ref('stores/' + storeKey + '/items/');

      storeRef.on('value',function(snapshot) {
        var distance = 0;
        var storeVal = 0;
        var snaplength = 0;
        var snap = snapshot.val();
        var jsonElements = JSON.parse( JSON.stringify(snap));
        

        for(var key in jsonElements){
          for(i = 0 ; i < this.state.noteArray.length; i++){
          var name = this.state.noteArray[i].note;
          var helpkey = this.state.noteArray[i].key;

          if(snap[key].itemName == name){
            updateItem(this.itemsPathway,
              name,
              parseFloat(snap[key].itemPrice),
              0,
              0,
              0,
              this,
              true,
              helpkey);
          }
        }
      }
    }.bind(this)); 
    alert("Price loaded for " + this.state.location);
    this.addItem();
    this.updateNotes();
    
  }

}
/*
 * This function will be a callback from the async updater that will
 * listen for changes in the realtime Firebase database.
 * Do NOT call this function unless you adhere to the natural callbackForGetFirebaseItems
 * of this function else no promise this won't break.
*/
export function updateUI( nodes ) {

}
