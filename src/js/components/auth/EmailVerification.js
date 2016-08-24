import React from 'react';
import * as AuthActions from "../../actions/AuthActions";
import Messages from '../layout/Messages';
import AuthStore from '../../stores/AuthStore';

export default class EmailVerification extends React.Component {
  constructor() {
    super();
    this.getAuth = this.getAuth.bind(this);

    this.state = {
      error: AuthStore.getError(),
      emailError: false,
      key: 1
    };
  }

  static propTypes = {
    error:  React.PropTypes.string,
    emailError: React.PropTypes.bool
  }

  state = {
    error: '',
    emailError: false
  }

  componentDidMount() {
    AuthActions.verifyEmail();
    AuthStore.addChangeListener(this.getAuth);
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this.getAuth);
  }

  getAuth() {
    this.setState({
      error: AuthStore.getError(),
      emailError: AuthStore.getEmailError(),
      key: Math.random()
    });
  }

  render() {

    const styles = {
      padding: '40px',
      margin: '0 auto',
      backgroundColor: '#fff',
      width: '450px',
      height: '250px'
    }

    return (
      <div style={styles}>
        {(this.state.emailError ? (
          <div>
            <h2>Error Verifying Email</h2>
            <Messages key={this.state.key + 1}  {...this.state} />
          </div>
        ) : (
          <div>
            <h2>Thank you for confirming your email address.</h2>
            <p>You now have full access to all of Tally's features.</p>
            <p>Let's get on with it <a href='/'>Check out some events!</a></p>
          </div>
        ))}
      </div>
    )
  }
}
