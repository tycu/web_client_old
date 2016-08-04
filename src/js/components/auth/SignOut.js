import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import AuthService from '../../services/AuthService';

export default class SignOut extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    AuthService.signout(token, Constants.SIGNOUT_URL)
      .catch(function(response) {
        if (response.status !== 200) {
          alert("There is an error signing out.");
          console.log("Error signing out.", response);
        }
    });
  }

  render() {
    return null
  }
}
