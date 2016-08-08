import React from 'react';
import { Link } from "react-router";
import AuthStore from '../../stores/AuthStore';

import Email from './Email';
import Password from './Password'

export default class SignIn extends React.Component {


  constructor(props) {
    super(props)
  }

  render() {
    var error = this.props.error;
    var message = this.props.message;

    const listStyle = {
      listStyle: 'none',
      minHeight: '20px',
      marginLeft: '-39px'
    };

    const errorStyles = {
      color: 'red'
    };
    const messageStyles = {
      color: '#333'
    };

    return (
      <div>
        <ul style={listStyle}>
          <li style={errorStyles}>{error}</li>
          <li style={messageStyles}>{message}</li>
        </ul>
      </div>
    )
  }

}