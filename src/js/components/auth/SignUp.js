import React from 'react';
import Radium from 'radium';
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

@Radium
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
    passwordMatch: React.PropTypes.string,
    style: React.PropTypes.object
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
      createButton: {
        width: '260px',
        '@media (min-width: 480px)': {
        }
      },
      mobileOr: {
        display: 'none',
        '@media (max-width: 768px)': {
          position: 'relative',
          padding: '20px 0px',
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          top: '30px',
          left: '20px',
          display: 'inline-block'
        }

      }
    }
  }


  render() {
    const defStyle = this.getStyles();
    const { email } = this.state;
    const { password } = this.state;
    const { passwordMatch } = this.state;


    return (
      <div className="jumbotron center-block" style={[defStyle.container]}>
        <h2>Sign up For Tally</h2>
        <div style={[defStyle.FacebookAuth]}>
          <p style={[defStyle.p]}>Use a social account</p>
          <div style={[defStyle.oauth]}>
            <div style={[defStyle.account]}>

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
            </div>
          </div>
          <span>Already have an Account? | </span>
            <Link to="/signin"> Log In</Link><br/>
        </div>

        <p style={[defStyle.mobileOr]}>Or SignUp With Email</p>

        <div style={[defStyle.emailSignup]}>
          <p style={[defStyle.p]}>Sign up with your email</p>
          <form role="form">
            <Messages key={this.state.key + 1} {...this.state} />
            <Email {...this.state} key={this.state.key + 2} onUpdate={this.onUpdate.bind(this)} value={email} />
            <Password {...this.state} key={this.state.key + 3 } onUpdate={this.onUpdate.bind(this)} value={password} />
            <PasswordMatch {...this.state} key={this.state.key + 4} onUpdate={this.onUpdate.bind(this)} value={passwordMatch} />
            <div className="form-group pull-right">
              <button style={[defStyle.createButton]} type="submit" className="btn btn-primary" onClick={this.signup.bind(this)}>Create Account</button>
            </div>
          </form>
        </div>



      </div>
    );
  }
}

