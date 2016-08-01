import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import AuthService from '../services/AuthService';

export default class Logout extends React.Component {
  constructor() {
    super()
  }
  componentWillMount() {
    AuthService.logout();
    browserHistory.push('/');
  }

  render() {
    return null
  }
}
