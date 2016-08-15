import React from 'react';
import * as CardActions from '../../actions/CardActions';
import AuthStore from '../../stores/AuthStore';
import CardStore from '../../stores/CardStore';
import DateStore from "../../stores/DateStore";
import * as Constants from '../../constants/CardConstants';

import CardNumber from "./CardNumber";
import MonthList from "./MonthList";
import YearList from "./YearList";
import Cvc from "./Cvc";

export default class SetCard extends React.Component {

  static propTypes = {
    card: React.PropTypes.shape({
      number:     React.PropTypes.string,
      cvc:        React.PropTypes.string,
      exp_month:  React.PropTypes.string,
      exp_year:   React.PropTypes.string
    }),
    customerId: React.PropTypes.string,
    exp_month: React.PropTypes.string,
    exp_year:  React.PropTypes.string,
    stripeError: React.PropTypes.bool,
    error:     React.PropTypes.string,
    message:   React.PropTypes.string,
    email:     React.PropTypes.string,
    customer:  React.PropTypes.object
  }

  // should send card info to stripe
  // get user token back
  // send this to api

  // TODO remove test data
  state = {
    card: {
      number: '',
      cvc: '',
      exp_month: '',
      exp_year: ''
      // address_zip
    },
    customerId: '',
    stripeError: false,
    error: '',
    message: '',
    email: '',
    exp_month: '',
    exp_year: '',
    customer: {},
    key: 1
  }

  // NOTE will fire only once upon initial render
  componentWillMount() {
    CardStore.on("change", () => {
      this.setState({
        email:       AuthStore.currentUser(),
        customerId:  CardStore.getCustomerId(),
        message:     CardStore.getMessage(),
        exp_month:   this.state.exp_month,
        exp_year:    this.state.exp_year,
        error:       CardStore.getError(),
        customer:    CardStore.getCustomer(),
        stripeError: CardStore.getStripeError(),
        key:         Math.random()
      });
    });
  }

  componentWillUnmount() {
    CardStore.removeListener('change', this.getCustomerId);
  }

  getCustomerId() {
    this.setState({
      customerId: CardActions.fetchCustomerId(AuthStore.currentUser())
    });
  }

  componentDidMount() {
    var publicKey;
    if (process.env.NODE_ENV === "production") {
      publicKey = Constants.PUBLIC_KEY_LIVE;
    } else {
      publicKey = Constants.PUBLIC_KEY_TEST;
    }
    Stripe.setPublishableKey(publicKey);
    CardActions.getCustomerId(this.state.email);
  }


  setCard(e) {
    e.preventDefault();

    Stripe.createToken(this.state.card, function (status, response) {
      console.log( status, response );
      // then send this response to server
      CardActions.setCustomer(response.id)
    });
  }

  onUpdate(key, val, fromCard) {
    if (fromCard) {
      let card = this.state.card;
      card[key] = val;
      this.setState(card);
    } else {
      this.setState({
        [key]: val
      });
    }
  }


  render() {
    const style = {
      container: {
        padding: '20px',
        background: 'white',
        width: '400px',
        height: '300px',
        borderRadius: '2px'
      },
      number: {
        marginLeft: '10px',
        clear: 'both',
        width: '300px'
      },
      cvc: {
        width: '80px',
        display: 'inline',
        float: 'left',
        marginRight: '20px'
      },
      exp_month: {
        width: '110px',
        display: 'inline',
        float: 'left',
        marginRight: '20px'
      },
      exp_year: {
        width: '90px',
        display: 'inline',
        float: 'left',
        marginRight: '20px'
      }
    }

    return (
      <form role='form' style={style.container}>
        <CardNumber value={this.state.number} onChange={this.onUpdate.bind(this, 'number')} style={style.number} />
        <MonthList value={this.state.exp_month} onChange={this.onUpdate.bind(this, 'exp_month')} style={style.exp_month} />
        <YearList value={this.state.exp_year} onChange={this.onUpdate.bind(this, 'exp_year')} style={style.exp_year}/>
        <Cvc value={this.state.cvc} onChange={this.onUpdate.bind(this, 'cvc')} style={style.cvc} />
        <div className="form-group">
          <div className="form-group pull-left">
            <button type="submit" className="btn btn-primary" onClick={this.setCard.bind(this)}>Add Card</button>
          </div>
        </div>
      </form>
    )
  }
};
