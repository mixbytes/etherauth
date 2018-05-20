import React, { Component } from 'react';
import { hot } from 'react-hot-loader'

import { checkMetaMask } from '../helpers/eth';
import LoginForm from './login-form/LoginForm';
import Main from './main/Main';

import './App.less';

class App extends Component {
  render() {
    const { screen, login, isLoginWindow } = this.props;

    return (
      <div className="app screen">
        {isLoginWindow && <LoginForm />}
        <Main login={login} />
      </div>
    );
  }
};


export default hot(module)(App);