import React from 'react';
import * as AuthActions from "../../actions/AuthActions";

export default class SignOut extends React.Component {

  componentWillMount() {
    try {
      if (FB !== undefined) {
        FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            FB.logout();
          }
         });
      }
    }
    catch(err) {
      alert('Trouble loading Facbook SDK. Please check your internet connection');
    }
    finally {
      AuthActions.signOutUser();
    }
  }

  render() {
    return null
  }
}
