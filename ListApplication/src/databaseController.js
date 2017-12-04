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


export function saveItem( itemsRef, name, price, quantity, locationString ) {
  itemsRef.push({
    name: name,
    price: price,
    quantity: quantity,
    shelf_location: locationString,
  });
  return 1;
}

export function deleteItem( itemsRef ) {

}

export function saveItemToCart( ref,  name, price, quantity, locationString ) {

}
