import React from 'react';
import * as CardActions from '../../actions/CardActions';
import { Link } from "react-router";
import AuthStore from '../../stores/AuthStore';
import CardStore from '../../stores/CardStore';
import DateStore from "../../stores/DateStore";
import * as Constants from '../../constants/CardConstants';

import CardNumber from "./CardNumber";
import MonthList from "./MonthList";
import YearList from "./YearList";
import Cvc from "./Cvc";
import Messages from '../layout/Messages';

export default class SetCard extends React.Component {
  constructor() {
    super();
    this.getCard = this.getCard.bind(this);

    this.state = {
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
      customer: {},
      key: 1
    };
  }

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

  componentDidMount() {
    var stripePublicKey;
    if (process.env.NODE_ENV === "production") {
      stripePublicKey = Constants.PUBLIC_KEY_LIVE;
    } else {
      stripePublicKey = Constants.PUBLIC_KEY_TEST;
    }
    Stripe.setPublishableKey(stripePublicKey);
    CardActions.getCustomerId();
    CardStore.addChangeListener(this.getCard);
  }
  componentWillUnmount() {
    CardStore.removeChangeListener(this.getCard);
  }

  getCard() {
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
  }

  cardInfoComplete() {
    var that = this;
    var requiredFields = ['number', 'cvc', 'exp_month', 'exp_year'];
    var shouldContinue = true;

    _(requiredFields).forEach(function(value) {
      if (_.isEmpty(that.state[value])) {
        shouldContinue = false
        return false;
      }
    });
    return shouldContinue;
  }

  setCard(e) {
    e.preventDefault();
    var that = this;

    // validate that month/year is used, otherwise add error
    if (!that.cardInfoComplete()) {
      that.setState({
        error: "You must complete all Fields to save your Credit Card."
      });
      return false;
    } else {
      that.setState({
        error: ''
      });

      Stripe.createToken(this.state.card, function (status, response) {
        console.log(status, response);
        // then send this response to server
        CardActions.setCustomer(response.id);
      });
    }
  }

  onUpdate(key, val, fromCard) {
    var that = this;
    if (fromCard) {
      let card = this.state.card;
      card[key] = val;
      that.setState(card);
    } else {
      that.setState({
        [key]: val
      });
    }
  }


  render() {
    const style = {
      container: {
        width: '400px',
      },
      number: {
        clear: 'both',
        width: '340px'
      },
      exp_month: {
        width: '110px',
        float: 'left',
        clear: 'both',
        marginRight: '20px'
      },
      exp_year: {
        width: '90px',
        float: 'left',
        marginRight: '20px'
      },
      cvc: {
        width: '98px',
        float: 'left',
        marginRight: '20px'
      },
      addCard: {
        width: '98px',
        marginTop: '20px'
      }
    }

    return (
      <form role='form' style={style.container}>
        <Messages key={this.state.key + 1}  {...this.state} />

        <div className="form-group">
          <CardNumber value={this.state.card.number} onChange={this.onUpdate.bind(this, 'number')} style={style.number} />
        </div>
        <div className="form-group">
          <MonthList value={this.state.card.exp_month} onChange={this.onUpdate.bind(this, 'exp_month')} defaultValue="1" style={style.exp_month} />
        </div>
        <div className="form-group">
          <YearList value={this.state.card.exp_year} onChange={this.onUpdate.bind(this, 'exp_year')} style={style.exp_year}/>
        </div>
        <div className="form-group">
          <Cvc value={this.state.card.cvc} onChange={this.onUpdate.bind(this, 'cvc')} style={style.cvc} />
        </div>

        <div className="form-group">
          <button style={style.addCard} type="submit" className="btn btn-primary" onClick={this.setCard.bind(this)}>Add Card</button>
        </div>
      </form>
    )
  }
};
