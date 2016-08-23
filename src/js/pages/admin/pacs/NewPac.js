import React from 'react';
import { Link, browserHistory } from "react-router";
import { collections } from 'lodash';
import PacStore from "../../../stores/PacStore";
import * as PacActions from "../../../actions/PacActions";

import Messages from '../../../components/layout/Messages';
import ColorField from './ColorField';

export default class NewPac extends React.Component {

  constructor() {
    super();

    this.state = {
      pac: {
        name: '',
        description: '',
        color: '',
        twitterUsername: ''
      },
      key: 1
    };
  }

  static propTypes = {
    pac: React.PropTypes.shape({
      name: React.PropTypes.string,
      description: React.PropTypes.string,
      color: React.PropTypes.string,
      twitterUsername: React.PropTypes.string
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

  createPac(e) {
    e.preventDefault();
    var that = this;

    if (!that.validPac()) {
      that.setState({error: "You must complete all Fields"});
      return false;
    } else {
      that.setState({error: ""});

      PacActions.createPac({
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

    const { name, description, color, twitterUsername } = this.props;

    // const linkTo = "edit_pacs/" + id;

    return (
      <div style={style.container}>
        <form role="form">
          <h2>New Pac</h2>
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
            <button type="submit" className="btn btn-primary" onClick={this.createPac.bind(this)}>Create Pac</button>
          </div>
        </form>
        <Link to='manage_pacs'>Back To Pacs</Link>
      </div>
    );
  }
}
