import React, { PureComponent } from 'react';
import metamaskPng from '../img/metamask.png';
import arrowSvg from '../img/arrow.svg';

import './UnlockMetamaskPopover.less';

export default class UnlockMetamaskPopover extends PureComponent {
    render() {
        return (
            <div className="unlock-metamask-popover">
                <img className="firefox" src={metamaskPng} alt="metamask" />
            </div>
        );
    }
};