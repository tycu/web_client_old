import React from 'react';
import * as AuthActions from "../../actions/AuthActions";

export default class SignOut extends React.Component {

  componentWillMount() {
    if (FB !== undefined) {
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          FB.logout();
        }
       });
    }
    AuthActions.signOutUser();
  }

  render() {
    return null
  }
}
