import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'

export default class CardNumber extends React.Component {

  state = {
    value: this.props.value,
    number: ''
  }

  handleNumberChange(event) {
    this.props.onChange(event.target.value, true);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      number: nextProps.value
    });
  }


  render () {
    const { number }  = this.state;

    return (
      <div className="form-group">
        <label htmlFor="number">Card Number</label>
        <input
          autoFocus
          type="text"
          size="20"
          name="number"
          value={number}
          style={this.props.style}
          className="form-control"
          placeholder="card number"
          onChange={this.handleNumberChange.bind(this)}
        />
      </div>
    )
  }
}
