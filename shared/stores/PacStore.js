import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import Promise from 'bluebird';
import AuthStore from './AuthStore';
import * as Constants from '../constants/PacConstants';
import request from 'reqwest';
import when from 'when';

class PacStore extends EventEmitter {

  getPacs() {
    return this.pacs || [];
  }

  getPac() {
    return this.pac || {
      name: '',
      description: '',
      color: '',
      twitterUsername: '',
      streetAddress: '',
      city: '',
      mailingState: '',
      zip: ''
    };
  }

  getMessage() {
    return this.message;
  }

  getError() {
    return this.error;
  }

  fetchPacs() {
    const that = this;
    const url = Constants.GET_PACS;
    const tokenLocal = AuthStore.getAuthToken();

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
      that.emitEvent();
    })
    .catch(function(response) {
      if (response.status !== 200 || response.status !== 304) {
        that.error = 'There is an error loading pacs';
        that.emitEvent();
      }
    });
  }

  fetchPac(pacId) {
    const that = this;
    const url = Constants.GET_PAC;
    const tokenLocal = AuthStore.getAuthToken();

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
      const pac = {};
      pac.name = response.name || '';
      pac.description = response.description || '';
      pac.twitterUsername = response.twitterUsername || '';
      pac.color = response.color || '';
      pac.streetAddress = response.streetAddress || '';
      pac.city = response.city || '';
      pac.mailingState = response.mailingState || '';
      pac.zip = response.zip || '';
      that.pac = pac;
      that.emitEvent();
    })
    .catch(function(response) {
      if (response.status !== 200 || response.status !== 304) {
        that.error = 'There is an error loading pac';
        that.emitEvent();
      }
    });
  }

  updatePac(pacId, pacInfo) {
    const tokenLocal = AuthStore.getAuthToken();
    const url = Constants.UPDATE_PAC;

    Promise.resolve(
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
    this.emitEvent();
  }

  createPac(pacInfo) {
    const tokenLocal = AuthStore.getAuthToken();
    const url = Constants.CREATE_PAC;

    Promise.resolve(
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
    this.emitEvent();
  }

  addChangeListener(callback) {
    this.on('pacChange', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('pacChange', callback);
  }

  emitEvent() {
    this.emit('pacChange');
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
