import React from 'react';
import { Link, browserHistory } from "react-router";
import { collections } from 'lodash';
import EventStore from "../../../stores/EventStore";
import * as EventActions from "../../../actions/EventActions";
import Messages from '../../../components/layout/Messages';

export default class EditEvent extends React.Component {
  constructor() {
    super();
    this.getEvent = this.getEvent.bind(this);

    this.state = {
      event: EventStore.getEvent(),
      key: 1
    };
  }

  static propTypes = {
    event: React.PropTypes.shape({
      isPinned: React.PropTypes.bool,
      imageUrl: React.PropTypes.string,
      imageAttribution: React.PropTypes.string,
      politicianId: React.PropTypes.number,
      headline: React.PropTypes.string,
      summary: React.PropTypes.string
    })
  }

  componentDidMount() {
    const eventId = this.props.params.eventId;
    EventActions.fetchEvent(eventId);
    EventStore.addChangeListener(this.getEvent);
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this.getEvent);
  }

  getEvent() {
    this.setState({
      event: EventStore.getEvent()
    })
  }

  onUpdate(key, e) {
    let event = this.state.event;

    var val = e.target.value;
    event[key] = val;
    this.setState(event);
  }

  validEvent() {
    var that = this;
    var requiredFields = ['imageUrl', 'imageAttribution', 'politicianId', 'headline', 'summary'];
    var shouldContinue = true;

    _(requiredFields).forEach(function(value) {
      if (_.isEmpty(that.state.event[value])) {
        shouldContinue = false
        return false;
      }
    });
    return shouldContinue;
  }

  updateEvent(e) {
    e.preventDefault();
    var that = this;

    if (!that.validEvent()) {
      that.setState({error: "You must complete all Fields"});
      return false;
    } else {
      that.setState({error: ""});
      const eventId = that.props.params.eventId;

      EventActions.updateEvent(eventId, {
        imageUrl: this.state.event.imageUrl,
        imageAttribution: this.state.event.imageAttribution,
        politicianId: this.state.event.politicianId,
        headline: this.state.event.headline,
        summary: this.state.event.summary
      });
      browserHistory.replace('/manage_events');
    }
  }


  render() {
    const style = {
      container: {

      },
      imageUrl: {

      },
      imageAttribution: {

      },
      politicianId: {

      },
      headline: {

      },
      summary: {
        textArea: {
          height: '300px'
        }
      }
    }

    return (
      <div style={style.container}>
        <form role="form">
          <h2>Edit Event</h2>
          <Messages {...this.state} />

          <div className="form-group" style={style.imageUrl}>
            <label htmlFor="imageUrl">imageUrl</label>
            <input type="text" value={this.state.event.imageUrl} onChange={this.onUpdate.bind(this, 'imageUrl')} className="form-control" id="imageUrl" ref="imageUrl" placeholder="imageUrl" />
          </div>
          <div className="form-group" style={style.imageAttribution}>
            <label htmlFor="imageAttribution">imageAttribution</label>
            <input type="text" value={this.state.event.imageAttribution} onChange={this.onUpdate.bind(this, 'imageAttribution')} className="form-control" id="imageAttribution" ref="imageAttribution" placeholder="imageAttribution" />
          </div>
          <div className="form-group" style={style.politicianId}>
            <label htmlFor="politicianId">politicianId</label>
            <input type="text" value={this.state.event.politicianId} onChange={this.onUpdate.bind(this, 'politicianId')} className="form-control" id="politicianId" ref="politicianId" placeholder="politicianId" />
          </div>
          <div className="form-group" style={style.headline}>
            <label htmlFor="headline">headline</label>
            <input type="text" value={this.state.event.headline} onChange={this.onUpdate.bind(this, 'headline')} className="form-control" id="headline" ref="headline" placeholder="headline" />
          </div>
          <div className="form-group" style={style.summary}>
            <label htmlFor="summary">summary</label>
            <textarea style={style.summary.textArea} type="text" value={this.state.event.summary} onChange={this.onUpdate.bind(this, 'summary')} className="form-control" id="summary" ref="summary" placeholder="summary" />
          </div>


          <div className='form-group'>
            <button type="submit" className="btn btn-primary" onClick={this.updateEvent.bind(this)}>Save Event</button>
          </div>
        </form>
        <Link to='/manage_events'>Back To Events</Link>
      </div>
    );
  }
}