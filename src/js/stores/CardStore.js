import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import CardActions from '../actions/CardActions';
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import * as Constants from '../constants/CardConstants';
import request from 'reqwest';
import when from 'when';
import AuthStore from '../stores/AuthStore';

class CardStore extends EventEmitter {
  constructor() {
    super()

    this.email    = '';
    this.message  = '';
    this.error    = '';
    this.stripeError = '';
  }

  getMessage() {
    return this.message;
  }

  getError() {
    return this.error;
  }

  getStripeError() {
    return this.stripeError;
  }

  getCustomerId() {
    return localStorage.stripeCustomerId;
  }

  getCustomer() {
    return this.customer;
  }

  getCCLast4() {
    return this.last4;
  }

  getCCBrand() {
    return this.brand;
  }

  getSpinnerState() {
    return this.spinner;
  }

  getModalText() {
    return this.modalText;
  }

  getModalTitle() {
    return this.modalTitle;
  }

  getModalButtonText() {
    return this.modalButton;
  }

  stripePublicKey() {
    if (process.env.NODE_ENV === "production") {
      return Constants.PUBLIC_KEY_LIVE;
    } else {
      return Constants.PUBLIC_KEY_TEST;
    }
  }

  fetchCustomerId(stripePublicKey) {
    var that = this;
    const url = Constants.GET_CUSTOMER;
    const tokenLocal = AuthStore.getAuthToken();
    const email = AuthStore.currentUser();

    return this.handleGetCustomer(when(request({
      url: url,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      headers: {
        authorization: "Bearer " + tokenLocal
      },
      data: {
        email: email,
        stripePublicKey: that.stripePublicKey()
      }
    })));
  }

  handleGetCustomer(customerPromise) {
    var that = this;

    return customerPromise
    .then(function(response) {
      var customerId = response.user.stripeCustomerUuid;
      if (customerId) {
        that.customerId = customerId;
      }
      var customer = response.customer;
      if (customer) {
        that.customer = customer;
        var showCardData = customer.sources.data[0]
        that.last4 = showCardData.last4;
        that.brand = showCardData.brand;
      }
      localStorage.setItem('stripeCustomerId', customerId)
      that.stripeError = false;
      that.error = '';
      that.emit('change');
      return true;
    })
    .catch(function(response) {
      if ((response.status !== 200) || response.status !== 304) {
        var alertText = JSON.parse(response.response).message;
        that.stripeError = true;
        that.message = '';
        that.error = alertText;
        console.log("Error fetching Card Details", response);
        that.emit('change');
        return false;
      }
    });
  }

  setCustomer(cardToken) {
    var that = this;
    const url = Constants.SET_CUSTOMER;
    const tokenLocal = AuthStore.getAuthToken();
    const email = AuthStore.currentUser();
    const userId = AuthStore.currentUserId();

    return this.handleSetCustomer(when(request({
      url: url,
      method: 'PUT',
      crossOrigin: true,
      type: 'json',
      headers: {
        authorization: "Bearer " + tokenLocal
      },
      data: {
        email: email,
        cardToken: cardToken,
        userId: userId
      }
    })));
  }

  handleSetCustomer(customerPromise) {
    var that = this;

    return customerPromise
    .then(function(response) {
      that.message = 'Card Added Successfully';
      that.stripeError = false;
      that.error = '';
      that.spinner = '';
      that.emit('change');
      return true;
    })
    .catch(function(response) {
      if ((response.status !== 200) || response.status !== 304) {
        var alertText = JSON.parse(response.response).message;
        that.stripeError = true;
        that.spinner = '';
        that.message = '';
        that.error = alertText;
        console.log("Error fetching Card Details", response);
        that.emit('change');
        return false;
      }
    });
  }

  chargeCustomer(chargeDetails) {
    var that = this;
    const url = Constants.CHARGE_CUSTOMER;
    const tokenLocal = AuthStore.getAuthToken();
    const email = AuthStore.currentUser();

    return this.handleCreateCharge(when(request({
      url: url,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      headers: {
        authorization: "Bearer " + tokenLocal
      },
      data: {
        email: email,
        stripePublicKey: that.stripePublicKey(),
        amount: chargeDetails.amount,
        customerId: chargeDetails.customerId,
        pacId: chargeDetails.pacId,
        eventId: chargeDetails.eventId,
        support: chargeDetails.support
      }
    })));
  }

  handleCreateCharge(chargePromise) {
    var that = this;

    return chargePromise
    .then(function(user) { // NOTE returns Tally JWT/User object
      that.spinner = '';
      that.modalTitle = 'Great!';
      that.modalText = 'Your payment was processed successfully.';
      that.modalButton = 'Back To Articles';
      that.stripeError = false;
      that.error = '';
      that.emit('change');
      return true;
    })
    .catch(function(response) {
      // TODO clean up response/error handling here
      // test with card failures
      // https://stripe.com/docs/testing

      if ((response.status !== 200) || response.status !== 304) {
        var alertText = JSON.parse(response.response).message;
        that.spinner = '';
        that.modalTitle = 'Oops';
        that.modalText = alertText;
        that.modalButton = 'Try again';
        that.stripeError = true;
        that.message = '';
        // that.error = alertText;
        console.log("Error processing payment.", response);
        that.emit('change');
        return false;
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

    switch(action.type) {
      case "GET_CUSTOMER_ID": {
        this.fetchCustomerId();
        break;
      }
    }
    switch(action.type) {
      case "SET_CUSTOMER": {
        this.setCustomer(action.cardToken);
        break;
      }
    }
    switch(action.type) {
      case "CHARGE_CUSTOMER": {
        this.chargeCustomer(action.chargeDetails);
        break;
      }
    }

    // switch(action.type) {
    //   case "DELETE_CARD": {
    //     this.deleteCustomer(action.email, action.password);
    //     break;
    //   }
    // }

  }
}

const cardStore = new CardStore;
dispatcher.register(cardStore.handleActions.bind(cardStore));
cardStore.setMaxListeners(5);
// window.dispatcher = dispatcher

export default cardStore;
