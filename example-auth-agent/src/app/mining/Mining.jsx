import React, { PureComponent } from 'react';

import loaderSvg from '../common/loader2.svg';

import './Mining.less';

export default class Mining extends PureComponent {
    render() {
        return (
            <div className="mining-screen form flex">
                <p>Please wait</p>
                <p>mining process...</p>
                <img src={loaderSvg} alt="loader" />
            </div>
        );
    }
};