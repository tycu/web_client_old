import React from 'react';
import { Link, browserHistory } from "react-router";
import { collections } from 'lodash';
import PacStore from "../../../stores/PacStore";
import * as PacActions from "../../../actions/PacActions";

import Messages from '../../../components/layout/Messages';
import ColorField from './ColorField';

export default class EditPac extends React.Component {
  constructor() {
    super();
    this.getPac = this.getPac.bind(this);

    this.state = {
      pac: PacStore.getPac(),
      key: 1
    };
  }

  static propTypes = {
    pac: React.PropTypes.shape({
      id: React.PropTypes.number,
      name: React.PropTypes.string,
      description: React.PropTypes.string,
      color: React.PropTypes.string,
      twitterUsername: React.PropTypes.string
    })
  }

  componentDidMount() {
    const pacId = this.props.params.pacId;
    PacActions.fetchPac(pacId);
    PacStore.addChangeListener(this.getPac);
  }

  componentWillUnmount() {
    PacStore.removeChangeListener(this.getPac);
  }

  getPac() {
    this.setState({
      pac: PacStore.getPac(),
      message: PacStore.getMessage(),
      error: PacStore.getError(),
      key: Math.random()
    })
  }

  onUpdate(key, e) {
    let pac = this.state.pac;

    if (key === 'color') {
      pac[key] = e;
    } else {
      var val = e.target.value;
      pac[key] = val;
    }
    this.setState(pac);
  }

  validPac() {
    var that = this;
    var requiredFields = ['description', 'name', 'color'];
    var shouldContinue = true;

    _(requiredFields).forEach(function(value) {
      if (_.isEmpty(that.state.pac[value])) {
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
        name: this.state.pac.name,
        description: this.state.pac.description,
        color: this.state.pac.color,
        twitterUsername: this.state.pac.twitterUsername
      });
      browserHistory.replace('/manage_pacs');
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
      color: {

      }
    }

    return (
      <div style={style.container}>
        <form role="form">
          <h2>Edit Pac</h2>
          <Messages {...this.state} />

          <div className="form-group" style={style.name}>
            <label htmlFor="name">Name</label>
            <input type="text" value={this.state.pac.name} onChange={this.onUpdate.bind(this, 'name')} className="form-control" id="name" ref="name" placeholder="pac name" />
          </div>
          <div className="form-group" style={style.description}>
            <label htmlFor="description">Description</label>
            <input type="text" value={this.state.pac.description} onChange={this.onUpdate.bind(this, 'description')} className="form-control" id="streetAddress" ref="description" placeholder="description" />
          </div>
          <div className="form-group" style={style.twitterUsername}>
            <label htmlFor="twitterUsername">Twitter Username</label>
            <input type="text" value={this.state.pac.twitterUsername} onChange={this.onUpdate.bind(this, 'twitterUsername')} className="form-control" id="twitterUsername" ref="twitterUsername" placeholder="twitter username" />
          </div>
          <div className="form-group" style={style.color}>
            <label htmlFor="name">Color</label>
            <ColorField value={this.state.pac.color} onChange={this.onUpdate.bind(this, 'color')} />
          </div>
          <div className='form-group'>
            <button type="submit" className="btn btn-primary" onClick={this.updatePac.bind(this)}>Save Pac</button>
          </div>
        </form>
        <Link to='/manage_pacs'>Back To Pacs</Link>
      </div>
    );
  }
}
