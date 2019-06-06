import React, { Component } from 'react';
import classnames from 'classnames';

import validateLoginInput from '../../validation/login';
const { ipcRenderer } = window.require('electron');

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            errors: {}
        }
    }

    componentDidMount() {
        ipcRenderer.on('user-not-found', (event, data) => {
            this.setState({
                errors: data
            });
            document.getElementById('username').focus();
        });

        ipcRenderer.on('incorrect-password', (event, data) => {
            this.setState({
                errors: data
            });
            document.getElementById('password').focus();
        });

        ipcRenderer.on('login-user', (event, data) => {
            this.setState({
                username: '',
                password: '',
                errors: {}
            });
            alert('User Logged In');
        });
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            disabled: true,
            displayLoader: true
        });
        const user = {
            username: this.state.username,
            password: this.state.password
        };

        const { errors, isValid } = validateLoginInput(user);
        if (!isValid) {
            this.setState({
                ...this.state,
                errors
            });
        } else {
            this.setState({
                ...this.state,
                errors: {}
            });
            ipcRenderer.send('login-user', user);
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} id="loginForm">
                    <h3 className="form-header">Login</h3>
                    <div className="input-field">
                        <span className="mdi mdi-account prefix form-icons"></span>
                        <input
                        className={classnames('validate', {
                            'invalid': this.state.errors.username
                        })}
                            type="text"
                            id="username"
                            name="username"
                            autoFocus
                            value={this.state.username}
                            onChange={this.onChange}
                        />
                        <label htmlFor="username">Username</label>
                        <span className="helper-text">{this.state.errors.username}</span>
                    </div>
                    <div className="input-field">
                        <span className="mdi mdi-lock-outline prefix form-icons"></span>
                        <input
                        className={classnames('validate', {
                            'invalid': this.state.errors.password
                        })}
                            type="password"
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                        <label htmlFor="password">Password</label>
                        <span className="helper-text">{this.state.errors.password}</span>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <button id="loginButton">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
