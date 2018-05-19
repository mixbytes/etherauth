import React, { PureComponent } from 'react';

import './Register.less';

export default class Register extends PureComponent {
    render() {
        return (
            <div className="register">
                <input
                    type="text"
                    required={true}
                />
                <button>
                    Register
                </button>
            </div>
        );
    }
};