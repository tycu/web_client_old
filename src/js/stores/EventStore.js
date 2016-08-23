import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import AuthStore from './AuthStore';
import request from 'reqwest';
import when from 'when';
import * as Constants from '../constants/EventConstants';


class EventStore extends EventEmitter {
  constructor() {
    super()
  }

  getEvents() {
    return this.events || [];
  }

  getEvent() {
    return this.event || {
      isPinned: '',
      imageUrl: '',
      imageAttribution: '',
      politicianId: '',
      headline: '',
      summary: ''
    };
  }

  getMessage() {
    return this.message;
  };

  getError() {
    return this.error;
  };

  fetchEvents(offset) {
    var that = this;
    var url = Constants.GET_EVENTS;

    return when(request({
      url: url,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      data: {
        offset: offset
      }
    }))
    .then(function(response) {
      that.events = response
      that.emit('change');
    })
    .catch(function(response) {
      if ((response.status !== 200) || response.status !== 304) {
        alert("There is an error loading events");
        console.log("Error loading events", response);
      }
    })
  }

  fetchEvent(eventId) {
    var that = this;
    var url = Constants.GET_EVENT;
    var tokenLocal = AuthStore.getAuthToken();

    return when(request({
      url: url + eventId,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
        authorization: "Bearer " + tokenLocal
      }
    }))
    .then(function(response) {
      var event = {}
      event['isPinned'] = response.isPinned || '';
      event['imageUrl'] = response.imageUrl || '';
      event['imageAttribution'] = response.imageAttribution || '';
      event['politicianId'] = response.politicianId || '';
      event['headline'] = response.headline || '';
      event['summary'] = response.summary || '';
      that.event = event;
      that.emit('change');
    })
    .catch(function(response) {
      if (((response.status !== 200) || response.status !== 304) || response.status !== 304) {
        alert("There is an error loading event");
        console.log("Error loading event", response);
      }
    });
  }

  updateEvent(eventId, eventInfo) {
    var tokenLocal = AuthStore.getAuthToken();
    var url = Constants.UPDATE_EVENT;

    var res = Promise.resolve(
      request({
        url: url + eventId,
        type: 'json',
        crossOrigin: true,
        method: 'PUT',
        headers: {
          authorization: "Bearer " + tokenLocal
        },
        data: {
          event: eventInfo
        }
      })
    );
    this.emit('change');
  }

  createEvent(eventInfo) {
    var tokenLocal = AuthStore.getAuthToken();
    var url = Constants.CREATE_EVENT;

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
          event: eventInfo
        }
      })
    );
    this.emit('change');
  }


  handleActions(action) {
    // console.log("EventStore received an action", action);

    switch(action.type) {
      case "FETCH_EVENTS": {
        this.fetchEvents(action.offset);
        break;
      }
    }
    switch(action.type) {
      case "FETCH_EVENT": {
        this.fetchEvent(action.eventId);
        break;
      }
    }
    switch(action.type)     {
      case "UPDATE_EVENT": {
        this.updateEvent(action.eventId, action.eventInfo);
        break;
      }
    }
    switch(action.type) {
      case "CREATE_EVENT": {
        this.createEvent(action.eventInfo);
        break;
      }
    }
  }
}

const eventStore = new EventStore;
dispatcher.register(eventStore.handleActions.bind(eventStore));

export default eventStore;
