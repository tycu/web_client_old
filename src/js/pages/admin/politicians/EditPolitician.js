import React from 'react';
import { Link, browserHistory } from "react-router";
import { collections } from 'lodash';
import PoliticianStore from "../../../stores/PoliticianStore";
import * as PoliticianActions from "../../../actions/PoliticianActions";
import Messages from '../../../components/layout/Messages';

export default class EditPolitician extends React.Component {
  constructor() {
    super();
    this.getPolitician = this.getPolitician.bind(this);

    this.state = {
      politician: PoliticianStore.getPolitician(),
      key: 1
    };
  }

  static propTypes = {
    politician: React.PropTypes.shape({
      thumbnail: React.PropTypes.string,
      firstName: React.PropTypes.string,
      lastName: React.PropTypes.string,
      jobTitle: React.PropTypes.string,
      twitterUsername: React.PropTypes.string
    })
  }

  componentDidMount() {
    const politicianId = this.props.params.politicianId;
    PoliticianActions.fetchPolitician(politicianId);
    PoliticianStore.addChangeListener(this.getPolitician);
  }

  componentWillUnmount() {
    PoliticianStore.removeChangeListener(this.getPolitician);
  }

  getPolitician() {
    this.setState({
      politician: PoliticianStore.getPolitician(),
      message: PoliticianStore.getMessage(),
      error: PoliticianStore.getError(),
      key: Math.random()
    })
  }

  onUpdate(key, e) {
    let politician = this.state.politician;

    if (key === 'color') {
      politician[key] = e;
    } else {
      var val = e.target.value;
      politician[key] = val;
    }
    this.setState(politician);
  }

  validPolitician() {
    var that = this;
    var requiredFields = ['thumbnail', 'firstName', 'lastName', 'jobTitle', 'twitterUsername'];
    var shouldContinue = true;

    _(requiredFields).forEach(function(value) {
      if (_.isEmpty(that.state.politician[value])) {
        shouldContinue = false
        return false;
      }
    });
    return shouldContinue;
  }

  updatePolitician(e) {
    e.preventDefault();
    var that = this;

    if (!that.validPolitician()) {
      that.setState({error: "You must complete all Fields"});
      return false;
    } else {
      that.setState({error: ""});
      const politicianId = that.props.params.politicianId;

      PoliticianActions.updatePolitician(politicianId, {
        thumbnail: this.state.politician.thumbnail,
        firstName: this.state.politician.firstName,
        lastName: this.state.politician.lastName,
        jobTitle: this.state.politician.jobTitle,
        twitterUsername: this.state.politician.twitterUsername
      });
      browserHistory.replace('/manage_politicians');
    }
  }


  render() {
    const style = {
      container: {

      },
      thumbnail: {

      },
      firstName: {

      },
      lastName: {

      },
      jobTitle: {

      },
      twitterUsername: {

      }
    }

    return (
      <div style={style.container}>
        <form role="form">
          <h2>Edit Politician</h2>
          <Messages {...this.state} />

          <div className="form-group" style={style.thumbnail}>
            <label htmlFor="thumbnail">thumbnail</label>
            <input type="text" value={this.state.politician.thumbnail} onChange={this.onUpdate.bind(this, 'thumbnail')} className="form-control" id="thumbnail" ref="thumbnail" placeholder="thumbnail" />
          </div>
          <div className="form-group" style={style.firstName}>
            <label htmlFor="firstName">firstName</label>
            <input type="text" value={this.state.politician.firstName} onChange={this.onUpdate.bind(this, 'firstName')} className="form-control" id="firstName" ref="firstName" placeholder="firstName" />
          </div>
          <div className="form-group" style={style.lastName}>
            <label htmlFor="lastName">lastName</label>
            <input type="text" value={this.state.politician.lastName} onChange={this.onUpdate.bind(this, 'lastName')} className="form-control" id="lastName" ref="lastName" placeholder="lastName" />
          </div>
          <div className="form-group" style={style.jobTitle}>
            <label htmlFor="jobTitle">jobTitle</label>
            <input type="text" value={this.state.politician.jobTitle} onChange={this.onUpdate.bind(this, 'jobTitle')} className="form-control" id="jobTitle" ref="jobTitle" placeholder="jobTitle" />
          </div>
          <div className="form-group" style={style.twitterUsername}>
            <label htmlFor="twitterUsername">twitterUsername</label>
            <input type="text" value={this.state.politician.twitterUsername} onChange={this.onUpdate.bind(this, 'twitterUsername')} className="form-control" id="twitterUsername" ref="twitterUsername" placeholder="twitterUsername" />
          </div>

          <div className='form-group'>
            <button type="submit" className="btn btn-primary" onClick={this.updatePolitician.bind(this)}>Save Politician</button>
          </div>
        </form>
        <Link to='/manage_politicians'>Back To Politicians</Link>
      </div>
    );
  }
}
