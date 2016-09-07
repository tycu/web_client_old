import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import Promise from 'bluebird';
import AuthStore from './AuthStore';
import * as Constants from '../constants/PoliticianPhotoConstants';
import request from 'reqwest';
import when from 'when';

class PoliticianPhotoStore extends EventEmitter {
  constructor() {
    super()
  }

  getPoliticianPhotos() {
    return this.politicianPhotos || [];
  }

  getPhoto() {
    return this.politicianPhoto || {
      politicianId: '',
      url: '',
      main: ''
    };
  }

  getMessage() {
    return this.message;
  };

  getError() {
    return this.error;
  };

  fetchPoliticianPhotos(politicianId) {
    var that = this;
    const url = Constants.GET_POLITICIAN_PHOTOS;
    const tokenLocal = AuthStore.getAuthToken();

    return when(request({
      url: url + politicianId + '/politician_photos',
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
        authorization: "Bearer " + tokenLocal
      }
    }))
    .then(function(response) {
      that.politicianPhotos = response || [];
      that.error = '';
      that.emitEvent();
    })
    .catch(function(response) {
      if (response.status !== 200 || response.status !== 304) {
        that.error = 'There is an error loading Politician Photos';
        console.log("Error loading Politician Photos", response);
        that.emitEvent();
      }
    });
  }

  fetchPoliticianPhoto(politicianId, politicianPhotoId) {
    var that = this;
    const url = Constants.GET_POLITICIAN_PHOTO;
    const tokenLocal = AuthStore.getAuthToken();

    return when(request({
      url: url + politicianId + '/politician_photos/' + politicianPhotoId,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
        authorization: "Bearer " + tokenLocal
      }
    }))
    .then(function(response) {
      var politicianPhoto = {};
      politicianPhoto['politicianPhotoId'] = response.id || '';
      politicianPhoto['politicianId'] = response.politicianId || '';
      politicianPhoto['url'] = response.name || '';
      politicianPhoto['main'] = response.description || '';
      that.politicianPhoto = politicianPhoto;
      that.emitEvent();
    })
    .catch(function(response) {
      if (response.status !== 200 || response.status !== 304) {
        console.log("Error loading politician_photo", response);
      }
    });
  }

  updatePoliticianPhoto(politicianId, politicianPhotoId, politicianPhotoInfo) {
    const tokenLocal = AuthStore.getAuthToken();
    const url = Constants.UPDATE_POLITICIAN_PHOTO;

    var res = Promise.resolve(
      request({
        url: url + politicianId + '/politician_photos/' + politicianPhotoId,
        type: 'json',
        crossOrigin: true,
        method: 'PUT',
        headers: {
          authorization: "Bearer " + tokenLocal
        },
        data: {
          politicianPhoto: politicianPhotoInfo
        }
      })
    );
    this.emitEvent();
  }

  createPoliticianPhoto(politicianId, politicianPhotoInfo) {
    const tokenLocal = AuthStore.getAuthToken();
    const url = Constants.CREATE_POLITICIAN_PHOTO;

    var res = Promise.resolve(
      request({
        url: url + politicianId + '/politician_photos',
        type: 'json',
        crossOrigin: true,
        method: 'POST',
        headers: {
          authorization: "Bearer " + tokenLocal
        },
        data: {
          politicianPhoto: politicianPhotoInfo
        }
      })
    );
    this.emitEvent();
  }

  deletePoliticianPhoto(politicianId, politicianPhotoId) {
    const tokenLocal = AuthStore.getAuthToken();
    const url = Constants.DELETE_POLITICIAN_PHOTO;

    var res = Promise.resolve(
      request({
        url: url + politicianId + '/politician_photos/' + politicianPhotoId,
        type: 'json',
        crossOrigin: true,
        method: 'DELETE',
        headers: {
          authorization: "Bearer " + tokenLocal
        }
      })
    );
    this.emitEvent();
  }

  addChangeListener(callback) {
    this.on('politicianPhotoChange', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('politicianPhotoChange', callback);
  }

  emitEvent() {
    this.emit('politicianPhotoChange');
  }

  handleActions(action) {
    // console.log("PoliticianPhotoStore received an action", action);

    switch(action.type) {
      case "FETCH_POLITICIAN_PHOTOS": {
        this.fetchPoliticianPhotos(action.politicianId);
        break;
      }
      case "FETCH_POLITICIAN_PHOTO": {
        this.fetchPoliticianPhoto(action.politicianId, action.politicianPhotoId);
        break;
      }
      case "UPDATE_POLITICIAN_PHOTO": {
        this.updatePoliticianPhoto(action.politicianId, action.politicianPhotoId, action.politicianPhotoInfo);
        break;
      }
      case "CREATE_POLITICIAN_PHOTO": {
        this.createPoliticianPhoto(action.politicianId, action.politicianPhotoInfo);
        break;
      }
      case "DELETE_POLITICIAN_PHOTO": {
        this.deletePoliticianPhoto(action.politicianId, action.politicianPhotoId);
        break;
      }

      case "DELETE_UNSAVED_POLITICIAN_PHOTO": {
        this.deleteUnsavedPoliticianPhoto(action.photoIndex);
        break;
      }
    }
  }
}

const politicianPhotoStore = new PoliticianPhotoStore;
dispatcher.register(politicianPhotoStore.handleActions.bind(politicianPhotoStore));

export default politicianPhotoStore;
