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

import {CheckBox} from 'react-native-elements';

import Note from './Components/Note';

import LongPressModal from './Components/LongPressModal';

export default class ListApplication extends Component {

  //defines initial state
  state = {
    noteArray: [],
    checkedNoteArray: [],
    noteText: '',
    modalVisible: false,
    quantity: 0,
  }


  

  render(){

    //loop notes with map
    let notes = this.state.noteArray.map((val, key) => {
      //return note component and pass props
      return <Note key={key} keyval={key} val={val} openModal={()=>this.openModal(key) } />
    });

    //create view for checked notes from checkednoteArray
    let checkedNotes = this.state.checkedNoteArray.map((val,key) => {
      return <Note key={key} keyval={key} val={val} />
    })

    let modals= this.state.noteArray.map((val, key) => {
      //I want to bind each note with its own modal with corresponding information about this item
      return <LongPressModal key={key} keyval={key} val={val} modalVisible={this.state.modalVisible} closeModal={() => this.closeModal(key)} deleteNote={() => this.deleteNote(key)}/>
    });

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
            {modals}
          </ScrollView>

        </View>
    );  
  }

  //component methods
  addNote() {
    if (this.state.noteText) {
      this.state.noteArray.push( {'note': this.state.noteText, 'quantity' : 0});
      this.setState({noteArray: this.state.noteArray});
      this.setState({ noteText: ''});
    }
  }

  //function for opening the new modal
  openModal(key){
    if (!this.state.modalVisible){
      this.state.modalVisible = true;
    }
    this.setState({modalVisible: true});
  }

  closeModal(key){
    this.setState({modalVisible: false});
  }

  deleteNote(key){
    var item = this.state.noteArray.splice(key, 1);
    alert("Deleting ");
    this.setState({modalVisible: false});
    this.setState({noteArray: this.state.noteArray});
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