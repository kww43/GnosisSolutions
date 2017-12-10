import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
} from 'react-native';

import { getFirebaseConnection, getDatabaseConnection, getItemsPath, saveItem, getAllItems } from './src/databaseController';

import {CheckBox} from 'react-native-elements';

import Note from './Components/Note';

import LongPressModal from './Components/LongPressModal';

import Node from './src/Node.js';

export default class ListApplication extends Component {

  constructor(props) {
    super(props)
    this.keys = [];
    this.firebase = getFirebaseConnection();
    this.dbConnection = getDatabaseConnection(this.firebase);
    this.itemsPathway = getItemsPath(this.dbConnection);
    //alert(this.itemsPathway);
    getAllItems(this);
    this.nodes = [];
  }

  //defines initial state
  state = {
    noteArray: [],
    checkedNoteArray: [],
    noteText: '',
    modalVisible: false,
  }

  myCallback = (dataFromChild) => {
    []; //here we'll use th data from child
  }



  render(){
    //loop notes with map
    let notes = this.state.noteArray.map((val, key) => {
      //return note component and pass props
      return <Note key={key} keyval={key} val={val} deleteNote={() => this.deleteNote(key)} />
    });

    //create view for checked notes from checkednoteArray
    let checkedNotes = this.state.checkedNoteArray.map((val,key) => {
      return <Note key={key} keyval={key} val={val} />
    })


    // let modals= this.state.noteArray.map((val, key) => {
    //   //I want to bind each note with its own modal with corresponding information about this item
    //   return <LongPressModal key={key} keyval={key} val={val} saveQuantity = {this.myCallBack} modalVisible={this.state.modalVisible} closeModal={() => this.closeModal(key)} deleteNote={() => this.deleteNote(key)}/>
    // });

    //enter popup modal for details about each item


    return (
      //creating container and header
        <View style={styles.container}>
          <View style={styles.header}>

            <Text style={styles.headerText}>Your Grocery List</Text>

          </View>
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
            {notes}
            {checkedNotes}
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
      var saved = saveItem( this.itemsPathway, this.state.noteText, 0.0, 0, "0-0-0", 1101);
      if( saved == 1 ) { getAllItems(this); }
    }

  }

  updateNotes() {
    this.state.noteArray = [];
    getAllItems(this);
  }


  processItems(nodes, instance, keys) {
    alert("Returned data");
    instance.nodes = nodes;

    alert(nodes.length);
    if( nodes.length > 0 && keys.length > 0 ) {
      for( i = 0; i < nodes.length; i++ ) {
        //alert(nodes[i].getName());
        instance.state.noteArray.push({'note': nodes[i].getName()});
        instance.setState({noteArray: instance.state.noteArray});

      }
    }
  }

  deleteNote(key){
    var item = this.state.noteArray.splice(key, 1);
    alert("Deleting " + this.state.noteArray.find(key).note);
    this.setState({modalVisible: false});
    this.setState({noteArray: this.state.noteArray});
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

AppRegistry.registerComponent('ListApplication', () => ListApplication);
