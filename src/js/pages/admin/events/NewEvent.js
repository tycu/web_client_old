import React from 'react';
import { Link, browserHistory } from "react-router";
import { collections } from 'lodash';
import EventStore from "../../../stores/EventStore";
import ImageStore from "../../../stores/ImageStore";
import * as EventActions from "../../../actions/EventActions";
import Messages from '../../../components/layout/Messages';
import DraftJsStatefulEditor from './DraftJsStatefulEditor';
import PoliticiansField from './PoliticiansField';
import * as FileUtils from "../../../utils/FileUtils";
import * as Validators from "../../../utils/ValidationUtils";

export default class NewEvent extends React.Component {

  constructor() {
    super();
    this.setEvent = this.setEvent.bind(this);
    this.setImage = this.setImage.bind(this);

    this.state = {
      event: {
        isPinned: false,
        imageUrl: '',
        imageAttribution: '',
        politicianId: '',
        headline: '',
        summary: ''
      },
      uploadStatus: ''
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
    uploadStatus: React.PropTypes.string
  }

  componentDidMount() {
    ImageStore.addChangeListener(this.setImage);
    EventStore.addChangeListener(this.setEvent);
  }

  componentWillUnmount() {
    ImageStore.removeChangeListener(this.setImage);
    EventStore.removeChangeListener(this.setEvent);
  }

  setEvent(){}

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
    if (key === 'politicianId' || key === 'summary') {
      event[key] = e;
    }
    else {
      var val = e.target.value;
      event[key] = val;
    }
    this.setState(event);
  }

  createEvent(e) {
    e.preventDefault();
    var that = this;

    if (!Validators.validEvent(that.state)) {
      that.setState({error: "You must complete all Fields"});
      return false;
    } else {
      that.setState({error: ""});

      EventActions.createEvent({
        isPinned: false,
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
        minHeight: '200px'
      },
      file: {
        display: 'none'
      }
    }

    return (
      <div style={style.container}>
        <form role="form">
          <h2>New Event</h2>
          <Messages {...this.state} />

          <div style={style.img} onClick={FileUtils.clickToAddFile.bind(this)}>
            <img id="image" class="pointer" height="100%" width="100%" src={this.state.event.imageUrl}/>
            <div id="progress" style={style.img.progress}>{this.state.uploadStatus}</div>
          </div>

          <div className="form-group" style={style.imageUrl}>
            <label htmlFor="imageUrl">imageUrl</label>
            <input type="text" disabled="disabled" value={this.state.event.imageUrl || ''} onChange={this.onUpdate.bind(this, 'imageUrl')} className="form-control" id="imageUrl" ref="imageUrl" placeholder="imageUrl" />
          </div>
          <div className="form-group" style={style.imageAttribution}>
            <label htmlFor="imageAttribution">imageAttribution</label>
            <input type="text" value={this.state.event.imageAttribution || ''} onChange={this.onUpdate.bind(this, 'imageAttribution')} className="form-control" id="imageAttribution" ref="imageAttribution" placeholder="imageAttribution" />
          </div>
          <div className="form-group" style={style.politicianId}>
            <label htmlFor="politicianId">Politician (cannot be edited after event creation)</label>
            <PoliticiansField value={this.state.event.politicianId || ''} onChange={this.onUpdate.bind(this, 'politicianId')} />
          </div>

          <div className="form-group" style={style.pacId} id='supportPacField'>
            <label htmlFor="pacId">Pacs (can only be added after event is created/during edit)</label>
          </div>

          <div className="form-group" style={style.headline}>
            <label htmlFor="headline">headline</label>
            <input type="text" value={this.state.event.headline || ''} onChange={this.onUpdate.bind(this, 'headline')} className="form-control" id="headline" ref="headline" placeholder="headline" />
          </div>
          <div className="form-group" style={style.summary || ''}>
            <label htmlFor="summary">summary (saves output as markdown)</label>
            <DraftJsStatefulEditor value={this.state.event.summary} onChange={this.onUpdate.bind(this, 'summary')} className="form-control" id="summary" ref="summary" placeholder="summary" />
          </div>

          <div className='form-group'>
            <button type="submit" className="btn btn-primary" onClick={this.createEvent.bind(this)}>Create Event</button>
          </div>

          <input type="file" id="fileInput" accept="image/jpeg, image/png" style={style.file} onChange={FileUtils.upLoadFile.bind(this)}/>
        </form>
        <Link to='manage_events'>Back To Events</Link>
      </div>
    );
  }
}
