import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
var Promise = require("bluebird");
import AuthStore from './AuthStore';
import * as Constants from '../constants/UserConstants';
import request from 'reqwest';
import when from 'when';

class DonorInfoStore extends EventEmitter {
  constructor() {
    super()
  }

  loadDonorInfo(userId) {
    var that = this;
    var url = Constants.USER_URL;
    var tokenLocal = AuthStore.getAuthToken();

    return when(request({
      url: url + userId,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
        authorization: "Bearer " + tokenLocal
      }
    }))
    .then(function(response) {
      that.occupation = response.occupation || '';
      that.employer = response.employer || '';
      that.name = response.name || '';
      that.streetAddress = response.streetAddress || '';
      that.city = response.city || '';
      that.residenceState = response.residenceState || '';
      that.zip = response.zip || '';
      that.emit('change');
    })
    .catch(function(response) {
      if ((response.status !== 200) || response.status !== 304) {
        alert("There is an error loading donorInfo");
        console.log("Error loading events", response);
      }
    });
  }

  getOccupation() {
    return this.occupation;
  };

  getEmployer() {
    return this.employer;
  };

  getName() {
    return this.name;
  };

  getStreetAddress() {
    return this.streetAddress;
  };

  getCity() {
    return this.city;
  };

  getResidenceState() {
    return this.residenceState;
  };

  getZip() {
    return this.zip;
  };

  updateDonorInfo(userId, donorInfo) {
    var tokenLocal = AuthStore.getAuthToken();
    var url = Constants.USER_URL;

    var res = Promise.resolve(
      request({
        url: url + userId,
        type: 'json',
        crossOrigin: true,
        method: 'PUT',
        headers: {
          authorization: "Bearer " + tokenLocal
        },
        data: {
          donorInfo: donorInfo
        }
      })
    );
    this.occupation = donorInfo.occupation
    this.employer = donorInfo.employer
    this.name = donorInfo.name
    this.streetAddress = donorInfo.streetAddress
    this.city = donorInfo.city
    this.residenceState = donorInfo.residenceState
    this.zip = donorInfo.zip
    this.emit('change');
  }

  handleActions(action) {
    // console.log("DonorInfoStore received an action", action);
    switch(action.type) {

      case "UPDATE_DONOR_INFO": {
        this.updateDonorInfo(action.userId, action.donorInfo);
        break;
      }
      case "FETCH_DONOR_INFO": {
        this.loadDonorInfo(action.userId);
        break;
      }
    }
  }
}

const donorInfoStore = new DonorInfoStore;
dispatcher.register(donorInfoStore.handleActions.bind(donorInfoStore));

export default donorInfoStore;
