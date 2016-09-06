import React from 'react';
import { Link } from "react-router";
import FacebookLogin from 'react-facebook-login';
import * as AuthActions from "../../actions/AuthActions";
import * as AuthUtils from "../../utils/AuthUtils";
import AuthStore from '../../stores/AuthStore';
import * as Constants from '../../constants/AuthConstants';
import Email from './Email';
import Password from './Password';
import PasswordMatch from './PasswordMatch';
import Messages from '../layout/Messages';

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.getAuthState = this.getAuthState.bind(this);

    this.state = {
      loggedIn: false,
      email: '',
      password: '',
      message: '',
      error: '',
      emailError: false,
      pwError: false,
      passwordMatch: '',
      key: 1
    };
  }

  static propTypes = {
    loggedIn: React.PropTypes.bool,
    email:  React.PropTypes.string,
    password:  React.PropTypes.string,
    message:  React.PropTypes.string,
    error:  React.PropTypes.string,
    emailError: React.PropTypes.bool,
    pwError: React.PropTypes.bool,
    passwordMatch: React.PropTypes.string
  }

  componentDidMount() {
    AuthStore.addChangeListener(this.getAuthState);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.getAuthState);
  }

  getAuthState() {
    this.setState({
      loggedIn:   AuthStore.signedIn(),
      email:      AuthStore.currentUser(),
      password:   '',
      passwordMatch: '',
      message:    AuthStore.getMessage(),
      error:      AuthStore.getError(),
      emailError: AuthStore.getEmailError(),
      pwError:    AuthStore.getPasswordError(),
      key:        Math.random()
    });
  }

  signup(e) {
    e.preventDefault();
    var that = this;

    if (!AuthUtils.validEmail(this.state.email)) {
      that.setState({
        error: AuthUtils.invalidEmail(),
        emailError: true
      });
      return false;
    }

    if (this.state.password !== this.state.passwordMatch) {
      that.setState({
        error: AuthUtils.passwordNoMatch(),
        pwError: true
      });
      return false;
    } else if (!AuthUtils.validPassword(this.state.password)) {
      that.setState({
        error: AuthUtils.pwErrorText,
        pwError: true
      });
      return false;
    } else {
      AuthActions.signUpUser(this.state.email, this.state.password);
    }
  }

  responseFacebook(response) {
    if (response.status == 'unknown') {
      return;
    } else {
      AuthActions.signInFacebook(response)
    }
  }

  onUpdate(key, val) {
    this.setState({
      [key]: val
    });
  }


  render() {
    const { email } = this.state;
    const { password } = this.state;
    const { passwordMatch } = this.state;

    const style = {
      container: {
        width: '650px',
        padding: '40px',
        height: '480px',
        background: '#fff',
      },
      emailSignup: {
        float: 'right',
        width: '280px',
        paddingLeft: '20px'
      },
      FacebookAuth: {
        float: 'left',
        width: '280px'
      },
      account: {
        marginTop: '46px'
      },
      p: {
        color: '#888',
        fontSize: '16px'
      },
      oauth: {
        marginTop: '50px',
        paddingRight: '40px',
        minHeight: '240px',
        borderRight: '1px solid #888'
      }
    };

    return (
      <div className="jumbotron center-block" style={style.container}>
        <h2>Sign up For Tally</h2>
        <br/>
        <div style={style.emailSignup}>
          <p style={style.p}>Sign up with your email</p>
          <form role="form">
            <Messages key={this.state.key + 1} {...this.state} />
            <Email {...this.state} key={this.state.key + 2} onUpdate={this.onUpdate.bind(this)} value={email} />
            <Password {...this.state} key={this.state.key + 3 } onUpdate={this.onUpdate.bind(this)} value={password} />
            <PasswordMatch {...this.state} key={this.state.key + 4} onUpdate={this.onUpdate.bind(this)} value={passwordMatch} />
            <div className="form-group pull-right">
              <button type="submit" className="btn btn-primary" onClick={this.signup.bind(this)}>Create Account</button>
            </div>
          </form>
        </div>
        <div style={style.FacebookAuth}>
          <p style={style.p}>Use a social account</p>
          <div style={style.oauth}>
            <div style={style.account}>
              <br/>
              <FacebookLogin
                appId={Constants.fbAppId}
                autoLoad={true}
                size='medium'
                version='2.7'
                language='en_US'
                fields="name,email,picture.width(200).height(200)"
                callback={this.responseFacebook.bind(this)}
                textButton='Login With Facebook'
                icon="fa-facebook"
              />
              <br/><br/><br/><br/><br/>
              <span>Already have an Account? | </span>
              <Link to="/signin"> Log In</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

