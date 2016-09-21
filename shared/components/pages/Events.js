import React from "react";
import Radium from 'radium';
import InfiniteScroll from 'react-infinite-scroll-component';
import Event from "../Event";

import * as EventActions from "../../actions/EventActions";
import EventStore from '../../stores/EventStore';

@Radium
export default class Events extends React.Component {
  constructor() {
    super();
    this.getEvents = this.getEvents.bind(this);
    this.loadFunc = this.loadFunc.bind(this);

    this.state = {
      collapseIn: false,
      hasMore: true,
      page: 0,
      events: []
    };
  }

  static propTypes = {
    hasMore:     React.PropTypes.bool,
    page:        React.PropTypes.number,
    eventStyle:  React.PropTypes.object,
    contStyle:   React.PropTypes.object,
    ulStyle:     React.PropTypes.object,
    children:    React.PropTypes.node,
    collapseIn:  React.PropTypes.bool,
    events:      React.PropTypes.array
  }

  componentDidMount() {
    const offset = 0;
    EventActions.fetchEvents(offset);
    EventStore.addChangeListener(this.getEvents);
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this.getEvents);
  }

  getEvents() {
    this.setState({
      events: EventStore.getEvents()
    });
  }

  loadFunc() {
    const newPage = this.state.page + 1;
    const offset = this.state.page * 5;
    EventActions.fetchEvents(offset);
    this.setState({
      page: newPage,
      hasMore: (this.state.page < 15)
    });
  }

  getStyles = () => {
    return {
      events: {
        minHeight: '150px',
        marginBottom: '20px',
        display: 'block'
      },
      container: {
      },
      ul: {
        listStyle: 'none'
      },
      pseudoBefore: {
      },
      pseudoAfter: {
        clear: 'both'
      }
    };
  }

  render() {
    const { events } = this.state;
    const EventComponents = events.map((event) => {
      return <Event eventId={event.id} key={event.id + Math.random()} {...event} />;
    });
    const defStyle = this.getStyles();

    const style = {
      spinner: {
      }
    };
    const {eventStyle, contStyle, ulStyle} = this.props;
    const hasMore = this.state.hasMore;
    const loader = <div className="loader">Loading more articles...</div>;
    // const loader = <img style={style.spinner} class="alignnone" src="https://i0.wp.com/cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif?resize=48%2C48" alt="" width="32" height="32"/>;

    return (
      <div>
        <nav ref="events" style={[defStyle.events, eventStyle && eventStyle]}>
          <span style={[defStyle.pseudoBefore]} />
            <div ref="container" style={[defStyle.container, contStyle && contStyle]}>
              <span style={[defStyle.pseudoBefore]} />
                <ul ref="ul" style={[defStyle.ul]}>
                  <InfiniteScroll
                    scrollThreshold={0.8}
                    endMessage='You have reached the end'
                    next={this.loadFunc.bind(this)}
                    hasMore={hasMore}
                    loader={loader}>
                    {EventComponents}
                  </InfiniteScroll>
                </ul>
              <span style={[defStyle.pseudoAfter]} />
            </div>
          <span style={[defStyle.pseudoAfter]} />
        </nav>
      </div>
    );
  }
}

