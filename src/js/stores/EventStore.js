import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

import request from 'reqwest';
import when from 'when';
import Constants from '../constants/EventConstants';


class EventStore extends EventEmitter {
  constructor() {
    super()
  }
  // won't be creating, will be on admin unless we switch over/create admin role



  loadEvents(offset) {
    var that = this;
    var url = Constants.EVENTS_URL;

    return when(request({
      url: url,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      data: {
        offset: offset
      }
    })).then(function(response) {
      that.events = response
      that.emit('change');
    })
    .catch(function(response) {
      if (response.status !== 200) {
        alert("There is an error loading events");
        console.log("Error loading events", response);
      }
    })
  }

  getAll() {
    return this.events;
  }

  handleActions(action) {
    console.log("EventStore received an action", action);

    switch(action.type) {
      case "FETCH_EVENTS": {
        this.loadEvents(action.offset);
        break;
      }
      // case "FETCH_EVENTS": {
        // this.localFunctionCall(action);
        // this.emit("change");
        // break;
      // }
    }
  }

}

const eventStore = new EventStore;
dispatcher.register(eventStore.handleActions.bind(eventStore));

export default eventStore;
