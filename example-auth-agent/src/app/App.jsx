import React, { Component } from 'react';
import { hot } from 'react-hot-loader'

import { checkMetaMask } from '../helpers/eth';
import LoginForm from './login-form/LoginForm';

import './App.less';

class App extends Component {
  render() {
    let content = <LoginForm/>;

    return (
      <div className="app screen flex">
        {content}
      </div>
    );
  }
};


export default  hot(module) (App);