import React from 'react';
import Radium from 'radium';
import { Link } from "react-router";
import * as AuthActions from "../../actions/AuthActions";
import * as AuthUtils from "../../utils/AuthUtils";
import AuthStore from '../../stores/AuthStore';
import FacebookLogin from 'react-facebook-login';
import * as Constants from '../../constants/AuthConstants';
import Email from './Email';
import Password from './Password';
import Messages from '../layout/Messages';

@Radium
export default class SignIn extends React.Component {
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
    style: React.PropTypes.object
  }

  componentDidMount() {
    AuthStore.addChangeListener(this.getAuthState);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.getAuthState);
  }

  responseFacebook(facebookResponse) {
    console.log('facebookResponse', facebookResponse);
    if (facebookResponse.status == 'unknown') {
      return;
    } else {
      AuthActions.signInFacebook(facebookResponse)
    }
  }

  getAuthState() {
    this.setState({
      loggedIn:   AuthStore.signedIn(),
      email:      AuthStore.currentUser(),
      password:   AuthStore.getPassword(),
      message:    AuthStore.getMessage(),
      error:      AuthStore.getError(),
      emailError: AuthStore.getEmailError(),
      pwError:    AuthStore.getPasswordError(),
      key:        Math.random()
    });
  }

  signin(e) {
    e.preventDefault();
    var that = this;

    if (!AuthUtils.validEmail(this.state.email)) {
      that.setState({
        error: AuthUtils.invalidEmail(),
        emailError: true
      });
      return false;
    }

    if (!AuthUtils.validEmail(this.state.email)) {
      that.setState({
        error: AuthUtils.pwErrorText,
        pwError: true
      });
      return false;
    } else {
      AuthActions.signInUser(this.state.email, this.state.password);
    }
  };

  onUpdate(key, val){
    this.setState({
      [key]: val
    });
  };


  getStyles = () => {
    return {
      container: {
        background: '#fff',

        '@media (min-width: 480px)': {
          maxWidth: '400px',
          height: '780px'
        },
        '@media (min-width: 768px)': {
          maxWidth: '650px',
          height: '480px',
          padding: '40px',
        }

      },
      emailSignup: {
        width: '270px',
        paddingLeft: '20px',
        '@media (min-width: 768px)': {
          float: 'right',
        }
      },
      FacebookAuth: {
        width: '270px',
        '@media (min-width: 480px)': {
          margin: '20px 0px 0px 20px',
        },
        '@media (min-width: 768px)': {
          float: 'left'
        }
      },
      account: {
        '@media (min-width: 768px)': {
          marginTop: '46px'
        }
      },
      p: {
        display: 'none',
        '@media (min-width: 480px)': {
          display: 'none'
        },
        '@media (min-width: 768px)': {
          display: 'inline',
          color: '#888',
          fontSize: '16px'
        }
      },
      oauth: {
        '@media (min-width: 768px)': {
          marginTop: '50px',
          paddingRight: '40px',
          minHeight: '240px',
          borderRight: '1px solid #888'
        }
      },
      loginButton: {
        width: '250px',
        '@media (min-width: 480px)': {
        }
      },
    };
  }


  render() {
    const defStyle = this.getStyles();

    return (
      <div className="jumbotron center-block" style={[defStyle.container]}>
        <h2>Login</h2>
        <div style={[defStyle.emailSignup]}>
          <p style={[defStyle.p]}>Sign in with email</p>
          <form role="form">
            <Messages key={this.state.key + 1}  {...this.state} />
            <Email {...this.state} key={this.state.key + 2} onUpdate={this.onUpdate.bind(this)} />
            <Password {...this.state} key={this.state.key + 3} onUpdate={this.onUpdate.bind(this)} />

            <div className="form-group pull-left">
              <button type="submit" className="btn btn-primary" style={[defStyle.loginButton]} onClick={this.signin.bind(this)}>Login</button>
            </div>
            <div className="form-group pull-right">
              <div style={[defStyle.resetPassword]}>
                <Link to="/reset_password">Forgot Password</Link>
              </div>
            </div>
            <br/>
          </form>
        </div>

        <div style={[defStyle.FacebookAuth]}>
          <p style={[defStyle.p]}>Login with Social</p>
          <div style={[defStyle.oauth]}>
            <div style={[defStyle.account]}>
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
              <br/><br/><br/>
              <div style={[defStyle.account]}>
                <span>No Account? | </span>
                <Link to="/signup"> Sign Up</Link>
              </div>
            </div>
          </div>

        </div>
    </div>
    );
  }
}
