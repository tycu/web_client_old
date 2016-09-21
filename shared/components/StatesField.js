import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import StateStore from "../stores/StateStore";

export default class StatesField extends React.Component {
  constructor(props) {
    super(props)
    this.getStates = this.getStates.bind(this);

    this.state = {
      availableStates: StateStore.getStateFields(),
      value: this.props.value
    }
  }

  handleStateChange(event) {
    this.props.onChange(event.target.value);
  }

  getStates() {
    this.setState({
      availableStates: StateStore.getStateFields(),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      residenceState: nextProps.value
    });
  }

  render () {
    const { availableStates } = this.state;
    const { residenceState }  = this.state;

    const stateList = availableStates.map((stateItem, i) => {
      return  <option
                value={stateItem.value}
                key={i}>{stateItem.value}
              </option>
    });

    return (
      <div>
        <select
          class="form-control"
          type="select"
          value={residenceState}
          onChange={this.handleStateChange.bind(this)}
          id="residenceState">
          <option value=''>Select State</option>
          {stateList}
        </select>
      </div>
    )
  }
}
