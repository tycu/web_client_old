import React from 'react';
import { Link } from "react-router";
import * as AuthActions from "../../actions/AuthActions";
import AuthStore from '../../stores/AuthStore';

import Email from './Email';
import Password from './Password';
import PasswordMatch from './PasswordMatch';
import MessageErrors from './MessageErrors';

export default class SignUp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      passwordMatch: false
    };
  }

  componentWillMount() {
    AuthStore.on("change", () => {
      this.setState({
        loggedIn: AuthStore.signedIn(),
        email:    AuthStore.currentUser(),
        message:  AuthStore.getMessage(),
        error:    AuthStore.getError()
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
      error:    AuthStore.getError()
    });
  }

  validEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  signup(e) {
    e.preventDefault();
    var that = this;
    var pwRegex;
    var pwErrorText;

    if (!that.validEmail(this.state.email)) {
      that.setState({error: "Invalid email address"});
      return false;
    }
    // Minimum 8 characters at least 1 Alphabet and 1 Number:
    if (process.env.NODE_ENV === "production") {
      pwRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
      pwErrorText = "Your password must be 8 characters and contain a number."
    } else {
      pwRegex = new RegExp(/^[A-Za-z\d]{4,}$/);
      pwErrorText = "Your password must be at least 4 characters (non prod)";
    }

    if (this.state.password !== this.state.passwordMatch) {
      that.setState({error: 'Passwords Do Not Match'});
      return false;
    } else if (!pwRegex.test(this.state.password)) {
      that.setState({error: pwErrorText});
      return false;
    } else {
      AuthActions.signUpUser(this.state.email, this.state.password);
    }
  }

  onUpdate(key, val){
    this.setState({
      [key]: val
    });
  }


  render() {
    const signUpStyles = {
      width: '550px',
      height: '450px',
      background: '#fff',
    };

    return (
      <div className="signin jumbotron center-block" style={signUpStyles}>
        <h2>Sign up For Tally</h2>
        <form role="form">

          <MessageErrors {...this.state} />

          <Email onUpdate={this.onUpdate.bind(this)} />
          <Password onUpdate={this.onUpdate.bind(this)} />
          <PasswordMatch onUpdate={this.onUpdate.bind(this)} />
          <div className="form-group pull-right">
            <button type="submit" className="btn btn-default" onClick={this.signup.bind(this)}>Create Account</button>
          </div>
          <br />
          <div>
            <span>Already have an Account? | </span>
            <Link to="/signin"> Log In</Link>
          </div>

      </form>
    </div>
    );
  }
}

