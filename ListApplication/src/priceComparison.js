import AppConfig from './AppConfig'
import Node from './Node';
import { getDistance, getLatitude, getLongitude } from './geolocation'

// Finds two stores nearby the users
export function findTwoStores(itemName)
{
  var store1 = findStoreNearby();
  var store2 = findStoreNearby(store1);

  var bestStore = compareStores(store1, store2);

  return bestStore;
}

//Finds a store nearby the user (within 3 km)
export function findStoreNearby(found = null)
{
  var userLat = getLatitude();
  var userLong = getLongitude();

  //Grab list of stores from database

  var iterate = 0;
  while(iterate < 10) //Iterate through list of stores
  {
    //Grab next store in list             id lat long
    var store = new Store("Name of store", 1, 1, 1);

    //Get distance between user and store
    var distance = getDistance(userLat, userLong, store.getLat(), store.getLong());

    if(distance <= 3 && found != store.getID)
    {
      return store;
    }

    iterate++;
  }

  // No stores found return null
  return null;
}

export function compareStores(item, store1, store2)
{
  var fromStore1 = store1.getItemPrice(item);
  var fromStore2 = store2.getItemPrice(item);

  if(fromStore1 > fromStore2)
  {
    return store1;
  }

  else
  {
    return store2;
  }
}


class Store
{
  constructor(name, id, lat, long)
  {
    this.name = name;
    this.id = id;
    this.lat = lat;
    this.long = long;
  }

  getName()
  {
    return this.name;
  }

  getID()
  {
    return this.id;
  }

  getLat()
  {
    return this.lat;
  }

  getLong()
  {
    return this.long;
  }

  getID()
  {
    return this.id;
  }

  //Accesses database of items
  getItemPrice(itemName)
  {
    //connect to firebase

    //pull item price from database
    var price = 1.50;

    return price;
  }
}

export default Store;
