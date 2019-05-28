import React, { Component } from 'react';
import validateRegisterInput from '../../validation/register';
const { ipcRenderer } = window.require('electron');

class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            errors: {},
        };
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();

        // Hash password

        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };

        const { errors, isValid } = validateRegisterInput(newUser);
        if (!isValid) {
            console.log('invalid input');
            this.setState({
                errors
            });
        } else {
            this.setState({
                errors: {}
            });
            ipcRenderer.send('register-student', newUser);
            console.log('newUser ', newUser);
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h3>Sign Up</h3>
                    <div className="input-field">
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.onChange}
                        />
                        <label htmlFor="firstName">First Name</label>
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.onChange}
                        />
                        <label htmlFor="lastName">Last Name</label>
                    </div>
                    <div className="input-field">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field">
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={this.onChange}
                        />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                    <div>
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;
