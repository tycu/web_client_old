import React from 'react';
import { Link } from "react-router";
import AuthService from '../../services/AuthService';
import Constants from '../../constants/LoginConstants';
import Email from './Email';
import Password from './Password'

export default class SignUp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    };
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  signup(e) {
    e.preventDefault();
    AuthService.signup(this.state.email, this.state.password, Constants.SIGNUP_URL)
      .catch(function(response) {
        if (response.status !== 200) {
          alert("There is an error signing up.");
          console.log("Error signing up.", response);
        }
    });
  }

  onUpdate(key, val){
    this.setState({
      [key]: val
    });
  }


  render() {

    return (
      <div className="login jumbotron center-block">
        <h2>Sign up For Tally</h2>

        <form role="form">
          <Email onUpdate={this.onUpdate.bind(this)} />
          <Password onUpdate={this.onUpdate.bind(this)} />
          <Password onUpdate={this.onUpdate.bind(this)} />
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

