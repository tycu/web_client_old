import React from "react";
import StatesField from "../components/StatesField";
import * as DonorInfoActions from "../actions/DonorInfoActions";
import DonorInfoStore from "../stores/DonorInfoStore";
import AuthStore from '../stores/AuthStore';
import Messages from '../components/layout/Messages';
import { collections } from 'lodash';

import DonorCity from './donorInfo/DonorCity';
export default class DonorInfo extends React.Component {

  constructor() {
    super();
    this.getDonorInfo = this.getDonorInfo.bind(this);

    this.state = {
      donorInfo: DonorInfoStore.getDonorInfo(),
      hideEmployerOccupation: false,
      employed: true,
      message: '',
      error: '',
      cityError: false,
      occupationError: false,
      employerError: false,
      nameError: false,
      streetAddressError: false,
      residenceStateError: false,
      zipError: false
    };
  }

  static propTypes = {
    donorInfo: React.PropTypes.shape({
      occupation: React.PropTypes.string,
      employer: React.PropTypes.string,
      name: React.PropTypes.string,
      streetAddress: React.PropTypes.string,
      city: React.PropTypes.string,
      residenceState: React.PropTypes.string,
      zip: React.PropTypes.string,
    }),
    hideEmployerOccupation: React.PropTypes.bool,
    employed:  React.PropTypes.bool,
    message: React.PropTypes.string,
    error:  React.PropTypes.string,
    cityError: React.PropTypes.bool,
    occupationError: React.PropTypes.bool,
    employerError: React.PropTypes.bool,
    nameError: React.PropTypes.bool,
    streetAddressError: React.PropTypes.bool,
    residenceStateError: React.PropTypes.bool,
    zipError: React.PropTypes.bool
  }


  componentDidMount() {
    var userId = AuthStore.currentUserId();
    DonorInfoActions.fetchDonorInfo(userId);
    DonorInfoStore.addChangeListener(this.getDonorInfo);
  }

  componentWillUnmount() {
    DonorInfoStore.removeChangeListener(this.getDonorInfo);
  }

  getDonorInfo() {
    this.setState({
      donorInfo: DonorInfoStore.getDonorInfo(),
      message: DonorInfoStore.getMessage(),
      error: DonorInfoStore.getError(),
      employed: DonorInfoStore.checkEmployed()
    })
  }

  donorInfoComplete() {
    var that = this;
    var requiredFields = ['occupation', 'employer', 'name', 'streetAddress', 'city', 'residenceState', 'zip'];
    var shouldContinue = true;

    _(requiredFields).forEach(function(value) {
      if (_.isEmpty(that.state.donorInfo[value])) {
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
      that.setState({error: ""});
      var userId = AuthStore.currentUserId();

      DonorInfoActions.updateDonorInfo(userId, {
        occupation: this.state.donorInfo.occupation,
        employer: this.state.donorInfo.employer,
        name: this.state.donorInfo.name,
        streetAddress: this.state.donorInfo.streetAddress,
        city: this.state.donorInfo.city,
        residenceState: this.state.donorInfo.residenceState,
        zip: this.state.donorInfo.zip
      });
    }
  }

  onUpdate(key, e) {
    let donorInfo = this.state.donorInfo;

    if (key === 'residenceState') {
      donorInfo[key] = e;
    } else if (key === 'employed') {
      if (e.target.checked === true) {
        donorInfo['occupation'] = 'NA';
        donorInfo['employer'] = 'NA';
        this.setState({
          employed: false
        })
      } else {
        donorInfo['occupation'] = '';
        donorInfo['employer'] = '';
        this.setState({
          employed: true
        })
      }
    } else {
      var val = e.target.value;
      donorInfo[key] = val;
    }
    this.setState(donorInfo);
  }

  render() {
    const style = {
      container: {
        padding: '20px',
        background: 'white',
        width: '490px',
        borderRadius: '2px'
      },
      employed: {
        marginLeft: '10px',
        clear: 'both',
        width: '300px'
      },
      city: {
        width: '200px',
        display: 'inline',
        float: 'left',
        marginRight: '20px'
      },
      residenceState: {
        width: '90px',
        display: 'inline',
        float: 'left',
        marginRight: '20px'
      },
      zip: {
        width: '100px',
        display: 'inline',
        float: 'left',
        marginRight: '20px'
      }
    }

    // TODO make incomplete fields highlighted red on error
    return (
      <div className="jumbotron center-block" style={style.container}>
        <h2>Donor Info</h2>
        <form role="form">
          <Messages {...this.state} />
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" value={this.state.donorInfo.name} onChange={this.onUpdate.bind(this, 'name')} className="form-control" id="name" ref="name" placeholder="Full Name" />
          </div>
          <div className="form-group">
            <label htmlFor="streetAddress">Street Address</label>
            <input type="text" value={this.state.donorInfo.streetAddress} onChange={this.onUpdate.bind(this, 'streetAddress')} className="form-control" id="streetAddress" ref="streetAddress" placeholder="Street Address" />
          </div>
          <div className="form-group" style={style.city}>
            <label htmlFor="city">City</label>
            <input type="text" value={this.state.donorInfo.city} onChange={this.onUpdate.bind(this, 'city')} className="form-control" id="city" ref="city" placeholder="City" />
          </div>

          <div className="form-group" style={style.residenceState}>
            <label htmlFor="name">State</label>
            <StatesField value={this.state.donorInfo.residenceState} onChange={this.onUpdate.bind(this, 'residenceState')} />
          </div>

          <div className="form-group" style={style.zip}>
            <label htmlFor="name">Zip</label>
            <input type="text" value={this.state.donorInfo.zip} onChange={this.onUpdate.bind(this, 'zip')} className="form-control" id="zip" ref="zip" placeholder="Zip" />
          </div>
          <br/>

          <div className="form-group">
            <label htmlFor="employed">Retired or Unemployed</label>
            <input style={style.employed} type="checkbox" checked={!this.state.employed} onChange={this.onUpdate.bind(this, 'employed')} />
          </div>

          <div className='form-group'>
            <label htmlFor="occupation">Occupation</label>
            <input type="text" value={this.state.donorInfo.occupation} onChange={this.onUpdate.bind(this, 'occupation')} className="form-control" id="occupation" ref="occupation" placeholder="occupation" />
          </div>
          <div className='form-group'>
            <label htmlFor="employer">Employer</label>
            <input type="text" value={this.state.donorInfo.employer} onChange={this.onUpdate.bind(this, 'employer')} className="form-control" id="employer" ref="employer" placeholder="employer" />
          </div>

          <div className='form-group'>
            <button type="submit" className="btn btn-primary" onClick={this.updateDonorInfo.bind(this)}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
