import React from 'react';
import { Link } from "react-router";
import { collections } from 'lodash';
import * as EventActions from "../../../actions/EventActions";
import EventStore from "../../../stores/EventStore";

export default class AdminEvent extends React.Component {
  constructor() {
    super();
    this.getPinned = this.getPinned.bind(this);

    this.state = {
      id: '',
      isPinned: '',
      imageUrl: '',
      imageAttribution: '',
      politicianId: '',
      headline: '',
      summary: '',
      key: 1
    };
  }

  static propTypes = {
    id: React.PropTypes.number,
    isPinned: React.PropTypes.bool,
    imageUrl: React.PropTypes.string,
    imageAttribution: React.PropTypes.string,
    politicianId: React.PropTypes.number,
    headline: React.PropTypes.string,
    summary: React.PropTypes.string
  }

  componentWillMount() {
    EventStore.once("change", () => {
      this.setState({
        pinnedId: EventStore.getPinnedId()
      })
    });
  }

  componentWillUnmount() {
    EventStore.removeListener("change", this.getPinned);
  }

  componentDidMount() {
    this.getPinned();
  }

  getPinned() {
    EventStore.getPinnedId();
  }

  pinEvent(e) {
    e.preventDefault();
    // NOTE very simple confirm as it isn't user facing
    if (window.confirm("Are you sure you want to pin this event?")) {
      EventActions.pinEvent(this.props.id);
    }
  }

  render() {
    const { id, imageUrl, imageAttribution, politicianId, headline, summary } = this.props;
    const linkTo = "edit_events/" + id;
    const headlineMax = 100;

    var trimmedHeadline = headline.length < headlineMax ? headline : headline.substring(0, headlineMax) + '...';
    var thisPinned = this.state.pinnedId === id;

    return (
      <li>
        <span>
        {(thisPinned ? (<span class="glyphicon glyphicon-pushpin" aria-hidden="true"> </span>) : (<span></span>))}
        {id}. {trimmedHeadline} <Link to={linkTo}>Edit </Link>
          {(thisPinned ? <span></span> : <span>| <a href='' onClick={this.pinEvent.bind(this)}>Pin</a></span>)}
        </span>
      </li>
    );
  }
}
