import React, { Component } from 'react';

import { checkMetaMask } from '../helpers/eth';
import Metamask from './metamask/Metamask';
import Register from './register/Register';

import './App.less';

export default class App extends Component {
  render() {
    const { screen } = this.props;

    const status = checkMetaMask();

    let content;
    console.log(screen);

    if (status !== 'okMetamask') {
      content = <Metamask status={status} />
    } else {
      switch (screen) {
        case 'register-screen':
          content = <Register />
          break;

        default:
          break;
      }
    }

    return (
      <div className="app screen flex">
        {content}
      </div>
    );
  }
};
