import React from 'react';
import { Link } from "react-router";
import AuthStore from '../../stores/AuthStore';

export default class Messages extends React.Component {
  static propTypes = {
    error:  React.PropTypes.string,
    message:  React.PropTypes.string
  }

  state = {
    error: '',
    message: ''
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
      color: '#d53543'
    };
    const messageStyles = {
      color: '#3FC59D'
    };

    return (
      <div>
        <ul style={listStyle}>
          <li style={errorStyles}>
            {(this.props.error ? (<span class="glyphicon glyphicon-remove" aria-hidden="true">&nbsp;</span>) : (<span></span>))}
            {error}
          </li>
          <li style={messageStyles}>
            {(this.props.message ? (<span class="glyphicon glyphicon-ok" aria-hidden="true">&nbsp;</span>) : (<span></span>))}
            {message}
          </li>
        </ul>
      </div>
    )
  }

}