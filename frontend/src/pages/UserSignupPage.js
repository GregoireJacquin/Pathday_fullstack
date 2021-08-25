import React from 'react';

export class UserSignupPage extends React.Component {

    state = {
        displayName: '',
        username: '',
        password: '',
        passwordRepeat: ''
    }

    onChangeDisplayName = (event) => {
        const value = event.target.value;
        this.setState({displayName: value});
    }
    onChangeUsername = (event) => {
        const value = event.target.value;
        this.setState({username: value});
    }
    onChangePassword = (event) => {
        const value = event.target.value;
        this.setState({password: value});
    }
    onChangePasswordRepeat = (event) => {
        const value = event.target.value;
        this.setState({passwordRepeat: value});
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <div><input placeholder='Your Display name' value={this.state.displayName} onChange={this.onChangeDisplayName}></input></div>
                <div><input placeholder='Your username' value={this.state.username} onChange={this.onChangeUsername}></input></div>
                <div><input placeholder='Your password' type='password' value={this.state.password} onChange={this.onChangePassword}></input></div>
                <div><input placeholder='Repeat your password' type='password'value={this.state.passwordRepeat} onChange={this.onChangePasswordRepeat}></input></div>
                <div><button>Sign up</button> </div>
            </div>
        )
    }
}

export default UserSignupPage;