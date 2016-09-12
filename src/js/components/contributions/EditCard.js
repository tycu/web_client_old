import React from 'react';
import * as CardActions from '../../actions/CardActions';
import { Link } from "react-router";
import AuthStore from '../../stores/AuthStore';
import CardStore from '../../stores/CardStore';
import DateStore from "../../stores/DateStore";
import * as Constants from '../../constants/CardConstants';

import SetCard from "./SetCard";

export default class EditCard extends React.Component {
  constructor() {
    super();
    // this.getCard = this.getCard.bind(this);

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
    // CardActions.getCustomerId(stripePublicKey);
    // CardActions.getCustomerId(AuthStore.currentUser());
    // CardStore.addChangeListener(this.getCard);
  }
  componentWillUnmount() {
    // CardStore.removeChangeListener(this.getCard);
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


  render() {
    const style = {
      container: {
        padding: '20px',
        background: 'white',
        width: '400px',
        height: '330px',
        borderRadius: '2px'
      },
      linkback: {
        clear: 'both',
        marginTop: '20px'
      }
    }

    return (
      <div style={style.container}>
        <h3>Add/Update Card</h3>
        <SetCard {...this.state} />

        <div style={style.linkback}>
          <Link to="/contributions">Back To Contributions</Link>
        </div>
      </div>
    )
  }
};
