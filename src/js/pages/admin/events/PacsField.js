import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import PacStore from "../../../stores/PacStore";
import * as PacActions from "../../../actions/PacActions";

export default class PacsField extends React.Component {
  constructor(props) {
    super(props)
    // this.getPacs = this.getPacs.bind(this);

    this.state = {
      // availablePacs: PacStore.getPacs(),
      // eventId: '',
      pacId: '',
      support: true,
      value: this.props.value
    }
  }

  static propTypes = {
    // availablePacs: React.PropTypes.array,
    pacId:  React.PropTypes.number,
    support:  React.PropTypes.bool
  }

  handlePacChange(event) {
    this.props.setPacId(event.target.value); // , this.props.support
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pacId: nextProps.value
    });
  }

  // componentDidMount() {
  //   PacActions.fetchPacs();
  //   PacStore.addChangeListener(this.getPacs);
  // }

  // componentWillUnmount() {
  //   PacStore.removeChangeListener(this.getPacs);
  // }

  // getPacs() {
  //   this.setState({
  //     availablePacs: PacStore.getPacs()
  //   })
  // }

  deletePac(key, e) {
    e.preventDefault();

    debugger;
  }

  render () {
    const availablePacs = this.props.availablePacs || [];
    const { pacId }  = this.props;
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
        <button style={style.delete} onClick={this.deletePac.bind(this, 'supportPacs')}>Delete</button>
      </div>
    )
  }
}
