import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Button,
  Navigator,
  Modal,
  ScrollView
} from 'react-native';

import {
  saveItem,
  getAllItems,
  removeItem,
  getListPath
} from '../src/databaseController';

import { Actions } from 'react-native-router-flux';


export default class ListSelector extends Component {

  constructor(props) {
    super(props)
    this.saveUserID = this.props.userNum;
    this.firebase = this.props.firebaseModule;
    this.dbConnection = this.props.dbConnection;
    this.loginType = this.props.loginType;
    console.log("HI" + this.loginType);
    this.itemsPathway = getListPath( this.dbConnection, this.saveUserID, this.loginType );
    getAllItems(this);
    this.pressed = false;
  }
  state = {
    ModalVisible: false,
    listArray: [{'list' : 'test'}, {'list':'help'}],
    listText: '',
    noteArray: [],
    checkedNoteArray: [],
    noteText: '',
    counter: 0,
  }

  /*
   * View display to the user
  */
  render() {
    return (
      <View
      style={styles.container}>

        <ScrollView
        style={styles.scrollContainer}>
          {this.state.noteArray.map((list, key) => {
            return (<TouchableOpacity key={list['key']}  onPress={this._usePrevList.bind(this, list['key'])}>
            <Text style={styles.listText}>{list['key']}</Text></TouchableOpacity>);
          })}
        </ScrollView>

        <TouchableOpacity style={styles.floatingButton}
        onPress={() => this.setState({ModalVisible:true})} >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        <Modal
          visible={this.state.ModalVisible}
          onRequestClose={this._closeModal.bind(this)}>
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>

              <TextInput
                placeholder="Enter List Title"
                onChangeText={(listText) => this.setState({listText}) }>
              </TextInput>
              <Button
                onPress={this._createNewList.bind(this, this.state.listText)}
                title="Start Adding Items!"
                value={this.state.listText}
                placeholderTextColor="grey" >
              </Button>

            </View>
         </View>
        </Modal>

      </View>
    );
  }

  _createNewList(data, listNamed) {
    //Check to make sure user enters a name for a list instead of blank.
    if ( !listNamed ) {
      alert("Please fill out the list name.");
    }
    else {
      //Update local data for list of lists
      this.setState({ModalVisible: false});
      this.state.listArray.push({'list': this.state.listText});
      this.setState({listArray: this.state.listArray});
      this.setState({listText: ''});

      //Navigate to next page.
      Actions.main({userNum: this.saveUserID, firebaseModule: this.firebase, dbConnection: this.dbConnection, listName: this.state.listText, loginType: this.loginType});
    }

  }

  _usePrevList( instance, listData ) {
    console.log(instance);
    //Just navigate to next page since we didn't create anything new.
    Actions.main({userNum: this.saveUserID, firebaseModule: this.firebase, dbConnection: this.dbConnection, listName: instance, loginType: this.loginType});
  }

  _openModal(){
    this.setState({ModalVisible: true});
  }

  _closeModal(){
    this.setState({ModalVisible: false});
  }



}
const styles = StyleSheet.create({
  container: {
   backgroundColor: '#1de9b6',
   flex: 1,

 },
 button: {
   width: 300,
   backgroundColor: '#3B5998',
   borderRadius: 25,
   marginVertical: 10,
   paddingVertical: 16,
   alignItems: 'center'
 },
 scrollContainer: {
  flex: 2,
},

 buttonTxt: {
   fontSize: 20,
   color: "#ffffff",
 },
 scrollContainer: {
  flex: 2,
 },
 addListButton: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: '#00b8d4',
  position: 'absolute',
  bottom: 10,
  right: 10,
 },
 addButtons: {
  backgroundColor: '#00b8d4',
  width: 30,
  height: 30,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 0,
  borderRadius: 2,
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 3
  },
  shadowRadius: 5,
  shadowOpacity: 1.0
},
addButtonText: {
  fontSize: 24,
},
modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'rgba(255,255,255,0.5)',
  },
  innerContainer: {
    alignItems: 'center',
  },
  floatingButton : {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00b8d4',
    position: 'absolute',
    alignItems: 'center',
    bottom: 10,
    right: 10,
  },
  listItem: {
    position: 'relative',
    padding: 20,
    paddingRight: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listText: {
    fontSize: 24,
    backgroundColor:'#e0f2f1'
  }

});
