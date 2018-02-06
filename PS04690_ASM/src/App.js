/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import{Scene,Router} from 'react-native-router-flux';

import Login from './component/login/Login';
import Register from './component/login/registration';
import Chat from './component/chat/Chat';
import Profile from './component/login/Update';

export default class App extends Component{
  render() {
    return (
      <Router>
      <Scene key="root">
        <Scene key="login" component={Login} title="Login"/>
        <Scene key="register" component={Register} title="Registration"/>
        <Scene key="chat" component={Chat} title="Chat"/>
        <Scene key="profile" component={Profile} title="Update Profile"/>
      </Scene>
    </Router>
    );
  }
}
