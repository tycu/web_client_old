import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import Promise from 'bluebird';
import AuthStore from './AuthStore';
import request from 'reqwest';
import when from 'when';
import * as Constants from '../constants/PoliticianConstants';

class PoliticianStore extends EventEmitter {
  constructor() {
    super()
  }

  getPoliticians() {
    return this.politicians || [];
  }

  getPolitician() {
    return this.politician || {
      thumbnail: '',
      firstName: '',
      lastName: '',
      jobTitle: '',
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

  fetchPoliticians() {
    var that = this;
    const url = Constants.GET_POLITICIANS;
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
      that.politicians = response
      that.emitEvent();
    })
    .catch(function(response) {
      if ((response.status !== 200) || response.status !== 304) {
        console.log("Error loading politicians", response);
      }
    })
  }

  fetchPolitician(politicianId) {
    var that = this;
    const url = Constants.GET_POLITICIAN;
    const tokenLocal = AuthStore.getAuthToken();

    return when(request({
      url: url + politicianId,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
        authorization: "Bearer " + tokenLocal
      }
    }))
    .then(function(response) {
      var politician = {}
      politician['politicianId']    = response.id || '';
      politician['color']           = response.color || '';
      politician['thumbnail']       = response.thumbnail || '';
      politician['firstName']       = response.firstName || '';
      politician['lastName']        = response.lastName || '';
      politician['jobTitle']        = response.jobTitle || '';
      politician['twitterUsername'] = response.twitterUsername || '';
      that.politician               = politician;
      that.emitEvent();
    })
    .catch(function(response) {
      if (response.status !== 200 || response.status !== 304) {
        console.log("Error loading politicians", response);
      }
    });
  }

  updatePolitician(politicianId, politicianInfo) {
    const tokenLocal = AuthStore.getAuthToken();
    const url = Constants.UPDATE_POLITICIAN;

    var res = Promise.resolve(
      request({
        url: url + politicianId,
        type: 'json',
        crossOrigin: true,
        method: 'PUT',
        headers: {
          authorization: "Bearer " + tokenLocal
        },
        data: {
          politician: politicianInfo
        }
      })
    );
    this.emitEvent();
  }

  createPolitician(politicianInfo) {
    const tokenLocal = AuthStore.getAuthToken();
    const url = Constants.CREATE_POLITICIAN;

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
          politician: politicianInfo
        }
      })
    );
    this.emitEvent();
  }

  addChangeListener(callback) {
    this.on('politicianChange', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('politicianChange', callback);
  }

  emitEvent() {
    this.emit('politicianChange');
  }

  handleActions(action) {
    // console.log("PoliticianStore received an action", action);

    switch(action.type) {
      case "FETCH_POLITICIANS": {
        this.fetchPoliticians();
        break;
      }
    }
    switch(action.type) {
      case "FETCH_POLITICIAN": {
        this.fetchPolitician(action.politicianId);
        break;
      }
    }
    switch(action.type)     {
      case "UPDATE_POLITICIAN": {
        this.updatePolitician(action.politicianId, action.politicianInfo);
        break;
      }
    }
    switch(action.type) {
      case "CREATE_POLITICIAN": {
        this.createPolitician(action.politicianInfo);
        break;
      }
    }
  }
}

const politicianStore = new PoliticianStore;
dispatcher.register(politicianStore.handleActions.bind(politicianStore));

export default politicianStore;
