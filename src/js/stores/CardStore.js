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
    return this.message;
  }

  getStripeError() {
    return this.stripeError;
  }

  getCustomerId() {
    return localStorage.stripeCustomerId;;
  }

  getCustomer() {
    return this.customer;
  }

  fetchCustomerId() {
    var that = this;
    const url = Constants.GET_CUSTOMER;
    const tokenLocal = AuthStore.getAuthToken();
    const email = AuthStore.currentUser();

    return this.handleGetCustomer(when(request({
      url: url,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
        authorization: "Bearer " + tokenLocal
      },
      data: {
        email: email
      }
    })));
  }

  handleGetCustomer(customerPromise) {
    var that = this;

    return customerPromise.then(function(response) {
      // that.message = '';

      var customerId = response.stripeCustomerUuid;
      if (customerId) {
        that.customerId = customerId;
      }
      var customer = response.customer;
      if (customer) {
        that.customer = customer;
      }
      localStorage.setItem('stripeCustomerId', customerId)
      that.stripeError = false;
      that.error = '';
      that.emit('change');
      return true;
    })
    .catch(function(response) {
      if (response.status !== 200) {
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

    return customerPromise.then(function(response) {
      // that.message = '';
      that.stripeError = false;
      that.error = '';
      that.emit('change');
      return true;
    })
    .catch(function(response) {
      if (response.status !== 200) {
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


  handleActions(action) {
    console.log("CardStore received an action", action);

    switch(action.type) {
      case "GET_CUSTOMER_ID": {
        this.fetchCustomerId(action.email);
        break;
      }
    }
    switch(action.type) {
      case "SET_CUSTOMER": {
        this.setCustomer(action.cardToken);
        break;
      }
    }
    // switch(action.type) {
    //   case "GET_CUSTOMER": {
    //     this.getCustomer(action.email, action.stripeToken);
    //     break;
    //   }
    // }



    // switch(action.type) {
    //   case "CHARGE_CUSTOMER": {
    //     this.signin(action.email, action.password);
    //     break;
    //   }
    // }
    // switch(action.type) {
    //   case "DELETE_CARD": {
    //     this.signin(action.email, action.password);
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
