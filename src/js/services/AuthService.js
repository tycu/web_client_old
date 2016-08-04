import request from 'reqwest';
import when from 'when';
import LoginActions from '../actions/LoginActions';

class AuthService {

  login(email, password, url) {
    return this.handleAuth(when(request({
      url: url,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        email: email,
        password: password
      }
    })));
  }

  signout(token, url) {
    LoginActions.signoutUser();

    return this.handleAuth(when(request({
      url: url,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        token: token
      }
    })));
  }

  signup(email, password, url) {
    return this.handleAuth(when(request({
      url: url,
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
      LoginActions.loginUser(response.token, response.email, response.refreshToken);
      return true;
    });
  }
}

export default new AuthService()
