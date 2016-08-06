import request from 'reqwest';
import when from 'when';
import SignInActions from '../actions/SignInActions';

class AuthService {

  signin(email, password, url) {
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
    SignInActions.signoutUser();

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

  handleAuth(signInPromise) {
    return signInPromise.then(function(response) {
      SignInActions.signInUser(response.token, response.email, response.refreshToken);
      return true;
    });
  }
}

export default new AuthService()
