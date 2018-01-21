import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Login from './Screens/login';
import MainScreen from './Screens/mainScreen';
import ListSelector from './Screens/listSelector';

export default class RouteManager extends Component{
  render() {
    return(
      <Router>
        <Stack key="root">
          <Scene key="login" component={Login} title="Login"/>
          <Scene key="listSelector" component={ListSelector} title="List Selector" />
          <Scene key="main" component={MainScreen} title="Shopping Cart"/>
        </Stack>
      </Router>
    );
  }
}
