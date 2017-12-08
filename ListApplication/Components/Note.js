import React, { Component } from 'react';


import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

//use swipeview to try swiping to open details
import SwipeView from 'react-native-swipeview';

import {CheckBox} from 'react-native-elements';


export default class ListApplication extends Component {

  state = {
      checked: false,
  }

  render(){

    return (
      //creating container and header
        <SwipeView key={this.props.keyval} style={styles.note} onSwipedRight={this.props.openModal} renderVisibleContent= { () =>
            <TouchableOpacity style={styles.note}>
            <Text style={styles.noteText}>{this.props.val.note}</Text>
            <CheckBox
                style={styles.box}
                title=''
                checked={this.state.checked}
                checkedIcon = 'check-square-o'
                uncheckedIcon = 'square-o'
                onPress = {this.checkState.bind(this)}
                onIconPress = {this.checkState.bind(this)}
            />
            </TouchableOpacity>}
        />
    );
  }

  checkState(){

    if(!this.state.checked){

        this.state.checked = true;
    }
    else{
        this.state.checked = false;
    }
    this.setState({checked: this.state.checked});
    }
  }



const styles = StyleSheet.create({
    note: {
        position: 'relative',
        padding: 20,
        paddingRight: 0,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    noteText: {
        paddingLeft: 20,
        borderLeftWidth: 2,
        borderLeftColor: '#006064',
        fontSize: 17,
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

    }

});
