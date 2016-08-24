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
    return this.pacs || [];
  }

  getPac() {
    return this.pac || {
      name: '',
      description: '',
      color: '',
      twitterUsername: ''
    };
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
      that.error = '';
      that.emit('change');
    })
    .catch(function(response) {
      if ((response.status !== 200) || response.status !== 304) {
        that.error = 'There is an error loading pacs';
        alert("There is an error loading pacs");
        console.log("Error loading pacs", response);
        that.emit('change');
      }
    });
  }

  fetchPac(pacId) {
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
      var pac = {};
      pac['name'] = response.name || '';
      pac['description'] = response.description || '';
      pac['twitterUsername'] = response.twitterUsername || '';
      pac['color'] = response.color || '';
      that.pac = pac;
      that.emit('change');
    })
    .catch(function(response) {
      if (response.status !== 200 || response.status !== 304) {
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
          pac: pacInfo
        }
      })
    );
    this.emit('change');
  }

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
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