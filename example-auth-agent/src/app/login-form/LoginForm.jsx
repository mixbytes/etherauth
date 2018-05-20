import React, { PureComponent } from 'react';

import { web3 } from '../../helpers/eth';
import { ABI, ADDRESS } from '../../constants/constants';
import { setLoginWindow, setLogin } from '../AppActions';
import store from '../../store/store';

import './LoginForm.less';

export default class LoginForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            valide: true,
            error: ''
        };
    }

    onChange = (e) => {
        const { valide, value, error } = this.state;

        if (!valide)

            this.setState({ valide: true })

        if (error !== '')
            this.setState({ error: true })

        this.setState({ value: e.target.value });
    }

    onClick = () => {
        // back!!!!!!!!!!!!!!!!!!!!!!!!!
        const { value, valide, error } = this.state;

        if (value !== '') {
            if (!valide)
                this.setState({ valide: true })

            // check authAddress
            const instance = web3.eth.contract(ABI).at(ADDRESS);

            let result;
            try {
                result = instance['authAddress'].call(value,
                    (error, authAddress) => {
                        if (!error) {
                            // fake send 'secret' string - will be generate
                            // sign
                            if (authAddress === '0x0000000000000000000000000000000000000000') {
                                this.setState({ error: 'User does not exists!' });
                                return;
                            } else if (error !== '') {
                                this.setState({ error: '' });
                            }

                            var message = 'secretstring';

                            let h = web3.sha3(message);

                            web3.eth.sign(authAddress, h,
                                (error, signMsg) => {
                                    if (!error) {
                                        const sig = signMsg.slice(2);
                                        const r = `0x${sig.slice(0, 64)}`;
                                        const s = `0x${sig.slice(64, 128)}`;
                                        const v = `0x${sig.slice(128, 130)}`;

                                        instance['signerAddressRaw'].call(h, v, r, s, (error, res) => {
                                            if (!error) {
                                                if (res === authAddress) {
                                                    store.dispatch(setLogin(value));
                                                    store.dispatch(setLoginWindow(false));
                                                }

                                            } else {
                                                console.log('Error in sign!', error);

                                            }
                                        });
                                    } else {
                                        console.log('Error in sign!');
                                    }
                                })

                        } else {
                            console.log('Error search address');
                        }
                    });
            } catch (error) {
                console.error('global error', error);
            }

        } else {
            this.setState({ valide: false });
        }
    }

    render() {
        const { error } = this.state;

        return (
            <div className="login-form flex">
                <div className="overlay" />
                <section className="main flex form">
                    <p className="x">✕</p>
                    <section className="title">
                        <h1>Sign in</h1>
                    </section>
                    <div className="content flex-v">
                        <section className="error">
                            {error &&
                                <p>{error}</p>
                            }
                        </section>
                        <div className="username">
                            <p>Username:</p>
                        </div>
                        <input
                            type="text"
                            className={`${this.state.valide ? '' : 'no-valide'}`}
                            value={this.state.value}
                            onChange={this.onChange}
                            placeholder={'John Doe'}
                            required={true}
                        />
                        <button
                            onClick={this.onClick}
                            className="btn-default">
                            Login
                            </button>
                    </div>
                </section>
            </div>
        );
    }
};