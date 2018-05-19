import React, { PureComponent } from 'react';

import metamaskSvg from '../../assets/img/metamask.svg';

import './Metamask.less';

export default class Metamask extends PureComponent {
    render() {
        const { status } = this.props;

        let content;

        switch (status) {
            case 'unlockMetamask':
                content = <p>Please, unlock metamask</p>
                break;
            case 'noMetamask':
                content = (
                    <div>
                        <p>Please, install metamask</p>
                        <a
                            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target="_blanc">
                            <button>Install</button>
                        </a>
                    </div>
                );
                break;
            default:
                content = <p>Hmmmmmm, some problem!</p>
                break;
        }
        return (
            <div className="metamask flex">
                <div className="wrapper flex-v">
                    <img className="firefox" src={metamaskSvg} alt="metamask" />
                    {content}

                </div>
            </div>
        );
    }
};