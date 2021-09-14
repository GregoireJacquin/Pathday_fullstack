import React from 'react';

export class UserSignupPage extends React.Component {

    state = {
        displayName: '',
        username: '',
        password: '',
        passwordRepeat: '',
        pendingApiCall: false
    }

    onChangeDisplayName = (event) => {
        const value = event.target.value;
        this.setState({ displayName: value });
    }
    onChangeUsername = (event) => {
        const value = event.target.value;
        this.setState({ username: value });
    }
    onChangePassword = (event) => {
        const value = event.target.value;
        this.setState({ password: value });
    }
    onChangePasswordRepeat = (event) => {
        const value = event.target.value;
        this.setState({ passwordRepeat: value });
    }
    onClickSignup = () => {
        const user = {
            username: this.state.username,
            displayName: this.state.displayName,
            password: this.state.password
        };
        this.setState({ pendingApiCall: true });
        this.props.actions.postSignup(user)
        .then(response => {
            this.setState({ pendingApiCall: false });
        })
        .catch(error => {
            this.setState({ pendingApiCall: false });
        })
        console.log(user)
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center">Sign Up</h1>
                <div className="col-12 mb-3"><label>Display Name</label>
                    <input className="form-control" placeholder='Your Display name' value={this.state.displayName} onChange={this.onChangeDisplayName}></input></div>
                <div className="col-12 mb-3"><label>Username</label><input className="form-control" placeholder='Your username' value={this.state.username} onChange={this.onChangeUsername}></input></div>
                <div className="col-12 mb-3"><label>Password</label><input className="form-control" placeholder='Your password' type='password' value={this.state.password} onChange={this.onChangePassword}></input></div>
                <div className="col-12 mb-3"><label>Repeat Password</label><input className="form-control" placeholder='Repeat your password' type='password' value={this.state.passwordRepeat} onChange={this.onChangePasswordRepeat}></input></div>
                <div className="text-center"><button className="btn btn-primary" onClick={this.onClickSignup} disabled={this.state.pendingApiCall}>
                    {this.state.pendingApiCall && (
                        <div className="spinner-border text-light spinner-border-sm mr-sm-1">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        )}
                    Sign up</button> </div>
            </div>
        )
    }
}

UserSignupPage.defaultProps = {
    actions: {
        postSignup: () => new Promise((resolve, reject) => {
            resolve({});
        })
    }
}
export default UserSignupPage;