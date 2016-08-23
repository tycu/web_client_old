import React from "react";
import Radium from 'radium';
import Event from "../components/Event";
import * as EventActions from "../actions/EventActions";
import EventStore from '../stores/EventStore';


@Radium
export default class Events extends React.Component {
  displayName = 'Events'

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
    children:    React.PropTypes.node,
    collapseIn:  React.PropTypes.bool,
    events:      React.PropTypes.array
  }

  componentWillMount() {
    EventStore.once("change", () => {
      this.setState({
        events: EventStore.getAll(),
      });
    });
  }

  componentWillUnmount() {
    EventStore.removeListener("change", this.getEvents);
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    var offset = 0;
    EventActions.getEvents(offset);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.events !== nextState.events
  }

  getStyles = () => {
    return {
      events: {
        // margin: '0 auto',
        // backgroundColor: '#fff',
        // border: '1px solid #e7e7e7',
        // borderRadius: '0px',
        position: 'relative',
        top: '0px',
        minHeight: '150px',
        marginBottom: '20px',
        display: 'block',
        boxSizing: 'border-box',
        maxWidth: '960px'
        },
        container: {
          float: 'right',
          paddingRight: '15px',
          paddingLeft: '15px',
          marginRight: 'auto',
          marginLeft: 'auto',
          boxSizing: 'border-box',

          '@media (min-width: 768px)': {
            width: '720px'
          },
          '@media (min-width: 992px)': {
            width: '820px'
          },
          '@media (min-width: 1200px)': {
            width: '820px'
          }
        },
        ul: {
          listStyle: 'none'
        },
        pseudoBefore: {
          display: 'table',
          // content: ' ',
          boxSizing: 'border-box'
        },
        pseudoAfter: {
          clear: 'both',
          display: 'table',
          // content: ' ',
          boxSizing: 'border-box'
        }
      };
  }

  render() {
    const { events } = this.state;

    const EventComponents = events.map((event) => {
      return <Event key={event.id} {...event}/>;
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

