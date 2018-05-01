/*
 * File: databaseController.js
 * Purpose: To provide an API interface that is simplier for Firebase actions on the fly.
 * Author: Christopher Simcox
 * Usage: JS based and is ran by importing functions from this file into a Componet class.
*/
import Fire, { app, database } from 'firebase';

import AppConfig from './AppConfig'
import Node from './Node';
import Store from './Store';

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
//This will get exactly one directory above getCartPath so we can grab the names of the lists
export function getListPath( dbRef, userToken, loginType ) {
  var path = "users/" + loginType + "/" + userToken + "/";
  return dbRef.ref(path);
}
//Sets the new dbPath to go to the cart path of individual users in firebase database
export function getCartPath( dbRef, userToken, listName, loginType ) {
  var path = 'users/' + loginType + "/" + userToken + "/" + listName + "/";
  return dbRef.ref(path);
}

export function getStorePath( dbRef, storeToken ) {
  //Placeholder for getting store path
  var path = 'stores/' + storeToken + "/";
  return dbRef.ref(path);
}

export function getStoresPath( dbRef ) {
  var path = 'stores/';
  return dbRef.ref(path);
}

export function saveStoreData( storeRef, instanceData ) {
  //Placeholder for save function until further details are revealed from development
}

export function submitNewStore(dbRef, storeName, lat, long){
  //get db reference to the stores/ to enter under
  storeRef = dbRef.ref('stores');


  var thisStoreKey = storeRef.push({
    Name: storeName,
    latitude: lat,
    longitude: long,
    items: []
  });


  return thisStoreKey;
}
//Function that will save any item entered in through app
export function saveItem( itemsRef, name, price, quantity, locationString, uniqueID, instance, checked ) {
  if( checked == '' ) {
    var thisKey = itemsRef.push({
      id: uniqueID,
      name: name,
      price: price,
      quantity: quantity,
      shelf_location: locationString,
      checked: 'null',
    });
  }
  else {
    var thisKey = itemsRef.push({
      id: uniqueID,
      name: name,
      price: price,
      quantity: quantity,
      shelf_location: locationString,
      checked: checked,
    });
    return thisKey;
  }

  //Make a new node to encapsulate the data
  var returnNode = new Node( thisKey, name );
  returnNode.setPrice( price );
  returnNode.setQuantity( quantity );
  //Push key and data
  instance.keys.push( thisKey );
  instance.nodes.push( returnNode );
  return 1;
}

export function updateItem( itemsRef, name, price, quantity, locationString, uniqueID, instance, checked, existingKey ) {
  var newItem = itemsRef.child(existingKey).update({
    id: uniqueID,
    name: name,
    price: price,
    quantity: quantity,
    shelf_location: locationString,
    checked: checked,
  });
  //Update UI after this update item
  getAllItems(instance);

  return 1;
}

//Removes any item from the firebase database given the correct path
export function removeItem( path, keyToRemove ) {
  path.child(keyToRemove).remove();
  return 1;
}



/*
 * Input: Instance variable to help facilitate the passing of data to caller
 * Ouput: Array of store item objects
 * For: Getting the array of relevant store objects
*/

export function getAllStores( instance ) {
  var stores = [];
  var counter = 0;

  var getStoreData = new Promise( function( resolve, reject ){
    instance.storePathway.on('value', function( snapshot ) {
      var snap = snapshot.val( );
      var jsonElements = JSON.parse( JSON.stringify( snap ) );
      //Now we have data we can alter
      for( var key in jsonElements ) {

        //Create new Store object
        var currentStore = new Store( key, snap[key].Name, snap[key].latitude, snap[key].longitude );
        //Add this to the callers array that NEEDS TO BE DEFINED AS storesArray in the state variable of the caller.
        stores.push( currentStore );
        instance.state.storesArray.push(currentStore);
      }
      //At this point we now have an array of all stores in the variable stores defined above. Now we pass back to caller
      instance.setState({storesArray: instance.state.storesArray});

    });
  });
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
        tempNode.setLocation( snap[key].shelf_location );
        tempNode.setCheckStatus( snap[key].checked );
        //alert("Data Proof: " + snap[key].name);
        nodes.push(tempNode);
      }

      instance.nodes = nodes;
      instance.keys = getKeys;
      instance.state.noteArray = [];
      if( nodes.length > 0 && getKeys.length > 0 ) {
        for( i = 0; i < nodes.length; i++ ) {
          instance.state.noteArray.push({'note': nodes[i].getName(), 'key': getKeys[i], 'loc': nodes[i].getLocation(), 'price': nodes[i].getPrice()});
        }
        instance.setState({noteArray: instance.state.noteArray});
      }
    });
  });
}
