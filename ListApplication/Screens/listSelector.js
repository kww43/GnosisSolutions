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

import { Actions } from 'react-native-router-flux';


export default class ListSelector extends Component {
  constructor(props) {
    super(props)
    this.saveUserID = this.props.userNum;
    this.firebase = this.props.firebaseModule;
    this.dbConnection = this.props.dbConnection;
    this.pressed = false;
  }
  state = {
    ModalVisible: false,
    listArray: [{'list' : 'test'}, {'list':'help'}],
    listText: '',

  }
  //Right now this shows how data can be accessed when passed using the current framework.
  render() {
    return (
      <View>
        <Text>Welcome your Facebook UserID is: {this.saveUserID}</Text>
        <Text>TESTING</Text>
        <ScrollView
         >
          {this.state.listArray.map((list, key) => {
            return (<Text key={list['key']} keyval={['key']}>{list['list']}</Text>)
          })}
        </ScrollView>
        <TouchableOpacity
        style={styles.addListButton}
        onPress={this._openModal.bind(this)} >
          <Text style={styles.buttonTxt} >+</Text>
        </TouchableOpacity>
        <Modal
        visible={this.state.ModalVisible}
        onRequestClose={this._closeModal.bind(this)}>
          <TextInput
          placeholder="Enter List Title">
          </TextInput>
          <Button
          onPress={this._createNewList.bind(this)}
          title="Start Adding Items!"
          onChangeText={(listText) => this.setState({listText}) }
          value={this.state.listText}
          placeholderTextColor="grey" >
            </Button>

        </Modal>
        
      </View>
    );
  }

  _handleTransfer(data) {
    //Set the pressed flag
    this.pressed = true;
    /*
     * This command will go to the class defined under key: main in the router
     * as well as pass the user data we got from Facebook.
    */
    if(this.pressed != false) {
      Actions.main({userNum: this.saveUserID, firebaseModule: this.firebase, dbConnection: this.dbConnection});
    }

  }

  _createNewList(data){
    this.setState({ModalVisible: false});
    this.state.listArray.push({'list': this.state.listText});
    this.setState({listArray: this.state.listArray});
    this.setState({listText: ''});
    
    Actions.main({userNum: this.saveUserID, firebaseModule: this.firebase, dbConnection: this.dbConnection});
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
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 },
 button: {
   width: 300,
   backgroundColor: '#3B5998',
   borderRadius: 25,
   marginVertical: 10,
   paddingVertical: 16,
   alignItems: 'center'
 },

 buttonTxt: {
   fontSize: 20,
   color: "#ffffff",
 },
 scrollContainer: {
  flex: 1,
  marginBottom: 100,
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

});
