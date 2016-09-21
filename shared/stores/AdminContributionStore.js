import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import AuthStore from './AuthStore';
import { collections } from 'lodash';
import request from 'reqwest';
import when from 'when';
import * as Constants from '../constants/AdminContributionConstants';

class AdminContributionStore extends EventEmitter {

  getAdminContributions() {
    return this.contributions || [];
  }

  getEventContributionSum() {
    return this.eventContributionSum;
  }

  getMessage() {
    return this.message;
  }

  getError() {
    return this.error;
  }

  fetchAdminContributions(offset) {
    const that = this;
    const url = Constants.GET_ADMIN_CONTRIBUTIONS;
    const tokenLocal = AuthStore.getAuthToken();

    return when(request({
      url: url,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      data: {
        offset: offset
      },
      headers: {
        authorization: "Bearer " + tokenLocal
      }
    }))
    .then(function(response) {
      that.contributions = response;
      that.emit('change');
    })
    .catch(function(response) {
      if ((response.status !== 200) || response.status !== 304) {
        that.error = "Error loading contributions";
        that.emit('change');
      }
    });
  }

  fetchEventContributionSum(eventId) {
    const that = this;
    const url = Constants.FETCH_EVENT_CONTRIBUTION_SUM;
    const tokenLocal = AuthStore.getAuthToken();

    return when(request({
      url: url + eventId + '/contributions',
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
        authorization: "Bearer " + tokenLocal
      }
    }))
    .then(function(response) {
      that.eventContributionSum = response.total;
      that.emit('change');
    })
    .catch(function(response) {
      if ((response.status !== 200) || response.status !== 304) {
        that.error = "Error loading eventContributionSum";
        that.emit('change');
      }
    });
  }


  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

  handleActions(action) {
    // console.log("EventStore received an action", action);

    switch(action.type) {
      case "FETCH_ADMIN_CONTRIBUTIONS": {
        this.fetchAdminContributions(action.offset);
        break;
      }
    }
    switch(action.type) {
      case "FETCH_EVENT_CONTRIBUTION_SUM": {
        this.fetchEventContributionSum(action.eventId);
        break;
      }
    }

  }
}

const adminContributionStore = new AdminContributionStore;
dispatcher.register(adminContributionStore.handleActions.bind(adminContributionStore));

export default adminContributionStore;
