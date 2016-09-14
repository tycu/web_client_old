import ReactDOM from 'react-dom';
import React, { Component, PropTypes } from 'react';
var cardParser = require('creditcards/card');

export default class CardNumber extends React.Component {
  state = {
    value: this.props.value,
    number: '',
    cardType: ''
  }

  static propTypes = {
    number: React.PropTypes.string,
    cardType: React.PropTypes.string
  }

  handleNumberChange(event) {
    this.props.onChange(event.target.value, true);
  }

  componentWillReceiveProps(nextProps) {
    const type = cardParser.type(this.state.number.replace( /\s/g, ''), false);

    this.setState({
      number: nextProps.value,
      cardType: type
    });
  }

  handleBlur() {
    this.props.onChange(cardParser.format(this.state.number, '  '), true);
  }

  render () {
    const { number, cardType }  = this.state;
    const style = {
      label: {
        lineHeight: '30px'
      }
    }

    return (
      <div className="form-group">
        <label htmlFor="number" style={style.label}>Card Number - {cardType}</label>
        <input
          autoFocus
          type="text"
          size="20"
          name="number"
          value={number}
          style={this.props.style}
          className="form-control"
          placeholder="card number"
          onBlur={this.handleBlur.bind(this)}
          onChange={this.handleNumberChange.bind(this)}
        />
      </div>
    )
  }
}
