import React, { PureComponent } from 'react';

import { getNetworkId, web3 } from '../../helpers/eth';
import { ABI, ADDRESS } from '../../constants/constants';
import store from '../../store/store';
import { changeScreen } from '../AppActions';

import './Register.less';

export default class Register extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            valide: true
        };
    }

    getReceipt(tx) {
        web3.eth.getTransactionReceipt(tx, (err, receipt) => {
            if (null == receipt)
                window.setTimeout(() => { this.getReceipt(tx) }, 500);
            else {
                console.log('done!!!!!!!!!!!!!!!!!');
                localStorage.setItem('login', this.state.value);
                store.dispatch(changeScreen('admin-screen'));
            }
        });
    }

    onCheck = () => {
        const { value, valide } = this.state;

        if (value !== '') {
            if (!valide)
                this.setState({ valide: true })

            const instance = web3.eth.contract(ABI).at(ADDRESS);
            console.log('instance', instance);

            let result;
            try {
                result = instance['authAddress'].call(value,
                    (error, result) => {
                        if (!error) {
                            console.log('result search: ', result);

                        } else {
                            console.log('Error search');
                        }
                    });
            } catch (error) {
                console.error('global error', error);
            }
        } else {
            this.setState({ valide: false });
        }


    }

    onClick = () => {
        const { value, valide } = this.state;

        if (value !== '') {
            if (!valide)
                this.setState({ valide: true })

            const instance = web3.eth.contract(ABI).at(ADDRESS);
            console.log('instance', instance);

            let result;
            try {
                result = instance['createAccount'](value,
                    (error, result) => {
                        if (!error) {
                            this.getReceipt(result);
                            store.dispatch(changeScreen('mining-screen'));
                        } else {
                            console.log('Error in send');
                        }
                    });
            } catch (error) {
                console.error('global error', error);
            }
        } else {
            this.setState({ valide: false });
        }
    }

    onChange = (e) => {
        const { valide, value } = this.state;

        if (!valide)
            this.setState({ valide: true })

        this.setState({ value: e.target.value });
    }


    render() {
        return (
            <div className="register form flex-v">
                <div className="username">
                    <p>Username:</p>
                </div>
                <input
                    type="text"
                    className={`form-input ${this.state.valide ? '' : 'no-valide'}`}
                    value={this.state.value}
                    onChange={this.onChange}
                    required={true}
                />
                <button onClick={this.onClick} className="btn-default">
                    Register
                </button>
            </div>
        );
    }
};