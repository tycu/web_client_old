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

  getUploadStatus() {
    return this.uploadStatus;
  };

  getImageUrl() {
    return this.imageUrl;
  }

  uploadImage(file) {
    const tokenLocal = AuthStore.getAuthToken();
    var that = this;

    const url = Constants.UPLOAD_IMAGE + '?fileType=' + encodeURIComponent(file.type),
          xhr = new XMLHttpRequest(),
          imgixConfig = '?w=828&h=440&fit=crop';

    xhr.open("POST", url, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + tokenLocal);

    xhr.upload.onprogress = function(e) {
      const percent = Math.floor((e.loaded / e.total) * 100);
      that.uploadStatus = percent + '%';
      that.emit('change');
    }
    xhr.onload = function(e) {
      that.message = 'Image Uploaded Successfully.';
      that.error   = '';
      const response = JSON.parse(e.target.responseText);

      event.imageUrl = response.imageUrl;
      const dbUrl = event.imageUrl + imgixConfig;
      that.imageUrl = dbUrl;
      that.emit('change');
    }
    xhr.onerror = function() {
      that.error = 'Error uploading image.';
      that.message = '';
    }
    xhr.send(file)
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
        this.uploadImage(action.file, );
        break;
      }
    }
  }
}

const imageStore = new ImageStore;
dispatcher.register(imageStore.handleActions.bind(imageStore));

export default imageStore;
