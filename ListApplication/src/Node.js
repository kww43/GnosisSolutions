class Node {
  constructor( uniqueID, nodeName ) {
    this.uniqueID = uniqueID;
    this.nodeName = nodeName;
    this.price = 0.00;
    this.quantity = 0;
  }

  getUniqueID( ) {
    return this.uniqueID;
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

  setName( name ) {
    this.nodeName = name;
  }

  setQuantity( quantity ) {
    this.quantity = quantity;
  }

}

export default Node;
