import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import * as PacEventActions from "../../../actions/PacEventActions";

export default class PacsFieldStatic extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      eventId: '',
      pacEventId: '',
      pacId: '',
      support: true,
      value: this.props.value
    }
  }

  static propTypes = {
    eventId: React.PropTypes.string,
    pacEventId: React.PropTypes.number,
    pacId:  React.PropTypes.number,
    support:  React.PropTypes.bool,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pacId: nextProps.value
    });
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
      if (pac.id === pacId) {
        return <span key={i}>{pac.id}: {pac.name}, color: {pac.color}</span>
      }
    });

    return (
      <div style={style.container}>
        {pacList}
      </div>
    )
  }
}
