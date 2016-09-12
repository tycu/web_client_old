import React from 'react';
import { Link } from "react-router";
import MainCard from './MainCard';
import SetCard from './SetCard';
import CardStore from '../../stores/CardStore';
import * as CardActions from '../../actions/CardActions';
import ReactTooltip from 'react-tooltip';

// import Messages from '../layout/Messages';

export default class PaymentInfo extends React.Component {
  constructor() {
    super();
    this.getCard = this.getCard.bind(this);

    this.state = {
      customerId: '',
      amountFocus: false,
      paymentFocus: true,
      showEditCard: false,
      key: 1
    };
  }

  static propTypes = {
    amountFocus: React.PropTypes.bool,
    paymentFocus: React.PropTypes.bool,
    customerId: React.PropTypes.string
  }

  componentDidMount() {
    CardStore.addChangeListener(this.getCard);

  }
  componentWillUnmount() {
    CardStore.removeChangeListener(this.getCard);
  }

  getCard() {
    this.setState({
      customerId: CardStore.getCustomerId(),
      customer: CardStore.getCustomer(),
      key: Math.random()
    });
  }

  handleStateChange(val) {
    this.props.onComplete(val);
  }

  backToDonation(e) {
    e.preventDefault();
    this.handleStateChange({
      amountFocus: true,
      paymentFocus: false
    })
  }

  showEditCard(val, e) {
    e.preventDefault();

    this.setState({
      showEditCard: val
    })
  }

  createDonation(createDonation, e) {
    e.preventDefault();
    const chargeDetails = {
      amount: this.props.donationAmount,
      customerId: this.state.customerId,
      pacId: this.props.selectedPacId,
      eventId: this.props.eventId,
      support: this.props.support
    }
    CardActions.chargeCustomer(chargeDetails);
  }

  handleUserInput(childState) {
    this.setState(childState);
  }


  render() {
    const style = {
      donateButtonRow: {
        paddingTop: '20px',
        // width: '300px',
      },
      donateButton: {
        float: 'right'
      },
      clear: {
        width: '100%',
        clear: 'both'
      },
      checkout: {
        float: 'right',
        width: '300px'
      },
      cardInfo: {
        width: '400px',
        float: 'left',
      },
      justifyRight: {
        textAlign: 'right'
      },
      columnSplit: {
        width: '15%'
      }
    }

    const eventId = this.props.eventId;
    const pacName = this.props.selectedPacName;
    const showEditCard = this.state.showEditCard;
    const hasCard = this.state.customerId.length > 0;
    const customerId = this.state.customerId;

    const donationDollar = parseFloat(this.props.donationAmount, 10);
    const donationCents  = Math.floor(donationDollar * 100);
    const feeCents  = Math.min(Math.round(donationCents * 0.15), 2000)
    const feeDollar = feeCents / 100;
    const chargeSum = donationDollar + feeDollar


    return (
      <div>
        <ReactTooltip // NOTE serves as globals for component
          effect='solid'
          multiline='true'
          delayShow={400}
          delayHide={200}
        />
        <div><strong>Make a donation of ${donationDollar}</strong> to {pacName}</div>
        <br/><br/>

        <div style={style.cardInfo}>
          {((showEditCard) ? (
            <div>
              <SetCard />
              <a to='' onClick={this.showEditCard.bind(this, false)}>Close Card Change</a>
            </div>
          ) : (
            <a to='' onClick={this.showEditCard.bind(this, true)}>Add or Edit Card</a>
          ))}
        </div>

        <div style={style.checkout}>
          <table ref="table" class="table table-striped">
            <thead>
              <tr>
                <th style={style.columnSplit}>&nbsp;</th>
                <th style={style.columnSplit}>
                  <MainCard cardInfo={this.handleUserInput.bind(this)} />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Contribution Amount</td>
                <td style={style.justifyRight}>${donationDollar.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Fees&nbsp;<span data-tip="Our fees keep the Tally US news team bringing you<br/>the highest quality political coverage. It also keeps our<br/>servers running and and helps us stay ad free." class="glyphicon glyphicon-info-sign" aria-hidden="true"></span></td>
                <td style={style.justifyRight}>${feeDollar.toFixed(2)}</td>
              </tr>
              <tr>
                <td><strong>Total</strong></td>
                <td style={style.justifyRight}><strong>${chargeSum.toFixed(2)}</strong></td>
              </tr>
              {(hasCard) ? (
                <tr>
                  <td>&nbsp;</td>
                  <td style={style.donateButtonRow}><button style={style.donateButton} type='button' class="btn btn-primary" onClick={this.createDonation.bind(this, customerId)}>Pay Now</button></td>
                </tr>
                ) : (
                <tr>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <br/>
        <div style={style.clear}></div>
        <br/>
        <a href='' onClick={this.backToDonation.bind(this)}>Back to Amount</a>
        <br/>
      </div>
    )
  }
};
