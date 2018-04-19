import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Login from './Screens/login';
import MainScreen from './Screens/mainScreen';
import ListSelector from './Screens/listSelector';
import priceCompareScreen from './Screens/priceCompareScreen';

// TODO: import custom nav bar
export default class RouteManager extends Component{

  render() {
    return(
      <Router>
        <Stack key="root">
          <Scene key="login" component={Login} title="Login" hideNavBar={true}/>
          <Scene key="listSelector" component={ListSelector} title="Lists"  hideNavBar={true}/>
          <Scene key="main" component={MainScreen} title="Shopping Cart" hideNavBar={true}/>
          <Scene key="priceCompare" component={priceCompareScreen} title="Price Comparisons"/>
        </Stack>
      </Router>
    );
  }
}
