import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import AuthStore from './AuthStore';
import { collections } from 'lodash';
import request from 'reqwest';
import when from 'when';
import * as Constants from '../constants/AdminContributionConstants';


class AdminContributionStore extends EventEmitter {
  constructor() {
    super()
  }

  getAdminContributions() {
    return this.contributions || [];
  }

  getMessage() {
    return this.message;
  };

  getError() {
    return this.error;
  };


  fetchAdminContributions(offset) {
    var that = this;
    var url = Constants.GET_ADMIN_CONTRIBUTIONS;
    var tokenLocal = AuthStore.getAuthToken();

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
        console.log("Error loading contributions", response);
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
    // console.log("EventStore received an action", action);

    switch(action.type) {
      case "FETCH_ADMIN_CONTRIBUTIONS": {
        this.fetchAdminContributions(action.offset);
        break;
      }
    }
  }
}

const adminContributionStore = new AdminContributionStore;
dispatcher.register(adminContributionStore.handleActions.bind(adminContributionStore));

export default adminContributionStore;
