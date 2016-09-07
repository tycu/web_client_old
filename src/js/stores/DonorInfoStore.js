import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import AuthStore from './AuthStore';
import * as Constants from '../constants/UserConstants';
import request from 'reqwest';
import when from 'when';

class DonorInfoStore extends EventEmitter {
  constructor() {
    super()
  }
  getDonorInfo() {
    return this.donorInfo || {
      occupation: '',
      employer: '',
      picSquare: '',
      name: '',
      streetAddress: '',
      city: '',
      residenceState: '',
      zip: ''
    };
  }

  getMessage() {
    return this.message;
  }

  getError() {
    return this.error;
  }

  checkEmployed() {
    return this.donorInfo.occupation !== 'NA' || this.donorInfo.employer !== 'NA';
  }

  loadDonorInfo(userId) {
    var that = this;
    const url = Constants.USER_URL;
    const tokenLocal = AuthStore.getAuthToken();

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
      var donorInfo = {};
      donorInfo['occupation'] = response.occupation || '';
      donorInfo['employer'] = response.employer || '';
      donorInfo['name'] = response.name || '';
      donorInfo['streetAddress'] = response.streetAddress || '';
      donorInfo['picSquare'] = response.picSquare || '';
      donorInfo['city'] = response.city || '';
      donorInfo['residenceState'] = response.residenceState || '';
      donorInfo['zip'] = response.zip || '';
      that.donorInfo = donorInfo;
      that.error = '';
      that.emit('change');
    })
    .catch(function(response) {
      if ((response.status !== 200) || response.status !== 304) {
        that.message = 'Error Updating Donor Info';
        console.log("Error loading events", response);
      }
    });
  }

  updateDonorInfo(userId, donorInfo) {
    const tokenLocal = AuthStore.getAuthToken();
    const url = Constants.USER_URL;
    var that = this;

    return when(request({
      url: url + userId,
      method: 'PUT',
      crossOrigin: true,
      type: 'json',
      headers: {
        authorization: "Bearer " + tokenLocal
      },
      data: {
        donorInfo: donorInfo
      }
    }))
    .then(function(response) {
      that.message = 'Donor Info Successfully Updated';
      that.error = '';
      that.donorInfo = donorInfo;
      that.emit('change');
    })
    .catch(function(response) {
      if ((response.status !== 200) || response.status !== 304) {
        that.message = '';
        that.error = 'Error Updating Donor Info';
        console.log("Error loading events", response);
        that.donorInfo = donorInfo;
        that.emit('change');
      }
    })
  }

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
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
