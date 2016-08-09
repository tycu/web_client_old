import React from "react";
import StatesField from "../components/StatesField";
import * as DonorInfoActions from "../actions/DonorInfoActions";
import DonorInfoStore from "../stores/DonorInfoStore";
import AuthStore from '../stores/AuthStore';
import MessageErrors from '../components/layout/MessageErrors';
import { collections } from 'lodash';

export default class DonorInfo extends React.Component {

  static propTypes = {
    hideEmployerOccupation:  React.PropTypes.bool,
    employed:  React.PropTypes.bool,
    message: React.PropTypes.string,
    error:  React.PropTypes.string,
  }

  state = {
    hideEmployerOccupation: false,
    employed: true,
    message: '',
    error: ''
  }

  checkEmployed() {
    this.state.occupation !== 'NA' || this.state.employer !== 'NA'
  }

  componentWillMount() {
    DonorInfoStore.on("change", () => {
      this.setState({
        occupation: DonorInfoStore.getOccupation(),
        employer: DonorInfoStore.getEmployer(),
        name: DonorInfoStore.getName(),
        streetAddress: DonorInfoStore.getStreetAddress(),
        city: DonorInfoStore.getCity(),
        residenceState: DonorInfoStore.getResidenceState(),
        zip: DonorInfoStore.getZip(),
        employed: this.checkEmployed()
      })
    });
  }

  componentWillUnmount() {
    DonorInfoStore.removeListener("change", this.getDonorInfo);
  }

  componentDidMount() {
    this.getDonorInfo();
  }

  getDonorInfo() {
    var userId = AuthStore.currentUserId();
    DonorInfoActions.fetchDonorInfo(userId);
  }

  donorInfoComplete() {
    var that = this;
    var requiredFields = ['occupation', 'employer', 'name', 'streetAddress', 'city', 'residenceState', 'zip'];
    var shouldContinue = true;

    _(requiredFields).forEach(function(value) {
      if (_.isEmpty(that.state[value])) {
        shouldContinue = false
        return false;
      }
    });
    return shouldContinue;
  }

  updateDonorInfo(e) {
    e.preventDefault();
    var that = this;

    if (!that.donorInfoComplete()) {
      that.setState({error: "You must complete all Fields"});
      return false;
    } else {
      var userId = AuthStore.currentUserId();

      DonorInfoActions.updateDonorInfo(userId, {
        occupation: this.state.occupation,
        employer: this.state.employer,
        name: this.state.name,
        streetAddress: this.state.streetAddress,
        city: this.state.city,
        residenceState: this.state.residenceState,
        zip: this.state.zip
      });
    }
  }

  onUpdate(field, event) {
    if (field === 'residenceState') {
      this.setState({residenceState: event});
    } else if (field === 'employed') {
      if (event.target.checked === true) {
        this.setState({
          occupation: 'NA',
          employer: 'NA',
          employed: false
        })
      } else {
        this.setState({
          occupation: '',
          employer: '',
          employed: true
        })
      }
    } else {
      var object = {};
      object[field] = event.target.value;
      this.setState(object);
    }
  }


  render() {
    const retiredEmployed = {
      marginLeft: '10px'
    }

    // TODO make incomplete fields highlighted red on error
    return (
      <div className="signin jumbotron center-block">
        <h2>Donor Info</h2>
        <form role="form">
          <MessageErrors {...this.state} />
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" value={this.state.name} onChange={this.onUpdate.bind(this, 'name')} className="form-control" id="name" ref="name" placeholder="Full Name" />
          </div>
          <div className="form-group">
            <label htmlFor="streetAddress">Street Address</label>
            <input type="text" value={this.state.streetAddress} onChange={this.onUpdate.bind(this, 'streetAddress')} className="form-control" id="streetAddress" ref="streetAddress" placeholder="Street Address" />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" value={this.state.city} onChange={this.onUpdate.bind(this, 'city')} className="form-control" id="city" ref="city" placeholder="City" />
          </div>

          <div className="form-group">
            <label htmlFor="name">State</label>
            <StatesField value={this.state.residenceState} onChange={this.onUpdate.bind(this, 'residenceState')} />
          </div>

          <div className="form-group">
            <label htmlFor="name">Zip</label>
            <input type="text" value={this.state.zip} onChange={this.onUpdate.bind(this, 'zip')} className="form-control" id="zip" ref="zip" placeholder="Zip" />
          </div>

          <div className="form-group">
            <label htmlFor="employed">Retired or Unemployed</label>
            <input style={retiredEmployed} type="checkbox" checked={!this.state.employed} onChange={this.onUpdate.bind(this, 'employed')} />
          </div>

          <div className='form-group'>
            <label htmlFor="occupation">Occupation</label>
            <input type="text" value={this.state.occupation} onChange={this.onUpdate.bind(this, 'occupation')} className="form-control" id="occupation" ref="occupation" placeholder="occupation" />
          </div>
          <div className='form-group'>
            <label htmlFor="employer">Employer</label>
            <input type="text" value={this.state.employer} onChange={this.onUpdate.bind(this, 'employer')} className="form-control" id="employer" ref="employer" placeholder="employer" />
          </div>

          <div className='form-group'>
            <button type="submit" className="btn btn-default" onClick={this.updateDonorInfo.bind(this)}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
