import React, { Component } from 'react';


import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  TextInput,
} from 'react-native';

import {CheckBox} from 'react-native-elements';

import LongPressModal from './LongPressModal'

//use swipeview to try swiping to open details
import SwipeView from 'react-native-swipeview';

import Swipeable from 'react-native-swipeable';




export default class Note extends Component {

  state = {
      checked: this.props.checked,
      modalVisible: false,
      price: this.props.price,
      inputprice: this.props.submittedPrice,
      keyval : this.props.keyval

  }

    //will need to set the buttons to show when swiping left or right
    leftContent = <Text style={styles.checkMark}>checkmark</Text>;

    rightButtons = [
        <View style={styles.rightIcons} ><TouchableOpacity  onPress={this.reRender.bind(this)}><Text>Quantity</Text></TouchableOpacity></View>,
        <View style={styles.rightIcons} ><TouchableOpacity><Text>Price</Text><Text>${this.state.price}</Text></TouchableOpacity></View>,
        <View style={styles.rightIcons} ><Text>Aisle<Text>{this.props.location}</Text></Text></View>,
        <View  ><TouchableHighlight onPress={this.props.deleteNote}><Text style={styles.rightIconsDelete}>Delete</Text></TouchableHighlight></View>

    ];


  render(){

    return (

      //creating container and header
       <Swipeable leftContent ={this.leftContent} rightButtons={this.rightButtons}
       onLeftActionRelease={this.checkState.bind(this)}>
            <TouchableOpacity style={styles.note}>
            <Text style={styles.noteText}>{this.props.val}</Text>
            <CheckBox
                style={styles.box}
                title=''
                checked={this.state.checked}
                checkedIcon = 'check-square-o'
                uncheckedIcon = 'square-o'
                onPress = {this.checkState.bind(this)}
                onIconPress = {this.checkState.bind(this)} />

            <LongPressModal key={this.props.keyval} deleteNote={this.props.deleteNote} closeModal={() => this.closeModal()} keyval = {this.props.keyval} val={this.props.val.note} modalVisible={this.state.modalVisible}  />
        </TouchableOpacity>
        </Swipeable>
    );
  }
    saveQuantity(q) {
      return null;
    }

    checkState(){
        if(!this.state.checked){

            this.state.checked = true;
        }
        else{
            this.state.checked = false;
        }
        this.setState({checked: this.state.checked});

        //execute the check item
        toCheck = this.props.checkItem(this.props.key, this.props.keyval, this.props.checked);
        if(!toCheck){
            this.state.checked = false;
            this.setState({checked:this.state.checked});
        }
    }

    //function for opening the new modal
    openModal(key){
        if (!this.state.modalVisible){
            this.state.modalVisible = true;
        }
            this.setState({modalVisible: true});
    }

    closeModal(){
        this.setState({modalVisible: false});
    }
    reRender(){
        this.forceUpdate();
    }

}

const styles = StyleSheet.create({
    note: {
        position: 'relative',
        padding: 20,
        paddingRight: 0,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        backgroundColor: "#ffffff",
        borderBottomColor: '#ededed',
        borderTopColor: '#ededed',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    noteText: {
        paddingLeft: 20,
        paddingTop: 8,
        borderLeftWidth: 2,
        borderLeftColor: '#006064',
        fontSize: 24,
    },
    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#006064',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10,
    },
    box: {
        paddingRight: 0,
        height: 10,
    },
    noteDeleteText : {

    },
    rightIcons:{
        position: 'relative',
        padding: 0,
        flex:2,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    rightIconsDelete:{
        color: "#d32f2f"
    },
    checkMark :{
        backgroundColor: "#023f0d",
        flex:1
    }

});
