import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import * as PoliticianActions from "../../../actions/PoliticianActions";

import PoliticianStore from "../../../stores/PoliticianStore";

export default class PoliticiansField extends React.Component {
  constructor(props) {
    super(props)
    this.getPoliticians = this.getPoliticians.bind(this);

    this.state = {
      politicians: PoliticianStore.getPoliticians(),
      value: this.props.value
    }
  }

  handlePoliticianChange(event) {
    this.props.onChange(event.target.value);
  }

  getPoliticians() {
    this.setState({
      politicians: PoliticianStore.getPoliticians()
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      politicianId: nextProps.value
    });
  }

  componentDidMount() {
    PoliticianActions.fetchPoliticians();
    PoliticianStore.addChangeListener(this.getPoliticians);
  }

  componentWillUnmount() {
    PoliticianStore.removeChangeListener(this.getPoliticians);
  }


  render () {
    // const politicians = this.state.politicians || [];
    const { politicians }   = this.state;
    const { politicianId }  = this.state;

    const style = {
      container: {
        width: '300px'
      }
    }

    const politicianList = politicians.map((politician, i) => {
      return <option
               value={politician.id}
               key={i}>{politician.lastName}, {politician.firstName}
             </option>
    });

    return (
      <div style={style.container}>
        <select
          class="form-control"
          type="select"
          value={politicianId}
          onChange={this.handlePoliticianChange.bind(this)}
          id="politicianList">
          <option value='' key='0'>Select a politician</option>
          {politicianList}
        </select>
      </div>
    )
  }
}
