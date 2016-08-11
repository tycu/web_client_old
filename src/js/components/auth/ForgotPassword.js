import React from 'react';
import { Link } from "react-router";
import * as AuthActions from "../../actions/AuthActions";
import Email from './Email';
import * as AuthUtils from "../../utils/AuthUtils";

export default class ForgotPassword extends React.Component {
  static propTypes = {
    email:  React.PropTypes.string,
    emailError: React.PropTypes.bool,
    error:  React.PropTypes.string
  }

  state = {
    email: '',
    error: '',
    emailError: false,
    key: 1
  }

  componentWillMount() {
    // AuthActions.resetPassword()
  }

  resetPassword(e) {
    e.preventDefault();
    var that = this;

    if (!AuthUtils.validEmail(this.state.email)) {
      that.setState({
        error: "Invalid email address",
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
        marginTop: '30'
      },
      resetPassword: {
        marginTop: '62'
      }
    };

    return (
      <div className="signin jumbotron center-block" style={style.container}>
        <h2>Forgot Your Password</h2>
        <form role="form">
          <Email {...this.state} key={this.state.key + 2} onUpdate={this.onUpdate.bind(this)} />

          <div className="form-group pull-left">
            <button type="submit" className="btn btn-default" onClick={this.resetPassword.bind(this)}>
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
