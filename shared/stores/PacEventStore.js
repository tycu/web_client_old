import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import Promise from 'bluebird';
import AuthStore from './AuthStore';
import * as Constants from '../constants/PacEventConstants';
import request from 'reqwest';
import when from 'when';

class PacEventStore extends EventEmitter {

  getPacEvents() {
    return this.pacEvents || [];
  }

  getSupportPacEvents() {
    return this.supportPacEvents || [];
  }

  getOpposePacEvents() {
    return this.opposePacEvents || [];
  }

  getFirstMatchingName() {
    return this.firstMatchingName;
  }

  getFirstMatchingId() {
    return this.firstMatchingId;
  }

  firstMatching(support) {
    const that = this;
    if (support === undefined) {
      return;
    }
    const pacEvent = _.find(that.pacEvents, function(pacEvent) {
      if (pacEvent.support === support) {
        return pacEvent;
      }
    });
    return pacEvent;
  }

  getPacEvent() {
    return this.pacEvent || {
      pacEventId: '',
      support: '',
      eventId: '',
      pacId: ''
    };
  }

  getMessage() {
    return this.message;
  }

  getError() {
    return this.error;
  }

  fetchPacEvents(eventId, support) {
    const that = this;
    const urlBase = Constants.GET_PAC_EVENTS;
    const tokenLocal = AuthStore.getAuthToken();
    const url = urlBase + eventId + '/pac_events?include_pacs=true';

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
      that.pacEvents = response || [];
      if (support !== undefined) {
        that.firstMatchingName = that.firstMatching(support).Pac.name;
        that.firstMatchingId = that.firstMatching(support).Pac.id;
      }
      that.supportPacEvents = _.filter(response, function(v) {
        return v.support === true;
      });
      that.opposePacEvents = _.filter(response, function(v) {
        return v.support === false;
      });

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

  fetchPacEvent(eventId, pacEventId) {
    const that = this;
    const url = Constants.GET_PAC_EVENT;
    const tokenLocal = AuthStore.getAuthToken();

    return when(request({
      url: url + eventId + '/pac_events/' + pacEventId,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
        authorization: "Bearer " + tokenLocal
      }
    }))
    .then(function(response) {
      const pacEvent = {};
      pacEvent.pacEventId = response.id || '';
      pacEvent.support = response.name || '';
      pacEvent.eventId = response.description || '';
      pacEvent.pacId = response.twitterUsername || '';
      that.pacEvent = pacEvent;
      that.emitEvent();
    })
    .catch(function(response) {
      if (response.status !== 200 || response.status !== 304) {
        that.error = 'There is an error loading pac';
        that.emitEvent();
      }
    });
  }

  updatePacEvent(eventId, pacEventId, pacEventInfo) {
    const tokenLocal = AuthStore.getAuthToken();
    const url = Constants.UPDATE_PAC_EVENT;

    Promise.resolve(
      request({
        url: url + eventId + '/pac_events/' + pacEventId,
        type: 'json',
        crossOrigin: true,
        method: 'PUT',
        headers: {
          authorization: "Bearer " + tokenLocal
        },
        data: {
          pacEvent: pacEventInfo
        }
      })
    );
    this.emitEvent();
  }

  createPacEvent(eventId, pacInfo) {
    const tokenLocal = AuthStore.getAuthToken();
    const url = Constants.CREATE_PAC_EVENT;

    Promise.resolve(
      request({
        url: url + eventId + '/pac_events',
        type: 'json',
        crossOrigin: true,
        method: 'POST',
        headers: {
          authorization: "Bearer " + tokenLocal
        },
        data: {
          pacEvent: pacInfo
        }
      })
    );
    this.emitEvent();
  }

  deletePacEvent(eventId, pacEventId) {
    const tokenLocal = AuthStore.getAuthToken();
    const url = Constants.DELETE_PAC_EVENT;

    Promise.resolve(
      request({
        url: url + eventId + '/pac_events/' + pacEventId,
        type: 'json',
        crossOrigin: true,
        method: 'DELETE',
        headers: {
          authorization: "Bearer " + tokenLocal
        }
      })
    );
    this.emitEvent();
  }

  addChangeListener(callback) {
    this.on('pacEventChange', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('pacEventChange', callback);
  }

  emitEvent() {
    this.emit('pacEventChange');
  }

  handleActions(action) {
    // console.log("PacEventStore received an action", action);

    switch(action.type) {
      case "FETCH_PAC_EVENTS": {
        this.fetchPacEvents(action.eventId, action.support);
        break;
      }
      case "FETCH_PAC_EVENT": {
        this.fetchPacEvent(action.eventId, action.pacEventId);
        break;
      }
      case "UPDATE_PAC_EVENT": {
        this.updatePacEvent(action.eventId, action.pacEventId, action.pacEventInfo);
        break;
      }
      case "CREATE_PAC_EVENT": {
        this.createPacEvent(action.eventId, action.pacEventInfo);
        break;
      }
      case "DELETE_PAC_EVENT": {
        this.deletePacEvent(action.eventId, action.pacEventId);
        break;
      }
    }
  }
}

const pacEventStore = new PacEventStore;
dispatcher.register(pacEventStore.handleActions.bind(pacEventStore));

export default pacEventStore;
