import React from 'react';

export default class Password extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      password: this.props.password
    };
  }

  handlePasswordChange(event) {
    this.props.onUpdate('password', event.target.value);
  }


  render() {
    return (
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" value={this.props.password} onChange={this.handlePasswordChange.bind(this)} className="form-control" ref="password" placeholder="password" />
      </div>
    );
  }
}
