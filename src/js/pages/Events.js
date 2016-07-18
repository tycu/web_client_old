import React from "react";

import Event from "../components/Event";
import * as EventActions from "../actions/EventActions";
import EventStore from "../stores/EventStore";


export default class Events extends React.Component {
  constructor() {
    super();
    this.getEvents = this.getEvents.bind(this);
    this.state = {
      events: EventStore.getAll(),
      newEventText: '',
    };
  }

  // NOTE will fire only once upon initial render
  componentWillMount() {
    EventStore.on("change", () => {
      this.setState({
        events: EventStore.getAll()
      });
    });
  }

  componentWillUnmount() {
    EventStore.removeListener("change", this.getEvents);
  }

  getEvents() {
    this.setState({
      events: EventStore.getAll(),
    });
  }

  createEvent() {
    if (!this.state.newEventText) {
      return;
    }
    EventActions.createEvent(this.state.newEventText.trim());
    this.setState({newEventText: ''});
  }

  reloadEvents() {
    EventActions.reloadEvents();
  }

  handleNewEventText(e) {
    this.setState({newEventText: e.target.value});
  }

  render() {
    const { events } = this.state;

    const EventComponents = events.map((event) => {
      return <Event key={event.id} {...event}/>;
    });

    return (
      <div>
        <h1>Events</h1>
        <button onClick={this.reloadEvents.bind(this)}>Reload!</button>
        <form>
          <input type="text" placeholder='add new event..' onChange={this.handleNewEventText.bind(this)} value={this.state.newEventText} />
          <button type="button" onClick={this.createEvent.bind(this)}>Create Event</button>
        </form>

        <ul>{EventComponents}</ul>
      </div>
    );
  }
}
