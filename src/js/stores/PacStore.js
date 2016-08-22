import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
var Promise = require("bluebird");
import AuthStore from './AuthStore';
import * as Constants from '../constants/PacConstants';
import request from 'reqwest';
import when from 'when';

class PacStore extends EventEmitter {
  constructor() {
    super()
  }

  getPacs() {
    return this.pacs;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getColor() {
    return this.color;
  }

  getTwitterUsername() {
    return this.twitterUsername;
  }

  getMessage() {
    return this.message;
  };

  getError() {
    return this.error;
  };

  fetchPacs() {
    var that = this;
    var url = Constants.GET_PACS;
    var tokenLocal = AuthStore.getAuthToken();

    return when(request({
      url: url,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
        authorization: "Bearer " + tokenLocal
      }
    }))
    .then(function(response) {
      that.pacs = response || [];
      that.emit('change');
    })
    .catch(function(response) {
      if (response.status !== 200) {
        alert("There is an error loading pacs");
        console.log("Error loading pacs", response);
      }
    });
  }

  fetchPac (pacId) {
    var that = this;
    var url = Constants.GET_PAC;
    var tokenLocal = AuthStore.getAuthToken();

    return when(request({
      url: url + pacId,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
        authorization: "Bearer " + tokenLocal
      }
    }))
    .then(function(response) {
      that.name = response.name || '';
      that.description = response.description || '';
      that.color = response.color || '';
      that.twitterUsername = response.twitterUsername || '';
      that.emit('change');
    })
    .catch(function(response) {
      if ((response.status !== 200) || response.status !== 304) {
        alert("There is an error loading pac");
        console.log("Error loading pac", response);
      }
    });
  }

  updatePac(pacId, pacInfo) {
    var tokenLocal = AuthStore.getAuthToken();
    var url = Constants.UPDATE_PAC;

    var res = Promise.resolve(
      request({
        url: url + pacId,
        type: 'json',
        crossOrigin: true,
        method: 'PUT',
        headers: {
          authorization: "Bearer " + tokenLocal
        },
        data: {
          pac: pacInfo
        }
      })
    );
    this.name = pacInfo.name
    this.description = pacInfo.description
    this.color = pacInfo.color
    this.twitterUsername = pacInfo.twitterUsername
    this.emit('change');
  }

  createPac(pacInfo) {
    var tokenLocal = AuthStore.getAuthToken();
    var url = Constants.CREATE_PAC;

    var res = Promise.resolve(
      request({
        url: url,
        type: 'json',
        crossOrigin: true,
        method: 'POST',
        headers: {
          authorization: "Bearer " + tokenLocal
        },
        data: {
          pacInfo: pacInfo
        }
      })
    );
    this.name = pacInfo.name
    this.description = pacInfo.description
    this.color = pacInfo.color
    this.twitterUsername = pacInfo.twitterUsername
    this.emit('change');
  }


  handleActions(action) {
    // console.log("PacStore received an action", action);
    switch(action.type) {

      case "FETCH_PACS": {
        this.fetchPacs();
        break;
      }
      case "FETCH_PAC": {
        this.fetchPac(action.pacId);
        break;
      }
      case "UPDATE_PAC": {
        this.updatePac(action.pacId, action.pacInfo);
        break;
      }
      case "CREATE_PAC": {
        this.createPac(action.pacInfo);
        break;
      }

    }
  }
}

const pacStore = new PacStore;
dispatcher.register(pacStore.handleActions.bind(pacStore));

export default pacStore;
