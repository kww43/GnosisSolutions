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

import {
  getItemsPath,
  saveItem,
  getAllItems,
  getCartPath,
  removeItem
} from '../src/databaseController';

import {CheckBox} from 'react-native-elements';

import Note from '../Components/Note';

import Login from '../Screens/testLogin';

import LoginPage from '../Screens/login';

import LongPressModal from '../Components/LongPressModal';

import Node from '../src/Node.js';

import { Actions } from 'react-native-router-flux';


export default class MainScreen extends Component{

  constructor(props) {
    super(props)
    this.keys = [];
    this.firebase = this.props.firebaseModule;
    this.dbConnection = this.props.dbConnection;
    this.listName = this.props.listName;
    this.itemsPathway = getCartPath(this.dbConnection, this.props.userNum, this.props.listName);
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

          </View>

          <ScrollView style={styles.scrollContainer}>
            {this.state.noteArray.map((note, key) => {
              return ( <Note key={note['key']} keyval={note['key']} val={note['note']} deleteNote={() => this.deleteNote(key, note['key'])} /> )
            })}
          </ScrollView>

        </View>
    );
 }

  //component methods
  addNote() {
    if (this.state.noteText) {
      this.state.noteArray.push( {'note': this.state.noteText});
      this.setState({noteArray: this.state.noteArray});
      this.setState({ noteText: ''});
    }
    if( this.state.noteText ) {
      //Default data in last 3 elements are passed for testing purposes
      var saved = saveItem( this.itemsPathway, this.state.noteText, 0.0, 0, "0-0-0", 1101, this, '' );
      if( saved == 1 ) { getAllItems(this); }
    }

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

  deleteNote(arrKey, itemKey){
    this.setState({modalVisible: false});
    removeItem(this.itemsPathway, itemKey);
    getAllItems(this);
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
