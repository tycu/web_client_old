// import Dropdown from 'react-drop-down'
import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import StateStore from "../stores/StateStore";

export default class StatesField extends React.Component {
  constructor(props) {
    super(props)

    this.getTodos = this.getTodos.bind(this);
    this.state = {
      availableStates: StateStore.getAll()
    }
  }

  componentWillMount() {
    this.setState({
      availableStates: StateStore.getAll()
    });
  }

  handleChange (e) {
    this.setState({
      value: e
    })
  }

  getTodos() {
    this.setState({
      availableStates: StateStore.getAll(),
    });
  }


  render () {
    const { availableStates } = this.state;

    const stateList = availableStates.map((stateItem, i) => {
      return <option value={stateItem.value} key={i}>{stateItem.value}</option>
    });

    return (
      <div>
        <select type='select' value={this.state.value}
                  onChange={this.handleChange.bind(this)} >
          {stateList}
        </select>
      </div>
    )
  }
}