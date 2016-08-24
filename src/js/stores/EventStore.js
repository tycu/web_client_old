import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import AuthStore from './AuthStore';
import { collections } from 'lodash';
import request from 'reqwest';
import when from 'when';
import * as Constants from '../constants/EventConstants';


class EventStore extends EventEmitter {
  constructor() {
    super()
  }

  getEvents() {
    return this.eventObjs || [];
  }

  getEvent() {
    return this.eventObj || {
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

  getPinnedId() {
    return this.pinnedId
  }

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
      that.eventObjs = response;
      _(response).forEach(function(eventObj) {
        if (eventObj.isPinned === true) {
          that.pinnedId = eventObj.id;
          that.emit('change');
          return false;
        }
      });
      that.emit('change');
    })
    .catch(function(response) {
      if ((response.status !== 200) || response.status !== 304) {
        console.log("Error loading eventObjs", response);
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
      var eventObj = {}
      eventObj['isPinned'] = response.isPinned || '';
      eventObj['imageUrl'] = response.imageUrl || '';
      eventObj['imageAttribution'] = response.imageAttribution || '';
      eventObj['politicianId'] = response.politicianId || '';
      eventObj['headline'] = response.headline || '';
      eventObj['summary'] = response.summary || '';
      that.eventObj = eventObj;
      that.emit('change');
    })
    .catch(function(response) {
      if (((response.status !== 200) || response.status !== 304) || response.status !== 304) {
        alert("There is an error loading eventObj");
        console.log("Error loading eventObj", response);
        // that.emit('change');
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

  pinEvent(eventId) {
    var tokenLocal = AuthStore.getAuthToken();
    var url = Constants.PIN_EVENT;
    var that = this;

    return when(request({
      url: url + eventId + '/pin',
      method: 'PUT',
      crossOrigin: true,
      type: 'json',
      headers: {
        authorization: "Bearer " + tokenLocal
      },
      data: {
        eventId: eventId
      }
    }))
    .then(function(response) {
      that.message = "Event Pinned Successfully";
      that.error = '';
      that.pinnedId = eventId;
      that.emit('change');
    })
    .catch(function(response) {
      if (response.status !== 200 || response.status !== 304) {
        that.error = "Error Pinning Event";
      }
    });
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

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
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
    switch(action.type) {
      case "UPDATE_EVENT": {
        this.updateEvent(action.eventId, action.eventInfo);
        break;
      }
    }
    switch(action.type) {
      case "PIN_EVENT": {
        this.pinEvent(action.eventId);
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
