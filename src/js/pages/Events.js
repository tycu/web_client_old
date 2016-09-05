import React from "react";
import Radium from 'radium';
import Event from "../components/Event";
import * as EventActions from "../actions/EventActions";
import EventStore from '../stores/EventStore';

@Radium
export default class Events extends React.Component {
  constructor() {
    super();
    this.getEvents = this.getEvents.bind(this);

    this.state = {
      collapseIn: false,
      events: []
    };
  }

  static propTypes = {
    eventStyle:  React.PropTypes.object,
    contStyle:   React.PropTypes.object,
    ulStyle:     React.PropTypes.object,
    children:    React.PropTypes.node,
    collapseIn:  React.PropTypes.bool,
    events:      React.PropTypes.array
  }

  componentDidMount() {
    var offset = 0;
    EventActions.fetchEvents(offset);
    EventStore.addChangeListener(this.getEvents);
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this.getEvents);
  }

  getEvents() {
    this.setState({
      events: EventStore.getEvents()
    })
  }


  getStyles = () => {
    return {
      events: {
          minHeight: '150px',
          marginBottom: '20px',
          display: 'block',
        },
        container: {
        },
        ul: {
          listStyle: 'none'
        },
        pseudoBefore: {
        },
        pseudoAfter: {
          clear: 'both',
        }
      };
  }

  render() {
    const { events } = this.state;

    const EventComponents = events.map((event) => {
      return <Event eventId={event.id} key={event.id} {...event}/>;
    });

    const defStyle = this.getStyles();
    const {eventStyle, contStyle, ulStyle} = this.props;

    return (
      <div>
        <nav ref="events" style={[defStyle.events, eventStyle && eventStyle]}>
          <span style={[defStyle.pseudoBefore]} />
            <div ref="container" style={[defStyle.container, contStyle && contStyle]}>
              <span style={[defStyle.pseudoBefore]} />
                <ul ref="ul" style={[defStyle.ul]}>{EventComponents}</ul>
              <span style={[defStyle.pseudoAfter]} />
            </div>
          <span style={[defStyle.pseudoAfter]} />
        </nav>
      </div>
    );
  }
}

