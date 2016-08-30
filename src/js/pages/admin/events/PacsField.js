import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import * as PacEventActions from "../../../actions/PacEventActions";

export default class PacsField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      eventId: '',
      pacEventId: '',
      pacId: '',
      support: true,
      newPacField: true,
      value: this.props.value
    }
  }

  static propTypes = {
    eventId: React.PropTypes.string,
    pacEventId: React.PropTypes.number,
    pacId:  React.PropTypes.number,
    support:  React.PropTypes.bool,
    newPacField: React.PropTypes.bool
  }

  handlePacChange(event) {
    this.props.setPacId(event.target.value);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pacId: nextProps.value
    });
  }

  deletePacEvent(key, e) {
    e.preventDefault();
    PacEventActions.deletePacEvent(this.props.eventId, key)
    this.handlePacChange(e);
  }

  render () {
    const availablePacs = this.props.availablePacs || [];
    const { pacId }  = this.props;
    const { id } = this.props;
    const { pacType } = this.props;
    const style = {
      container: {
        width: '300px',
        display: 'inline'
      },
      select: {
        width: '300px',
        display: 'inline'
      },
      delete: {
        marginLeft: '20px',
        width: '60px'
      }
    }

    const pacList = availablePacs.map((pac, i) => {
      return <option
               value={pac.id}
               key={i}>{pac.name}</option>
    });

    return (
      <div style={style.container}>
        <select
          class="form-control pacList"
          type="select"
          value={pacId}
          onChange={this.handlePacChange.bind(this)}
          style={style.select}>
          <option value='' key='0'>Select a Pac</option>
          {pacList}
        </select>
        <button style={style.delete} onClick={this.deletePacEvent.bind(this, id)}>Delete</button>
        <br/>
      </div>
    )
  }
}
