import React from 'react';
import { Link } from "react-router";
import { collections } from 'lodash';
import * as EventActions from "../../../actions/EventActions";
import EventStore from "../../../stores/EventStore";

export default class AdminEvent extends React.Component {
  constructor() {
    super();

    this.state = {
      id: '',
      isPinned: '',
      isPublished: '',
      publishChange: false,
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
    isPublished: React.PropTypes.bool,
    publishChange: React.PropTypes.bool,
    imageUrl: React.PropTypes.string,
    imageAttribution: React.PropTypes.string,
    politicianId: React.PropTypes.number,
    headline: React.PropTypes.string,
    summary: React.PropTypes.string
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPinned !== this.state.isPinned) {
      this.setState({ isPinned: nextProps.isPinned });
    }
    if (nextProps.publishChangeId == this.props.id) {
      var currentPublishStatus = this.state.isPublished;
      this.setState({ isPublished: !currentPublishStatus });
    }
  }

  pinEvent(e) {
    e.preventDefault();
    // NOTE very simple confirm as it isn't user facing
    if (window.confirm("Are you sure you want to pin this event?")) {
      EventActions.pinEvent(this.props.id);
    }
  }

  togglePublish(e) {
    e.preventDefault();
    var publishText = this.props.isPublished ? 'Un-Publish' : 'Publish';
    if (window.confirm('Are you sure you want to ' + publishText + ' this event?')) {
      EventActions.togglePublish(this.props.id);
    }
  }

  render() {
    const { id, isPublished, publishChange, isPinned, imageUrl, imageAttribution, politicianId, headline, summary } = this.props;
    const linkTo = "edit_events/" + id;
    const headlineMax = 75;

    const style = {
      container: {
        position: 'relative',
        clear: 'both'
      },
      eventDescription: {
        float: 'left',
        display: 'inline'

      },
      editLinks: {
        float: 'right',
        display: 'inline',
        width: '150px'
      }
    }

    var trimmedHeadline = headline.length < headlineMax ? headline : headline.substring(0, headlineMax) + '...';

    var publishLink = (this.state.isPublished ? 'Publish' : 'UnPublish')

    return (
      <li style={style.container}>
        <span style={style.eventDescription}>
        {(isPinned ?
          (<span class="glyphicon glyphicon-pushpin" aria-hidden="true"> </span>) :
          (<span></span>))}
        {id}. {trimmedHeadline}
        </span>
        <span style={style.editLinks}>
          <Link to={linkTo}>Edit </Link>
          {(isPinned ?
            <span></span> :
            <span>| <a href='' onClick={this.pinEvent.bind(this)}>Pin </a></span>)}

          <span>| <a href='' onClick={this.togglePublish.bind(this)}>
          {publishLink}
          </a></span>
        </span>
      </li>
    );
  }
}
