import React from "react";
import { Link } from "react-router";
import * as EventActions from "../../../actions/EventActions";
import EventStore from "../../../stores/EventStore";
import AdminEvent from './events/AdminEvent';
import Messages from '../../layout/Messages';
import { collections } from 'lodash';

export default class ManageEvents extends React.Component {
  constructor() {
    super();
    this.getEvents = this.getEvents.bind(this);
    this.getPinned = this.getPinned.bind(this);
    this.getPublishChangeId = this.getPublishChangeId.bind(this);

    this.state = {
      events: EventStore.getEvents(),
      pinnedId: EventStore.getPinnedId(),
      publishChangeId: EventStore.getPublishChangeId(),
      key: 1
    };
  }

  static propTypes = {
    events: React.PropTypes.array,
    pinnedId: React.PropTypes.number,
    publishChangeId: React.PropTypes.number
  }

  componentDidMount() {
    EventActions.fetchAdminEvents(0);
    EventStore.addChangeListener(this.getEvents);
    EventStore.addChangeListener(this.getPinned);
    EventStore.addChangeListener(this.getPublishChangeId);
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this.getEvents);
    EventStore.removeChangeListener(this.getPinned);
    EventStore.removeChangeListener(this.getPublishChangeId);
  }

  getPinned() {
    this.setState({
      pinnedId: EventStore.getPinnedId()
    })
  }

  getEvents() {
    this.setState({
      events: EventStore.getEvents(),
      message:  EventStore.getMessage(),
      error:    EventStore.getError()
    })
  }

  getPublishChangeId() {
    this.setState({
      publishChangeId: EventStore.getPublishChangeId()
    })
  }

  render() {
    const style = {
      container: {
        padding: '30px',
        background: 'white',
        width: '800px',
        minHeight: '600px',
        borderRadius: '2px'
      },
      ul: {
        listStyle: 'none',
        marginTop: '20px'
      }
    }
    const { events } = this.state;
    const EventComponents = events.map((event) => {
      return <AdminEvent key={event.id} {...event} isPinned={this.state.pinnedId === event.id} publishChangeId={this.state.publishChangeId}/>;
    });

    return (
      <div style={style.container} className="jumbotron center-block">
        <Link to='/admin'>Back to Admin</Link>
        <h2>Manage Events</h2>
        <Messages {...this.state} />
        <Link to='/new_event'>New Event</Link>
        <br/>
        <ul style={style.ul} ref="ul">{EventComponents}</ul>
      </div>
    );
  }
}

