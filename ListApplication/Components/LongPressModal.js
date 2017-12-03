import React, { Component } from 'react';
import { Modal, Text, View, TouchableHighlight, Button, StyleSheet, TextInput } from 'react-native';


//modal class for asking if the user wants to edit or delete and item

export default class ListApplication extends Component {

    state = { 
        modalVisible: false
    };

    //method to set the modal visible
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        
        return (
                <Modal
                key={this.props.keyval}
                animationType="slide"
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={this.props.closeModal}>
                <View 
                style={styles.modal}>
                <View style={styles.modalInside}>
                    <Text style={styles.header}>
                        {this.props.val.note}
                    </Text>
                    <Text>Price</Text>
                    <TextInput keyboardType={'numeric'} placeholder="0.00"></TextInput>
                    <Text>Quantity</Text>
                    <TextInput keyboardType={'numeric'} placeholder="0"></TextInput>
                    <TouchableHighlight><Text>Save</Text></TouchableHighlight>
                    <TouchableHighlight onPress={() => {this.props.closeModal}}><Text>Exit</Text></TouchableHighlight>
                    <TouchableHighlight onPress={() => {this.props.deleteNote}}><Text>Delete</Text></TouchableHighlight>
                </View>    
                </View>
                </Modal>
        );
    }

}

const styles = StyleSheet.create({
    header : {
        fontSize: 24,
        backgroundColor: '#1de9b6',
        borderRadius: 5,
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
        width: 300,
        height: 300,
        backgroundColor: 'white',
        shadowOpacity: 1.0,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: '#ddd'
        
    }
})