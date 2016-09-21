import React from 'react';
// var cvcParser = require('creditcards/cvc');
// NOTE can add cvc validation here: https://github.com/bendrucker/creditcards

export default class Cvc extends React.Component {
  state = {
    value: this.props.value,
    cvc: ''
  }

  handleCvcChange(event) {
    this.props.onChange(event.target.value, true);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cvc: nextProps.value
    });
  }


  render () {
    const { cvc }  = this.state;

    return (
      <div className="form-group">
        <label htmlFor="cvc">Security Pin</label>
        <input
          type="text"
          size="4"
          name="cvc"
          value={cvc}
          style={this.props.style}
          className="form-control"
          placeholder="cvc"
          onChange={this.handleCvcChange.bind(this)}
        />
      </div>
    );
  }
}
