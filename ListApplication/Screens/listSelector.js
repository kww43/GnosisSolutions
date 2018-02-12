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
    this.listName = "";
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
        <ScrollView>
          {this.state.listArray.map((list, key) => {
            return (<TouchableOpacity style={styles.listItem} onPress={this._usePrevList.bind(this, list)}>
            <Text style={styles.addButtonText}>{list['list']}</Text></TouchableOpacity>);
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

  _createNewList(data, listNamed){
    //Update local data for list of lists
    this.setState({ModalVisible: false});
    this.state.listArray.push({'list': this.state.listText});
    this.setState({listArray: this.state.listArray});
    this.setState({listText: ''});

    //TODO: Sync to server the list of lists data
    //alert(listNamed);
    //Navigate to next page.
    Actions.main({userNum: this.saveUserID, firebaseModule: this.firebase, dbConnection: this.dbConnection, listName: this.state.listText});
  }

  _usePrevList( instance, listData ) {
    //Just navigate to next page since we didn't create anything new.
    Actions.main({userNum: this.saveUserID, firebaseModule: this.firebase, dbConnection: this.dbConnection, listName: listData['list']});
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
  }

});
