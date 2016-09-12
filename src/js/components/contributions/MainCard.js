import React from 'react';
import * as CardActions from '../../actions/CardActions';
import * as Constants from '../../constants/CardConstants';
import CardStore from '../../stores/CardStore';

export default class MainCard extends React.Component {
  constructor() {
    super();
    this.getCard = this.getCard.bind(this);

    this.state = {
      customerId: true,
      cardText: '',
      brand: '',
      last4: '',
      key: 1
    };
  }

  static propTypes = {
    customerId: React.PropTypes.string,
    cardText: React.PropTypes.string,
    brand: React.PropTypes.string,
    last4: React.PropTypes.string
  }

  componentWillMount() {
    // TODO is this right? throwing setState error
    this.setState({
      cardText: '<img class="alignnone" src="https://i0.wp.com/cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif?resize=48%2C48" alt="" width="32" height="32"/>'
    });

    setTimeout(() => {
      this.setState({
        cardText: ' Card not set.'
      });
    }, 4000);
  }

  componentDidMount() {
    var stripePublicKey;
    if (process.env.NODE_ENV === "production") {
      stripePublicKey = Constants.PUBLIC_KEY_LIVE;
    } else {
      stripePublicKey = Constants.PUBLIC_KEY_TEST;
    }
    Stripe.setPublishableKey(stripePublicKey);
    CardActions.getCustomerId(stripePublicKey);
    CardStore.addChangeListener(this.getCard);
  }

  getCard() {
    this.setState({
      last4: CardStore.getCCLast4(),
      brand: CardStore.getCCBrand(),
      customerId: CardStore.getCustomerId(),
      key:   Math.random()
    });
  }

  componentWillUnmount() {
    CardStore.removeChangeListener(this.getCard);
  }

  deleteCard(e) {
    e.preventDefault();
    CardActions.deleteCustomer();
  }


  render() {
    const style = {
      container: {
        background: 'white',
      },
      button: {
        marginLeft: '20px'
      }
    }
    const { last4 } = this.state;
    const { brand } = this.state;
    const { cardText } = this.state;

    // NOTE stripe suggests deleting entire customer
    // perhaps add to settings
    // https://support.stripe.com/questions/can-i-delete-a-customer-s-card-from-my-stripe-account

    //   <button style={style.button} type="submit" className="btn btn-primary" onClick={this.deleteCard.bind(this)}>Delete</button>

    return (
      <div style={style.container}>
        <b>Your Primary Card:</b>
        {(last4 ? (
          <div>
            <input type="radio" defaultChecked />
            <span> {brand} ending in {last4}</span>
          </div>
        ) : (<span dangerouslySetInnerHTML={{__html: cardText}}></span>))}
      </div>
    )
  }
};
