import Fire, { app, database } from 'firebase';

import AppConfig from './AppConfig'
import Node from './Node';

export function getFirebaseConnection( ) {
  const Config = AppConfig.getConfig();
  const Firebase = Fire.initializeApp(Config.firebaseConfig);
  return Firebase;
}

export function getDatabaseConnection( Firebase ) {
  return Firebase.database();
}

export function getItemsPath( dbRef ) {
  return dbRef.ref('items');
}

export function getCartPath( dbRef, userToken ) {

}


export function saveItem( itemsRef, name, price, quantity, locationString, uniqueID ) {
  itemsRef.push({
    id: uniqueID,
    name: name,
    price: price,
    quantity: quantity,
    shelf_location: locationString,
  });
  return 1;
}

export function removeItem( itemsRef, keyToRemove ) {
  itemsRef.child(keyToRemove).remove();
}
/*
 * Input: Item path to the database in this case it is just 'items'.
 * Output: Node array of items from firebase inside the variable nodes.
 * For: Importing data from Firebase.
*/
export function getAllItems( itemsPath ) {
  var nodes = [];
  var count = 0;
  var val = new Promise(function(resolve, reject) {
    itemsPath.once('value', function(snapshot) {
    var snap = snapshot.val();
    var jsonElements = JSON.parse( JSON.stringify(snap) );
    var getKeys = [];
    //alert(JSON.stringify(snap));
    //Get keys so that we can pull out data per object
    for(var key in jsonElements) {
      getKeys.push(key);
      //Proof of parsing
      var tempNode = new Node( snap[key].id, snap[key].name );
      tempNode.setPrice( snap[key].price );
      tempNode.setQuantity( snap[key].quantity );
      //alert("Data Proof: " + snap[key].name);
      nodes[count++] = tempNode;
    }

  }).then(function(nodes, getKeys){ callbackForGetFirebaseItems(nodes, getKeys); });
});
  return nodes;
}

function callbackForGetFirebaseItems( nodesArr, getKeys ) {
  //alert("madeit");
  return nodesArr;
}

export function deleteItem( itemsRef ) {

}

export function saveItemToCart( ref,  name, price, quantity, locationString ) {

}
