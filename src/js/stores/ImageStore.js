import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import AuthStore from './AuthStore';
import { collections } from 'lodash';
import request from 'reqwest';
import when from 'when';
import * as Constants from '../constants/ImageConstants';

class ImageStore extends EventEmitter {
  constructor() {
    super()
  }

  getMessage() {
    return this.message;
  };

  getError() {
    return this.error;
  };

  // getPinnedId() {
  //   return this.pinnedId;
  // }

  uploadImage(eventId) {
    var tokenLocal = AuthStore.getAuthToken();
    var url = Constants.UPLOAD_IMAGE;
    var that = this;

    return when(request({
      url: url + eventId + '/toggle_publish',
      method: 'PUT',
      crossOrigin: true,
      type: 'json',
      headers: {
        authorization: "Bearer " + tokenLocal
      },
      data: {
        eventId: eventId
      }
    }))
    .then(function(response) {
      var publishText = response.isPublished ? 'Published' : 'Un-Published';
      that.isPublished = response.isPublished;
      that.publishChangeId = eventId;
      that.message = 'Event ' + publishText + ' Successfully';
      that.error = '';
      that.emit('change');
    })
    .catch(function(response) {
      if (response.status !== 200 || response.status !== 304) {
        that.error = "Error changing publish status of Event";
      }
    });
  }

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

  handleActions(action) {
    // console.log("EventStore received an action", action);
    switch(action.type) {
      case "UPLOAD_IMAGE": {
        this.uploadImage(action.eventInfo);
        break;
      }
    }
  }
}

const imageStore = new ImageStore;
dispatcher.register(imageStore.handleActions.bind(imageStore));

export default imageStore;
