import React from 'react';
import { Link } from "react-router";
import * as AuthActions from "../../actions/AuthActions";
import AuthStore from '../../stores/AuthStore';

import Email from './Email';
import Password from './Password';
import MessageErrors from './MessageErrors';

export default class SignIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false
    };
  }

  componentWillMount() {
    AuthStore.on("change", () => {
      this.setState({
        loggedIn: AuthStore.signedIn(),
        email:    AuthStore.currentUser(),
        message:  AuthStore.getMessage(),
        error:    AuthStore.getError(),
        password: AuthStore.getPassword()
      });
    });
  }

  componentWillUnmount() {
    AuthStore.removeListener("change", this.getAuthState);
  }

  getAuthState() {
    this.setState({
      loggedIn: AuthStore.signedIn(),
      email:    AuthStore.currentUser(),
      message:  AuthStore.getMessage(),
      error:    AuthStore.getError(),
      password: AuthStore.getPassword()
    });
  }

  signin(e) {
    e.preventDefault();
    AuthActions.signInUser(this.state.email, this.state.password);
  };

  onUpdate(key, val){
    this.setState({
      [key]: val
    });
  }

  render() {
    const signInStyles = {
      width: '550px',
      height: '400px',
      background: '#fff',

    };

    return (

      <div className="signin jumbotron center-block" style={signInStyles}>
        <h2>Login</h2>
        <form role="form">
          <MessageErrors {...this.state} />
          <Email onUpdate={this.onUpdate.bind(this)} />
          <Password onUpdate={this.onUpdate.bind(this)} />

          <div className="form-group pull-right">
            <button type="submit" className="btn btn-default" onClick={this.signin.bind(this)}>Login</button>
          </div>
          <br/>
          <div>
            <span>No Account? | </span>
            <Link to="/signup"> Sign Up</Link>
          </div>
      </form>
    </div>
    );
  }
}
