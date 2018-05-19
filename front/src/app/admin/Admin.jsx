import React, { PureComponent } from 'react';

import './Admin.less';

export default class Admin extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            valide: true
        };
    }

    onChange = (e) => {
        const { valide, value } = this.state;

        if (!valide)
            this.setState({ valide: true })

        this.setState({ value: e.target.value });
    }

    render() {
        return (
            <div className="admin  form flex-v">
                <input
                    type="text"
                    className={`${this.state.valide ? '' : 'no-valide'}`}
                    value={this.state.value}
                    onChange={this.onChange}
                    required={true}
                />
                <button onClick={this.onClick} className="btn-default">
                    Change key
                </button>
            </div>
        );
    }
};