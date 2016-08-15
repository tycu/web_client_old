import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import DateStore from "../../stores/DateStore";

export default class YearList extends React.Component {
  constructor(props) {
    super(props)

    this.getYears = this.getYears.bind(this);

    this.state = {
      availableYears: DateStore.getYears(),
      value: this.props.value
    }
  }

  handleYearChange(event) {
    this.props.onChange(event.target.value, true);
  }

  getYears() {
    this.setState({
      availableYears: DateStore.getYears(),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      exp_year: nextProps.value
    });
  }


  render () {
    const { availableYears } = this.state;
    const { exp_year }  = this.state;

    const yearList = availableYears.map((yearItem, i) => {
      return  <option
                value={yearItem.value}
                key={i}>{yearItem.label}
              </option>
    });

    return (
      <div className="form-group" style={this.props.style}>
        <label htmlFor="exp_month">&nbsp;</label>
        <select
          class="form-control"
          type="select"
          value={exp_year}
          style={this.props.style}
          onChange={this.handleYearChange.bind(this)}
          id="ccExpiryYear">
          {yearList}
        </select>
      </div>
    )
  }
}
