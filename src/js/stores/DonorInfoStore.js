import { EventEmitter } from "events";
import request from 'reqwest';
import dispatcher from "../dispatcher";
var Promise = require("bluebird");

class DonorInfoStore extends EventEmitter {
  constructor() {
    super()

    // TODO needs to call endpoint
    this.donorInfo = {
      id: '1',
      employed: true,
      occupation: 'Developer',
      employer: 'McDonalds',
      name: 'Matt Freeman',
      city: 'Etna',
      residenceState: 'NH',
      zip: '03750'
    }
  }

  getDonorInfo() {
    return this.donorInfo;
  }

  updateDonorInfo(donorInfo) {
    var res = Promise.resolve(
      request({
        url: 'http://localhost:5000/v1/user/' + donorInfo.id,
        type: 'json',
        crossOrigin: true,
        method: 'PUT',
        data: {
          user: donorInfo
        }
      })
    );
  }

  handleActions(action) {
    console.log("DonorInfoStore received an action", action);
    switch(action.type) {
      case "UPDATE_DONOR_INFO": {
        this.updateDonorInfo(action.donorInfo);
        break;
      }
    }
  }
}

const donorInfoStore = new DonorInfoStore;
dispatcher.register(donorInfoStore.handleActions.bind(donorInfoStore));

export default donorInfoStore;
