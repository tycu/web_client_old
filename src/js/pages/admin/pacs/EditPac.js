import React from 'react';
import { Link, browserHistory } from "react-router";
import { collections } from 'lodash';
import PacStore from "../../../stores/PacStore";
import * as PacActions from "../../../actions/PacActions";

import Messages from '../../../components/layout/Messages';
import ColorField from './ColorField';

export default class EditPac extends React.Component {
  displayName = 'Event'

  static propTypes = {
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    color: React.PropTypes.string,
    twitterUsername: React.PropTypes.string
  }

  state = {
    id: '',
    name: '',
    description: '',
    color: '',
    twitterUsername: '',
    key: 1
  }

  componentWillMount() {
    PacStore.on("change", () => {
      this.setState({
        description: PacStore.getDescription(),
        name: PacStore.getName(),
        color: PacStore.getColor(),
        twitterUsername: PacStore.getTwitterUsername(),
        message: PacStore.getMessage(),
        error: PacStore.getError(),
        key: Math.random()
      })
    });
  }

  componentWillUnmount() {
    PacStore.removeListener("change", this.getPac);
  }

  componentDidMount() {
    this.getPac();
  }

  getPac() {
    const pacId = this.props.params.pacId;
    PacActions.fetchPac(pacId);
  }


  onUpdate(field, event) {
    if (field === 'color') {
      this.setState({color: event});
    } else {
      var object = {};
      object[field] = event.target.value;
      this.setState(object);
    }
  }


  validPac() {
    var that = this;
    var requiredFields = ['description', 'name', 'color'];
    var shouldContinue = true;

    _(requiredFields).forEach(function(value) {
      if (_.isEmpty(that.state[value])) {
        shouldContinue = false
        return false;
      }
    });
    return shouldContinue;
  }

  updatePac(e) {
    e.preventDefault();
    var that = this;

    if (!that.validPac()) {
      that.setState({error: "You must complete all Fields"});
      return false;
    } else {
      that.setState({error: ""});
      const pacId = that.props.params.pacId;

      PacActions.updatePac(pacId, {
        name: this.state.name,
        description: this.state.description,
        color: this.state.color,
        twitterUsername: this.state.twitterUsername
      });
      browserHistory.push('manage_pacs');
    }
  }


  render() {
    const style = {
      container: {

      },
      name: {

      },
      description: {

      },
      twitterUsername: {

      },
      residenceState: {

      }
    }

    const { id, name, description, color, twitterUsername } = this.props;

    // const linkTo = "edit_pacs/" + id;

    return (
      <div style={style.container}>
        <form role="form">
          <h2>Edit Pac</h2>
          <Messages {...this.state} />

          <div className="form-group" style={style.name}>
            <label htmlFor="name">Name</label>
            <input type="text" value={this.state.name} onChange={this.onUpdate.bind(this, 'name')} className="form-control" id="name" ref="name" placeholder="pac name" />
          </div>
          <div className="form-group" style={style.description}>
            <label htmlFor="description">Description</label>
            <input type="text" value={this.state.description} onChange={this.onUpdate.bind(this, 'description')} className="form-control" id="streetAddress" ref="description" placeholder="description" />
          </div>
          <div className="form-group" style={style.twitterUsername}>
            <label htmlFor="twitterUsername">Twitter Username</label>
            <input type="text" value={this.state.twitterUsername} onChange={this.onUpdate.bind(this, 'twitterUsername')} className="form-control" id="twitterUsername" ref="twitterUsername" placeholder="twitter username" />
          </div>
          <div className="form-group" style={style.residenceState}>
            <label htmlFor="name">Color</label>
            <ColorField value={this.state.color} onChange={this.onUpdate.bind(this, 'color')} />
          </div>
          <div className='form-group'>
            <button type="submit" className="btn btn-primary" onClick={this.updatePac.bind(this)}>Save Pac</button>
          </div>
        </form>
        <Link to='manage_pacs'>Back To Pacs</Link>
      </div>
    );
  }
}
