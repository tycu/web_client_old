import React from 'react';
import DateStore from "../../stores/DateStore";

export default class MonthList extends React.Component {
  state = {
    availableMonths: DateStore.getMonths(),
    value: this.props.value
  }

  handleMonthChange(event) {
    this.props.onChange(event.target.value, true);
  }

  getMonths() {
    this.setState({
      availableMonths: DateStore.getMonths()
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      card: {
        exp_month: nextProps.value
      }
    });
  }


  render () {
    const { availableMonths } = this.state;
    const { exp_month }  = this.state;
    const monthList = availableMonths.map((monthItem, i) => {
      return (  <option
                  value={monthItem.value}
                  key={i}>{monthItem.label}
                </option>
             );
    });

    return (
      <div className="form-group" style={this.props.style}>
        <label htmlFor="exp_month">Expiration Date</label>
        <select
          class="form-control"
          type="select"
          value={exp_month}
          style={this.props.style}
          onChange={this.handleMonthChange.bind(this)}
          id="ccExpiryMonth">
          {monthList}
        </select>
      </div>
    );
  }
}
