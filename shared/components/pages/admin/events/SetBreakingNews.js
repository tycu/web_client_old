import React, { Component, PropTypes } from 'react'
import { Link } from "react-router";
import * as PacEventActions from "../../../../actions/PacEventActions";
import * as EventActions from "../../../../actions/EventActions";
import EventStore from '../../../../stores/EventStore';
import Messages from '../../../layout/Messages';

export default class SetBreakingNews extends React.Component {
  constructor(props) {
    super(props)
    this.getEvents = this.getEvents.bind(this);

    this.state = {
      events: '',
      breakingId: '',
      value: ''
    }
  }

  static propTypes = {
    events: React.PropTypes.array,
    breakingId: React.PropTypes.string
  }

  componentDidMount() {
    var offset = 0;
    EventActions.fetchEvents(offset);
    EventStore.addChangeListener(this.getEvents);
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this.getEvents);
  }

  unsetBreakingNews(e) {
    e.preventDefault();
    EventActions.unsetBreakingNews();
  }

  setBreakingNews(e) {
    e.preventDefault();
    const breakingId = this.state.breakingId;

    if (breakingId) {
      EventActions.setBreakingNews(breakingId);
    } else {
      // empty select box serves to unset
      EventActions.unsetBreakingNews();
    }
  }

  getEvents() {
    this.setState({
      events: EventStore.getEvents(),
      breakingId: EventStore.getBreakingId(),
      message: EventStore.getMessage(),
      error: EventStore.getError()
    })
  }

  onUpdate(e) {
    this.setState({
      breakingId: e.target.value
    });
  }

  render () {
    const availableEvents = this.state.events || [];

    const style = {
      container: {
        padding: '20px',
        width: '700px',
        background: 'white',
        // marginTop: '500px'
      },
      select: {
        width: '350px',
        display: 'inline'
      },
      setButton: {
        marginLeft: '20px'
      },
      delete: {
        width: '160px'
      }
    }

    const eventList = availableEvents.map((event, i) => {
      return <option
               value={event.id}
               key={i}>{event.headline}</option>
    });
    const breakingId = this.state.breakingId;

    return (
      <div style={style.container} className="jumbotron center-block">
        <Link to='/admin'>Back to Admin</Link><br/><br/>
        <Messages {...this.state} />
        <select
          class="form-control eventList"
          type="select"
          value={breakingId}
          onChange={this.onUpdate.bind(this)}
          style={style.select}>
          <option value='' key='0'>Set a breaking news header</option>
          {eventList}
        </select>

        <button style={style.setButton} type="submit" className="btn btn-primary" onClick={this.setBreakingNews.bind(this)}>Set Breaking News Event</button><br/><br/><br/>

        <button style={style.delete} className="btn btn-warn" onClick={this.unsetBreakingNews.bind(this)}>Unset Breaking News</button>
        <br/>
      </div>
    )
  }
}
