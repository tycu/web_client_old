import React from 'react';

export default class Email extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: this.props.email
    };
  }

  handleEmailChange(event) {
    this.props.onUpdate('email', event.target.value);
  }


  render() {
    return (
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input autoFocus type="text" value={this.props.email} onChange={this.handleEmailChange.bind(this)} className="form-control" id="email" placeholder="email" />
      </div>
    );
  }
}

