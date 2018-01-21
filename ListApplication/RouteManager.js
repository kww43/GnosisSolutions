import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Login from './Screens/login';
import MainScreen from './Screens/mainScreen';

export default class RouteManager extends Component{
  render() {
    return(
      <Router>
        <Stack key="root">
          <Scene key="login" component={Login} title="Login"/>
          <Scene key="main" component={MainScreen} title="Shopping Cart"/>
        </Stack>
      </Router>
    );
  }
}
