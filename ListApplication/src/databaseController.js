/*
 * File: databaseController.js
 * Purpose: To provide an API interface that is simplier for Firebase actions on the fly.
 * Author: Christopher Simcox
 * Usage: JS based and is ran by importing functions from this file into a Componet class.
*/
import Fire, { app, database } from 'firebase';

import AppConfig from './AppConfig'
import Node from './Node';

//This will initialize the firebase connection with the APPConfig defined in './AppConfig.js' file.
export function getFirebaseConnection( ) {
  const Config = AppConfig.getConfig();
  const Firebase = Fire.initializeApp(Config.firebaseConfig);
  return Firebase;
}

//Function to return the firebase database url base path.
export function getDatabaseConnection( Firebase ) {
  return Firebase.database();
}

//Sets the new dbPath to go to items level of firebase database
export function getItemsPath( dbRef ) {
  return dbRef.ref('items');
}

//Sets the new dbPath to go to the cart path of individual users in firebase database
export function getCartPath( dbRef, userToken ) {
  var path = 'users/' + userToken + "/";
  return dbRef.ref(path);
}

//Function that will save any item entered in through app
export function saveItem( itemsRef, name, price, quantity, locationString, uniqueID, instance ) {
  var thisKey = itemsRef.push({
    id: uniqueID,
    name: name,
    price: price,
    quantity: quantity,
    shelf_location: locationString,
  });
  //Make a new node to encapsulate the data
  var returnNode = new Node( thisKey, name );
  returnNode.setPrice( price );
  returnNode.setQuantity( quantity );
  //Push key and data
  instance.keys.push( thisKey );
  instance.nodes.push( returnNode );
  return 1;
}

//Removes any item from the firebase database given the correct path
export function removeItem( itemsRef, keyToRemove ) {
  itemsRef.child(keyToRemove).remove();
  return 1;
}

/*
 * Input: Item path to the database in this case it is just 'items'.
 * Output: Node array of items from firebase inside the variable nodes.
 * For: Importing all data from Firebase path.
*/
export function getAllItems( instance ) {
  var nodes = [];
  var count = 0;
  var val = new Promise(function(resolve, reject) {
    //alert(itemsPath);
    instance.itemsPathway.on('value', function(snapshot) {
      var snap = snapshot.val();
      var jsonElements = JSON.parse( JSON.stringify(snap) );
      var getKeys = [];

      //Get keys so that we can pull out data per object
      for(var key in jsonElements) {
        getKeys.push(key);
        //Proof of parsing
        var tempNode = new Node( key, snap[key].name );
        tempNode.setPrice( snap[key].price );
        tempNode.setQuantity( snap[key].quantity );
        //alert("Data Proof: " + snap[key].name);
        nodes.push(tempNode);
      }

      instance.nodes = nodes;
      instance.keys = getKeys;
      instance.state.noteArray = [];
      if( nodes.length > 0 && getKeys.length > 0 ) {
        for( i = 0; i < nodes.length; i++ ) {
          instance.state.noteArray.push({'note': nodes[i].getName(), 'key': getKeys[i]});
          instance.setState({noteArray: instance.state.noteArray});
        }
      }
    });
  });
}
