import Fire, { app, database } from 'firebase';

import AppConfig from './AppConfig'

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

export function getAllItems( itemsPath ) {
  //itemsPath.ref('items');
  itemsPath.on('value', function(snapshot) {
    var snap = snapshot.val();
    var jsonElements = JSON.parse( JSON.stringify(snap) );
    var getKeys = new Array();
    alert(JSON.stringify(snap));
    //Get keys so that we can pull out data per object
    for(var key in jsonElements) {
      getKeys.push(key);
      ///alert(JSON.parse(snap));
    }

  });
}

export function deleteItem( itemsRef ) {

}

export function saveItemToCart( ref,  name, price, quantity, locationString ) {

}
