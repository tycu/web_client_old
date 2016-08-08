import React from 'react';
import * as AuthActions from "../../actions/AuthActions";

export default class SignOut extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    AuthActions.signOutUser();
  }

  render() {
    return null
  }
}
