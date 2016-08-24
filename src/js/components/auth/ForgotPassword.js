import React from 'react';
import { Link } from "react-router";
import * as AuthActions from "../../actions/AuthActions";
import * as AuthUtils from "../../utils/AuthUtils";
import AuthStore from '../../stores/AuthStore';
import Messages from '../layout/Messages';
import Email from './Email';

export default class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.forgotPassword = this.forgotPassword.bind(this);

    this.state = {
      email: '',
      error: '',
      emailError: false,
      key: 1
    };
  }

  static propTypes = {
    email:  React.PropTypes.string,
    emailError: React.PropTypes.bool,
    error:  React.PropTypes.string
  }

  componentDidMount() {
    AuthStore.addChangeListener(this.forgotPassword);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.forgotPassword);
  }

  forgotPassword() {
    this.setState({
      loggedIn:   AuthStore.signedIn(),
      email:      AuthStore.currentUser(),
      message:    AuthStore.getMessage(),
      error:      AuthStore.getError(),
      key:        Math.random()
    });
  }

  resetPassword(e) {
    e.preventDefault();
    var that = this;

    if (!AuthUtils.validEmail(this.state.email)) {
      that.setState({
        error: AuthUtils.invalidEmail(),
        emailError: true
      });
      return false;
    }
    AuthActions.resetPassword(this.state.email);
  }

  onUpdate(key, val){
    this.setState({
      [key]: val
    });
  }


  render() {
    const style = {
      container: {
        width: '550px',
        height: '400px',
        background: '#fff',
      },
      account: {
        marginTop: '30px'
      },
      resetPassword: {
        marginTop: '62px'
      }
    };

    return (
      <div className="signin jumbotron center-block" style={style.container}>
        <h2>Forgot Your Password</h2>
        <form role="form">
          <Messages key={this.state.key + 1} {...this.state} />
          <Email {...this.state} key={this.state.key + 2} onUpdate={this.onUpdate.bind(this)} />

          <div className="form-group pull-left">
            <button type="submit" className="btn btn-primary" onClick={this.resetPassword.bind(this)}>
              Reset My Password
            </button>
            <div style={style.account}>
              <Link to="/signin">Return to Sign In</Link>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
