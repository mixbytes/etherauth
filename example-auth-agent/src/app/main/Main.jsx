import React, { PureComponent } from 'react';

import store from '../../store/store';
import { changeScreen } from '../AppActions';

import './Main.less';

export default class Main extends PureComponent {
    onClick = (screen) => {
        return () => store.dispatch(changeScreen(screen))
    }

    render() {
        return (
            <div className="main-screen form">
                <button
                    className="btn-default"
                    onClick={this.onClick('register-screen')}>
                    Registration
                </button>
                <button
                    className="btn-default"
                    onClick={this.onClick('admin-screen')}>
                    Administration
                </button>
            </div>
        );
    }
};