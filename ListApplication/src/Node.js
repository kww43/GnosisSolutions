class Node {
  constructor( uniqueID, nodeName ) {
    this.uniqueID = uniqueID;
    this.nodeName = nodeName;
    this.price = 0.00;
    this.quantity = 0;
    this.location = "0";
    this.checked = "null";
  }

  getUniqueID( ) {
    return this.uniqueID;
  }

  getCheckedStatus( ) {
    return this.checked;
  }

  getLocation( ) {
    return this.location;
  }

  getName( ) {
    return this.nodeName;
  }

  getPrice( ) {
    return this.price;
  }

  getQuantity( ) {
    return this.quantity;
  }

  setPrice( price ) {
    this.price = price;
  }

  setCheckStatus( status ) {
    this.checked = status;
  }

  setLocation( locationString ) {
    this.location = locationString;
  }

  setName( name ) {
    this.nodeName = name;
  }

  setQuantity( quantity ) {
    this.quantity = quantity;
  }

}

export default Node;
