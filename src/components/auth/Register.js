import React, { Component } from 'react';
import validateRegisterInput from '../../validation/register';
import bcrypt from 'bcryptjs';
import classnames from 'classnames';
import M from 'materialize-css';
const { ipcRenderer } = window.require('electron');

class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
            errors: {},
            displayLoader: false,
            disabled: false
        };
    }

    componentDidMount() {
        const form = document.getElementById('registrationForm');
        ipcRenderer.on('registration-success', () => {
            this.setState({
                firstName: '',
                lastName: '',
                password: '',
                confirmPassword: '',
                username: '',
                displayLoader: false,
                disabled: true
            });
            form.reset();
            M.toast({
                html: 'Successfully Added Student',
                displayLength: 5000,
                classes: 'success-message', 
                completeCallback: () => {
                    this.props.history.push('/login');
                }
            });
        });

        ipcRenderer.on('user-exists', (event, data) => {
            console.log(data);
            this.setState({
                errors: data
            });
            document.getElementById('username').focus();
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
        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };

        const { errors, isValid } = validateRegisterInput(newUser);
        if (!isValid) {
            this.setState({
                ...this.state,
                errors,
                disabled: false,
                displayLoader: false
            });
        } else {
            this.setState({
                ...this.state,
                errors: {}
            });
            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.log(err);
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) console.log(err);
                    newUser.password = hash;
                });
            });
            ipcRenderer.send('register-student', newUser);
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} id="registrationForm">
                {this.state.displayLoader &&
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
                }
                    {/* <h3 className="form-header">Sign Up</h3> */}
                    <h3 className="form-header"><span className="mdi mdi-account-plus form-header__icon"></span>Add User</h3>
                    <div className="row">
                        <div className="input-field col s12 m6 l6">
                            <span className="mdi mdi-alphabetical prefix form-icons"></span>
                            <input
                            className={classnames('validate', {
                                'invalid': this.state.errors.firstName
                            })}
                                type="text"
                                id="firstName"
                                name="firstName"
                                autoFocus
                                value={this.state.firstName}
                                onChange={this.onChange}
                            />
                            <label htmlFor="firstName">First Name</label>
                            <span className="helper-text">{this.state.errors.firstName}</span>
                        </div>
                        <div className="input-field col s12 m6 l6">
                            <span className="mdi mdi-alphabetical prefix form-icons"></span>
                            <input
                            className={classnames('validate', {
                                'invalid': this.state.errors.lastName
                            })}
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.onChange}
                            />
                            <label htmlFor="lastName">Last Name</label>
                            <span className="helper-text">{this.state.errors.lastName}</span>
                        </div>
                    </div>
                    <div className="input-field">
                        <span className="mdi mdi-account prefix form-icons"></span>
                        <input
                        className={classnames('validate', {
                            'invalid': this.state.errors.username
                        })}
                            type="text"
                            id="username"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChange}
                        />
                        <label htmlFor="username">Username</label>
                        <span className="helper-text">{this.state.errors.username}</span>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 m6 l6">
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
                        <div className="input-field col s12 m6 l6">
                            <span className="mdi mdi-lock-outline prefix form-icons"></span>
                            <input
                            className={classnames('validate', {
                                'invalid': this.state.errors.confirmPassword
                            })}
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.onChange}
                            />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <span className="helper-text">{this.state.errors.confirmPassword}</span>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <button 
                            id="registerButton" 
                            disabled={this.state.disabled}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;