import React from 'react';
import { Link, browserHistory } from "react-router";
import { collections } from 'lodash';
import EventStore from "../../../stores/EventStore";
import ImageStore from "../../../stores/ImageStore";
import * as EventActions from "../../../actions/EventActions";
import Messages from '../../../components/layout/Messages';
import PacsField from './PacsField';
import PacStore from "../../../stores/PacStore";
import * as PacActions from "../../../actions/PacActions";
import * as FileUtils from "../../../utils/FileUtils";
import * as Validators from "../../../utils/ValidationUtils";

export default class EditEvent extends React.Component {
  constructor() {
    super();
    this.getEvent = this.getEvent.bind(this);
    this.getPacs = this.getPacs.bind(this);
    this.setImage = this.setImage.bind(this);

    this.state = {
      event: EventStore.getEvent(),
      availablePacs: PacStore.getPacs(),
      supportPacs: [],
      opposePacs: [],
      uploadStatus: '',
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
    }),
    availablePacs: React.PropTypes.array,
    supportPacs:  React.PropTypes.array,
    opposePacs:  React.PropTypes.array,
    uploadStatus: React.PropTypes.string
  }

  componentDidMount() {
    const eventId = this.props.params.eventId;
    EventActions.fetchAdminEvent(eventId);
    EventStore.addChangeListener(this.getEvent);

    PacActions.fetchPacs();
    PacStore.addChangeListener(this.getPacs);

    ImageStore.addChangeListener(this.setImage);
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this.getEvent);
    PacStore.removeChangeListener(this.getPacs);
    ImageStore.removeChangeListener(this.setImage);
  }

  getEvent() {
    this.setState({
      event: EventStore.getEvent()
    })
  }

  getPacs() {
    this.setState({
      availablePacs: PacStore.getPacs()
    })
  }

  setImage() {
    this.setState({
      message:      ImageStore.getMessage(),
      error:        ImageStore.getError(),
      uploadStatus: ImageStore.getUploadStatus(),
      event: {
        imageUrl:   ImageStore.getImageUrl(),
      },
      key:          Math.random()
    });
  }

  onUpdate(key, e) {
    let event = this.state.event;

    var val = e.target.value;
    event[key] = val;
    this.setState(event);
  }

  updateEvent(e) {
    e.preventDefault();
    var that = this;

    // PacActions.createPacs // todo add this, pass event id, pac ids, and support/oppose

    if (!Validators.validEvent(that.state)) {
      that.setState({error: "You must complete all Fields"});
      return false;
    } else {
      that.setState({error: ""});
      const eventId = that.props.params.eventId;

      EventActions.updateEvent(eventId, {
        imageUrl: this.state.event.imageUrl,
        imageAttribution: this.state.event.imageAttribution,
        // politicianId: this.state.event.politicianId,
        headline: this.state.event.headline,
        summary: this.state.event.summary
      });
      browserHistory.replace('/manage_events');
    }
  }

  addPac(key, e) {
    e.preventDefault();
    const isSupport = key === 'supportPacs';

    // Note need to create event first, get id from it and then add it to the paclist
    // or just add to edit only where it is already present


    // move pac load to this from pacsfield
    //

    const newPac = {eventId: null, support: isSupport, availablePacs: this.state.availablePacs};

    this.setState({
      [key]: this.state[key].concat(newPac)
    });
  }

  setPacId(key, e) {
    this.setState({
      [key]: this.state[key].concat(newPac)
    });

  }

  render() {

    const supportPacs = this.state.supportPacs || [];
    const opposePacs  = this.state.opposePacs  || [];

    const supportPacList = supportPacs.map((pac) => {
      return <PacsField key={pac.id + Math.random()} {...pac} setPacId={this.setPacId.bind(this, 'pacId')} />
    });
    const opposePacList  = opposePacs.map((pac) => {
      return <PacsField key={pac.id + Math.random()} {...pac} setPacId={this.setPacId.bind(this, 'pacId')} />
    });



    const style = {
      container: {

      },
      img: {
        position: 'relative',
        width: '414px',
        height: '220px',
        progress: {
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          textAlign: 'center',
        }
      },
      imageUrl: {

      },
      imageAttribution: {

      },
      politicianId: {

      },
      headline: {

      },
      pacId: {

      },
      summary: {
        textArea: {
          height: '300px'
        }
      },
      file: {
        display: 'none'
      }
    }

    return (
      <div style={style.container}>
        <form role="form">
          <h2>Edit Event</h2>
          <Messages {...this.state} />


          <div style={style.img} onClick={FileUtils.clickToAddFile.bind(this)}>
            <img id="image" class="pointer" height="100%" width="100%" src={this.state.event.imageUrl}/>
            <div id="progress" style={style.img.progress}>{this.state.uploadStatus}</div>
          </div>

          <div className="form-group" style={style.imageUrl}>
            <label htmlFor="imageUrl">imageUrl</label>
            <input type="text" value={this.state.event.imageUrl || ''} onChange={this.onUpdate.bind(this, 'imageUrl')} className="form-control" id="imageUrl" ref="imageUrl" placeholder="imageUrl" />
          </div>
          <div className="form-group" style={style.imageAttribution}>
            <label htmlFor="imageAttribution">imageAttribution</label>
            <input type="text" value={this.state.event.imageAttribution} onChange={this.onUpdate.bind(this, 'imageAttribution')} className="form-control" id="imageAttribution" ref="imageAttribution" placeholder="imageAttribution" />
          </div>
          <div className="form-group" style={style.politicianId}>
            <label htmlFor="politicianId">politicianId: {this.state.event.politicianId} (cannot be changed after event is created)</label>
          </div>

          <div className="form-group" style={style.pacId} id='supportPacField'>
              <label htmlFor="summary">Support Pacs</label>
              <br/>
              <button onClick={this.addPac.bind(this, 'supportPacs')}>Add Support Pac</button>
              {supportPacList}
          </div>

          <div className="form-group" style={style.pacId} id='opposePacField'>
            <label htmlFor="summary">Oppose Pacs</label>
            <br/>
            <button onClick={this.addPac.bind(this, 'opposePacs')}>Add Oppose Pac</button>
            {opposePacList}
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

          <input type="file" id="fileInput" accept="image/jpeg, image/png" style={style.file} onChange={FileUtils.upLoadFile.bind(this)}/>
        </form>
        <Link to='/manage_events'>Back To Events</Link>
      </div>
    );
  }
}
