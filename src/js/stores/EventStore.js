import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class EventStore extends EventEmitter {
  constructor() {
    super()

    // can call endpoint
    this.events = [
      {
        id: 113464613,
        text: "Go Shopping",
        complete: false
      },
      {
        id: 235684679,
        text: "Pay Water Bill",
        complete: false
      },
    ];
  }

  // won't be creating events

  createEvent(text) {
    const id = Date.now(); // TODO not great
    this.events.push({
      id,
      text,
      complete: false,
    });

    this.emit("change");
  }

  getAll() {
    return this.events;
  }

  handleActions(action) {
    console.log("EventStore received an action", action);

    switch(action.type) {
      case "CREATE_EVENT": {
        this.createEvent(action.text);
        break;
      }
      case "RECEIVE_EVENTS": {
        this.events = action.events;
        this.emit("change");
        break;
      }
    }
  }

}

const eventStore = new EventStore;
dispatcher.register(eventStore.handleActions.bind(eventStore));

export default eventStore;
