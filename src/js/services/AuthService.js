import request from 'reqwest';
import when from 'when';
import Constants from '../constants/LoginConstants';
import LoginActions from '../actions/LoginActions';

class AuthService {

  login(email, password) {
    return this.handleAuth(when(request({
      url: Constants.LOGIN_URL,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        email: email,
        password: password
      }
    })));
  }

  logout() {
    LoginActions.logoutUser();
  }

  signup(email, password) {
    return this.handleAuth(when(request({
      url: Constants.SIGINUP_URL,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        email: email,
        password: password
      }
    })));
  }

  handleAuth(loginPromise) {
    return loginPromise.then(function(response) {
      LoginActions.loginUser(response.sessionID);
      return true;
    });
  }
}

export default new AuthService()
