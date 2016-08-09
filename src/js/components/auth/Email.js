import React from 'react';

export default class Email extends React.Component {

  static propTypes = {
    email:  React.PropTypes.string
  }

  handleEmailChange(event) {
    this.props.onUpdate('email', event.target.value);
  }


  render() {
    const {email} = this.props;

    return (
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          autoFocus
          type="text"
          value={email}
          onChange={this.handleEmailChange.bind(this)}
          className="form-control"
          id="email"
          placeholder="email" />
      </div>
    );
  }
}

