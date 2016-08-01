import React from 'react';
import { Link } from "react-router";
import AuthService from '../services/AuthService';

export default class SignInSignUp extends React.Component {
  // https://github.com/reactjs/react-router/tree/master/examples/auth-flow

  constructor() {
    super()
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

  login(e) {
    e.preventDefault();
    AuthService.login(this.state.email, this.state.password)
      .catch(function(response) {
        if (response.status !== 200) {
          alert("There is an error logging in");
          console.log("Error logging in", response);
        }
      });
  }

  signup(e) {
    e.preventDefault();
    AuthService.signup(this.state.email, this.state.password)
      .catch(function(response) {
        if (response.status !== 200) {
          alert("There is an error signing up.");
          console.log("Error signing up.", response);
        }
    });
  }


  render() {
    var loginClass = this.props.route.path;
    return (
      <div className="login jumbotron center-block">
        {loginClass === 'login' ? (
          <h2>Login</h2>
        ) : (
          <h2>Sign up For Tally</h2>
        )}
        <form role="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" value={this.props.email} onChange={this.handleEmailChange.bind(this)} className="form-control" id="email" placeholder="email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" value={this.props.password} onChange={this.handlePasswordChange.bind(this)} className="form-control" id="password" ref="password" placeholder="password" />
          </div>

          {loginClass === 'login' ? (
            <div>
              <div className="form-group pull-right">
                <button type="submit" className="btn btn-default" onClick={this.login.bind(this)}>Login</button>
              </div>
              <br/>
              <div>
                <span>No Account? | </span>
                <Link to="/signup"> Sign Up</Link>
              </div>
            </div>

          ) : (
            <span>
             <div className="form-group">
                <label htmlFor="password">Confirm Password</label>
                <input type="password" value={this.props.password} onChange={this.handlePasswordChange.bind(this)} className="form-control" id="confirmPassword" ref="confirmPassword" placeholder="confirm password" />
              </div>
              <div className="form-group pull-right">
                <button type="submit" className="btn btn-default" onClick={this.signup.bind(this)}>Create Account</button>
              </div>
              <br />
              <div>
                <span>Already have an Account? | </span>
                <Link to="/login"> Log In</Link>
              </div>
            </span>
          )}

      </form>
    </div>
    );
  }
}

