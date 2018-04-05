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
  removeItem
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

import {getLatitude, GetLongitude} from '../src/geolocation';


export default class MainScreen extends Component{

  constructor(props) {
    super(props)
    this.keys = [];
    this.firebase = this.props.firebaseModule;
    this.dbConnection = this.props.dbConnection;
    this.listName = this.props.listName;
    this.loginType = this.props.loginType;
    this.itemsPathway = getCartPath(this.dbConnection, this.props.userNum, this.props.listName, this.props.loginType);
    getAllItems(this);
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
    noteText: '',
    modalVisible: false,
    PriceModalVisible: false,
    priceCompareModalVisible: false,
    shoppingMode: false,
    locationModalVisible: false,
    location: "",
    serviceText: "",
    priceText: "0",
    totalPrice: 0,
  }

  render(){
    return (
      //creating container and header
        <View style={styles.container}>
          <View style={styles.enter}>

            <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButtons}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>

            <TextInput style={styles.textInput} placeholder="Enter Item"
                onChangeText={(noteText) => this.setState({noteText})} value={this.state.noteText}
               placeholderTextColor="grey" underlineColorAndroid="transparent">
              
            </TextInput>
            <ModalDropdown 
            defaultValue="Services"
            onSelect={(index,value) => this._handleDropdown(index,value)}
            animated={true}
            options ={['Price Comparisons', 'Shopping Mode']}/>

          </View>

          <ScrollView style={styles.scrollContainer}>
            {this.state.noteArray.map((note, key) => {
              return ( <Note key={note['key']} keyval={note['key']} val={note['note']} location={note['loc']} price={note['price']} checked={false} 
               submittedPrice={() => this.submitPrice()}
               checkItem={() => this.checkItem(key, note['key']) }
              deleteNote={() => this.deleteNote(key, note['key'])} /> )
            })}
          </ScrollView>
          <View
          style={styles.totalPriceView}>
            <Text
            style={styles.fontTotalPrice}>Total Price: ${this.state.totalPrice}</Text>
          </View>

           <Modal
            visible={this.state.PriceModalVisible}
            onRequestClose={this.closeModal.bind(this)}
            animationType="slide"
            transparent={true}>
              <View
              style={styles.modal} >
              <View style={styles.modalInside}>
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
            style={styles.modal}>
              <View
              style={styles.modalInside}>
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
            style={styles.modal}>
              <View
              style={styles.modalInside}>
                  <Text>Please input the name of the store</Text>
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
  addNote() {
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
    getAllItems(this);
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

  checkItem(arrKey, itemKey, checkedState){
    //method to move checked list into another scrollview, showing completion
    //may need to set some sort of"checked" value for rendering from db
    if(!checkedState){
      if(this.state.shoppingMode){
        this.openModal();
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

  openModal(){
    this.setState({PriceModalVisible: true});
  }

  closeModal(){
    this.setState({PriceModalVisible: false})
  }

  submitPrice(){
    this.setState({PriceModalVisible:false})
    return this.state.priceText;
  }

  _handleDropdown(index,value){
    if(value == "Price Comparisons"){
      this.setState({serviceText: "Finding stores near you..."});
      this.setState({priceCompareModalVisible:true});
    }
    if(value == "Shopping Mode"){
      if(this.state.location == ""){
          this.setState({locationModalVisible: true});
      }
      else{
        this.setState({serviceText: "Turning Shopping Mode on and detecting current store."});
        this.setState({priceCompareModalVisible:true});
        this.setState({shoppingMode: true});
        //setTimeout(this.closePriceModal, 5000);
      }
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
    this.setState({totalPrice: total});
  }

  submitLocation(){
    var lat = getLatitude(this);
    var long  = getLongitude(this);
    //some other stuff
    this.closeLocationModal();
    
  }

  closeLocationModal(){
    this.setState({locationModalVisible: false});
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



const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  header: {
    backgroundColor: '#023f0d',
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
    backgroundColor: "#ffffff",
    flex: 1,
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
  CheckedList : {
    flex:1,
    marginBottom: 100,
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ee6e73',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  checkedItem: {
    borderTopColor:"#006064",
    height: 200,
    borderTopWidth: StyleSheet.hairlineWidth,
    flex: 1,
    marginBottom: 50,
    color: '#a9a9a9',
  },
  modal :{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    padding: 10
  },
  modalInside: {
    borderRadius: 5,
    width: 150,
    height: 150,
    backgroundColor: 'white',
    shadowOpacity: 1.0,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#ddd'

},
Pricebutton :{
  flex: 1,
  flexDirection: 'row',
  borderRadius: 4,
  borderColor: '#ddd',
  borderWidth: 2,

},
Pricetext: {
  fontSize: 20,
  justifyContent: 'center',
},
totalPriceView: {
  height: 40,
  borderColor: '#ddd',
  borderTopWidth:2,
},
fontTotalPrice: {
  fontSize: 20,
}


});
