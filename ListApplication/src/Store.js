class Store {
  constructor( uniqueID, storeName, storeLatitude, storeLongitude ) {
    this.uniqueID = uniqueID;
    this.storeName = storeName;
    this.storeLatitude = storeLatitude;
    this.storeLongitude = storeLongitude;

  }

  getUniqueID( ) {
    return this.uniqueID;
  }

  getName( ) {
    return this.storeName;
  }

  getLat( ) {
    return this.storeLatitude;
  }

  getLong( ) {
    return this.storeLongitude;
  }


  setPName( name ) {
    this.storeName = name;
  }

  setLat( lat ) {
    this.storeLatitude = lat;
  }

  setLong( long ) {
    this.storeLongitude = long;
  }

}

export default Store;
