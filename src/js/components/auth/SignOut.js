import React from 'react';
import * as AuthActions from "../../actions/AuthActions";

export default class SignOut extends React.Component {

  componentWillMount() {
    AuthActions.signOutUser();
  }

  render() {
    return null
  }
}
