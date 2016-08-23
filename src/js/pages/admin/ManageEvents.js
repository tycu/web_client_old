import React from "react";
import { Link } from "react-router";
import * as EventActions from "../../actions/EventActions";
import EventStore from "../../stores/EventStore";
import AdminEvent from './events/AdminEvent';
import Messages from '../../components/layout/Messages';
import { collections } from 'lodash';

export default class ManageEvents extends React.Component {
  constructor() {
    super();
    this.getEvents = this.getEvents.bind(this);

    this.state = {
      events: EventStore.getEvents(),
      key: 1
    };
  }

  static propTypes = {
    events: React.PropTypes.array
  }

  componentWillMount() {
    EventStore.once("change", () => {
      this.setState({
        events: EventStore.getEvents()
      })
    });
  }

  componentWillUnmount() {
    EventStore.removeListener("change", this.getEvents);
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    EventActions.fetchEvents(0);
  }


  render() {
    const style = {
      container: {
        padding: '20px',
        background: 'white',
        width: '490px',
        borderRadius: '2px'
      }
    }

    const { events } = this.state;
    const EventComponents = events.map((event) => {
      return <AdminEvent key={event.id} {...event}/>;
    });

    return (
      <div style={style.container} className="jumbotron center-block">
        <Link to='/admin'>Back to Admin</Link>
        <h2>Manage Events</h2>
        <Link to='/new_event'>New Event</Link>
        <ul ref="ul">{EventComponents}</ul>
      </div>
    );
  }
}

