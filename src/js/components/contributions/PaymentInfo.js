import React from 'react';
import { Link } from "react-router";
// import * as Constants from '../../constants/CardConstants';
// import Messages from '../layout/Messages';

export default class PaymentInfo extends React.Component {
  constructor() {
    super();
    // this.getCard = this.getCard.bind(this);

    this.state = {
      donationAmount: '0.00',
      selectedPac: 0,
      amountFocus: false,
      paymentFocus: true,
      key: 1
    };
  }

  static propTypes = {
    amountFocus: React.PropTypes.bool,
    paymentFocus: React.PropTypes.bool
  }

  componentDidMount() {
    // CardStore.addChangeListener(this.getCard);

  }
  componentWillUnmount() {
    // CardStore.removeChangeListener(this.getCard);
  }

  getCard() {
    this.setState({
      key: Math.random()
    });
  }

  handleStateChange(val) {
    this.props.onComplete(val);
  }


  backToDonation(e) {

    // NOTE needs to keep track of amount in event show
    // and event and pac ID

    e.preventDefault();
    this.handleStateChange({
      amountFocus: true,
      paymentFocus: false
    })
  }


  createDonation() {
          // TODO get this setting up contribution and
      // checking if has card etc.


      // const supportPacs = that.state.supportPacs;
      // const opposePacs  = that.state.opposePacs;

      // ContribiutionActions.updateEvent(eventId, {
      //   imageUrl: this.state.event.imageUrl,
      //   imageAttribution: this.state.event.imageAttribution,
      //   // politicianId: this.state.event.politicianId,
      //   headline: this.state.event.headline,
      //   summary: this.state.event.summary
      // });

  }

  setCard(e) {
  }

  onUpdate(key, val, fromCard) {
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
    }

    const eventId = this.props.eventId;

    return (
      <div>
        <div>payment info</div>

        <button type="button" class="btn btn-danger" style={style.continueButton} onClick={this.backToDonation.bind(this)}><span class="glyphicon glyphicon-arrow-left" aria-hidden="true">&nbsp;</span>&nbsp;&nbsp;Back to Amount</button>
      </div>
    )
  }
};
