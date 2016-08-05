import React from 'react';
import { Link } from "react-router";
import AuthService from '../../services/AuthService';
import Constants from '../../constants/LoginConstants';
import Email from './Email';
import Password from './Password'

export default class SignIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    };
  }

  signin(e) {
    e.preventDefault();
    AuthService.login(this.state.email, this.state.password, Constants.SIGNIN_URL)
      .catch(function(response) {
        if (response.status !== 200) {
          alert("There is an error logging in");
          console.log("Error logging in", response);
        }
      });
  }

  onUpdate(key, val){
    this.setState({
      [key]: val
    });
  }


  render() {
    const loginStyles = {
      width: '450px',
      height: '350px',
      background: '#fff',

    };

    return (
      <div className="login jumbotron center-block" style={loginStyles}>
        <h2>Login</h2>
        <form role="form">
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

