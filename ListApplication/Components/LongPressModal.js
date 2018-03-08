import React, { Component } from 'react';
import { Modal, Text, View, TouchableHighlight, Button, StyleSheet, TextInput } from 'react-native';


//modal class for asking if the user wants to edit or delete and item

export default class MainScreen extends Component {

    state = {
        modalVisible: false,
        quantity: 0,
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
                        {this.props.val}
                    </Text>
                    <Text>Quantity</Text>
                    <TextInput onChangeText={(quantity) => this.setState({quantity})} keyboardType={'numeric'} placeholder="1"></TextInput>
                    <TouchableHighlight style={styles.button} ><Text style={styles.text}>Save</Text></TouchableHighlight>
                    <TouchableHighlight style={styles.button} onPress={this.props.deleteNote}><Text   style={styles.text} >Delete</Text></TouchableHighlight>
                    <TouchableHighlight style={styles.button} onPress={this.props.closeModal}><Text   style={styles.text} >Exit</Text></TouchableHighlight>
                </View>
                </View>
                </Modal>
        );
    }
    saveQuantity(){

    }
}

const styles = StyleSheet.create({
    header : {
        fontSize: 24,
        backgroundColor: '#023f0d',
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

    },
    button :{
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        borderColor: '#ddd',
        borderWidth: 2,

    },
    text: {
        fontSize: 20,
        justifyContent: 'center',
    }
})
