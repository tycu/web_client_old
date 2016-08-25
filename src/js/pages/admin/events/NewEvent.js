import React from 'react';
import { Link, browserHistory } from "react-router";
import { collections } from 'lodash';
import EventStore from "../../../stores/EventStore";
import ImageStore from "../../../stores/ImageStore";
import AuthStore from "../../../stores/AuthStore";
import * as EventActions from "../../../actions/EventActions";
import * as ImageActions from "../../../actions/ImageActions";
import Messages from '../../../components/layout/Messages';
import PoliticiansField from './PoliticiansField';
import * as Constants from '../../../constants/ImageConstants';

export default class NewEvent extends React.Component {

  constructor() {
    super();

    this.state = {
      event: {
        isPinned: false,
        imageUrl: '',
        imageAttribution: '',
        politicianId: '',
        headline: '',
        summary: ''
      },
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

  onUpdate(key, e) {
    let event = this.state.event;

    // TODO Fix
    if (key === 'color') {
      event[key] = e;
    } else {
      var val = e.target.value;
      event[key] = val;
    }
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

  clickToAddFile(e) {
    e.preventDefault();
    fileInput.click();
  }

  upLoadFile(e) {
    e.preventDefault();
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0]
    if (!file) {
      return;
    }

    // NOTE not using standard flux action patter so we can get progress %
    // NOTE hack
    // ImageActions.uploadImage()


    image.src = '';
    const url = Constants.UPLOAD_IMAGE + '?fileType=' + encodeURIComponent(file.type),
          xhr = new XMLHttpRequest(),
          imgixConfig = '?w=828&h=440&fit=crop';

    xhr.open("POST", url, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + AuthStore.getAuthToken());
    xhr.upload.onprogress = function(e) {
      const percent = Math.floor((e.loaded / e.total) * 100);
      progress.textContent = percent + '%';
    }
    xhr.onload = function(e) {
      progress.textContent = 'Image Uploaded Successfully.';
      const response = JSON.parse(e.target.responseText);
      event.imageUrl = response.imageUrl;
      const dbUrl = event.imageUrl + imgixConfig;
      image.src = dbUrl;

      this.setState({
        imageUrl: dbUrl
      });
    }
    xhr.onerror = function() {
      progress.textContent = 'Error uploading image.';
    }
    xhr.send(file)
  }

  createEvent(e) {
    e.preventDefault();
    var that = this;

    if (!that.validEvent()) {
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
          // display: 'none'
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
          <h2>New Event</h2>
          <Messages {...this.state} />

          <div style={style.img} onClick={this.clickToAddFile.bind(this)}>
            <img id="image" class="pointer" height="100%" width="100%" />
            <div id="progress" style={style.img.progress}></div>
          </div>

          <div className="form-group" style={style.imageUrl}>
            <label htmlFor="imageUrl">imageUrl</label>
            <input type="text" value={this.state.event.imageUrl} onChange={this.onUpdate.bind(this, 'imageUrl')} className="form-control" id="imageUrl" ref="imageUrl" placeholder="imageUrl" />
          </div>
          <div className="form-group" style={style.imageAttribution}>
            <label htmlFor="imageAttribution">imageAttribution</label>
            <input type="text" value={this.state.event.imageAttribution} onChange={this.onUpdate.bind(this, 'imageAttribution')} className="form-control" id="imageAttribution" ref="imageAttribution" placeholder="imageAttribution" />
          </div>
          <div className="form-group" style={style.politicianId}>
            <label htmlFor="politicianId">Politician</label>
            <PoliticiansField value={this.state.event.politicianId} onChange={this.onUpdate.bind(this, 'politicianId')} />
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
            <button type="submit" className="btn btn-primary" onClick={this.createEvent.bind(this)}>Create Event</button>
          </div>

          <input type="file" id="fileInput" accept="image/jpeg, image/png" style={style.file} onChange={this.upLoadFile.bind(this)}/>
        </form>
        <Link to='manage_events'>Back To Events</Link>
      </div>
    );
  }
}
