import React, { PureComponent } from 'react';

import { ABI, ADDRESS } from '../../constants/constants';
import { web3 } from '../../helpers/eth';
import store from '../../store/store';
import { changeScreen } from '../AppActions';

import './Admin.less';

export default class Admin extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            valide: true,
            authAddress: '---',
            recoveryAddress: '---',
            error: '',
            login: ''
        };
    }

    onChange = (e) => {
        const { valide, value } = this.state;

        if (!valide)
            this.setState({ valide: true })

        this.setState({ value: e.target.value });
    }

    // get address
    componentDidMount() {
        const { value, login } = this.state;
        const instance = web3.eth.contract(ABI).at(ADDRESS);

        let result;
        try {
            result = instance['authAddress'].call(login,
                (error, result) => {
                    if (!error) {
                        this.setState({ authAddress: result });
                    } else {
                        this.setState({ error });

                        console.log('Error search');
                    }
                });
        } catch (error) {
            this.setState({ error });

            console.error('global error', error);
        }

        try {
            result = instance['recoveryAddress'].call(login,
                (error, result) => {
                    if (!error) {
                        this.setState({ recoveryAddress: result });
                    } else {
                        this.setState({ error });

                        console.log('Error search');
                    }
                });
        } catch (error) {
            this.setState({ error });

            console.error('global error', error);
        }
    }


    componentWillMount() {
        const login = localStorage.getItem('login');

        if (login !== undefined || login !== null || login !== '') {
            this.setState({ login });
        }
    }

    getReceipt(tx) {
        web3.eth.getTransactionReceipt(tx, (err, receipt) => {
            if (null == receipt)
                window.setTimeout(() => { this.getReceipt(tx) }, 500);
            else {
                console.log('done!!!!!!!!!!!!!!!!!');
                // localStorage.setItem('login', this.state.value);
                store.dispatch(changeScreen('admin-screen'));
            }
        });
    }

    // set Recovery
    onClick = () => {
        const { login, value, valide } = this.state;

        if (value !== '') {
            // if (web3.isAddress(value)) {
            if (!valide)
                this.setState({ valide: true })

            const instance = web3.eth.contract(ABI).at(ADDRESS);

            let result;
            try {
                result = instance['setRecoveryAddress'](login, value,
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

    render() {
        const { authAddress, error, recoveryAddress, login } = this.state;

        return (
            <div className="admin  form flex-v">
                {error &&
                    <p>{error}</p>
                }
                <section>
                    <h1>Warning: you key is same</h1>
                </section>
                <p>Login: {login}</p>
                <p>Auth address: <span>{authAddress}</span></p>
                {/* <input
                    type="text"
                    className={`${this.state.valide ? '' : 'no-valide'}`}
                    value={this.state.value}
                    onChange={this.onChange}
                    required={true}
                /> */}
                <p>Recovery address: <span>{recoveryAddress}</span></p>
                <input
                    type="text"
                    className={`${this.state.valide ? '' : 'no-valide'}`}
                    value={this.state.value}
                    onChange={this.onChange}
                    required={true}
                />
                <button
                    onClick={this.onClick}
                    className="btn-default">
                    Change key
                </button>
            </div>
        );
    }
};