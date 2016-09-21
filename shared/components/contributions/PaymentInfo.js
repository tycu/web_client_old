import React from 'react';
import { Link, browserHistory } from "react-router";
import MainCard from './MainCard';
import SetCard from './SetCard';
import CardStore from '../../stores/CardStore';
import * as CardActions from '../../actions/CardActions';
import ReactTooltip from 'react-tooltip';
const Modal = require('react-modal');

export default class PaymentInfo extends React.Component {
  constructor() {
    super();
    this.getCard = this.getCard.bind(this);

    this.state = {
      customerId: '',
      amountFocus: false,
      paymentFocus: true,
      showEditCard: false,
      modalIsOpen: false,
      spinner: '',
      modalTitle: '',
      modalText: '',
      modalButton: '',
      key: 1
    };
  }

  static propTypes = {
    modalIsOpen:  React.PropTypes.bool,
    spinner:      React.PropTypes.string,
    modalText:    React.PropTypes.string,
    modalButton:  React.PropTypes.string,
    amountFocus:  React.PropTypes.bool,
    paymentFocus: React.PropTypes.bool,
    customerId:   React.PropTypes.string
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    if (!this.state.stripeError) {
      browserHistory.replace('/');
    }
  }

  componentDidMount() {
    CardStore.addChangeListener(this.getCard);

  }
  componentWillUnmount() {
    CardStore.removeChangeListener(this.getCard);
  }

  getCard() {
    this.setState({
      customerId:  CardStore.getCustomerId(),
      customer:    CardStore.getCustomer(),
      spinner:     CardStore.getSpinnerState(),
      stripeError: CardStore.getStripeError(),
      modalTitle:  CardStore.getModalTitle(),
      modalText:   CardStore.getModalText(),
      modalButton: CardStore.getModalButtonText(),
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
    });
  }

  showEditCard(val, e) {
    e.preventDefault();

    this.setState({
      showEditCard: val
    });
  }

  createDonation(createDonation, e) {
    e.preventDefault();
    this.setState({
      spinner: '<img class="alignnone" src="https://i0.wp.com/cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif?resize=48%2C48" alt="" width="32" height="32"/>',
      modalIsOpen: true,
      modalText: 'Processing payment...'
    });
    const chargeDetails = {
      amount: this.props.donationAmount,
      customerId: this.state.customerId,
      pacId: this.props.selectedPacId,
      eventId: this.props.eventId,
      support: this.props.support
    };
    CardActions.chargeCustomer(chargeDetails);
  }

  handleUserInput(childState) {
    this.setState(childState);
  }


  render() {
    const style = {
      donationHeader: {
        margin: '20px 0px',
        width: '100%'
      },
      donateButtonRow: {
        paddingTop: '20px'
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
        float: 'left'
      },
      justifyRight: {
        textAlign: 'right'
      },
      columnSplit: {
        width: '90%'
      },
      modal: {
        success: {
          backgroundColor: '#3FC59D',
          height: '160px',
          fontSize: '40px',
          textAlign: 'center'
        },
        error: {
          backgroundColor: '#E2747E',
          height: '160px',
          fontSize: '40px',
          textAlign: 'center'
        },
        button: {
          position: 'relative',
          margin: '0 auto',
          top: '20px'
        },
        glyf: {
          position: 'relative',
          top: '65px'
        },
        contents: {
          padding: '20px',
          textAlign: 'center'
        }
      },
      modalStyle: {
        overlay : {
          position: 'fixed',
          padding: '0px',
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          backgroundColor: 'rgba(255, 255, 255, 0.75)'
        },
        content : {
          padding: '0px',
          width: '350px',
          height: '350px',
          position: 'absolute',
          left: '50%',
          top: '25%',
          marginLeft: '-150px',
          marginTop: '-150px',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '3px',
          outline: 'none'
        }
      }
    };

    const eventId = this.props.eventId;
    const pacName = this.props.selectedPacName;
    const showEditCard = this.state.showEditCard;
    const hasCard = this.state.customerId.length > 0;
    const customerId = this.state.customerId;

    const donationDollar = parseFloat(this.props.donationAmount, 10);
    const donationCents  = Math.floor(Math.max(donationDollar * 100, 500));
    const feeCents  = Math.max(Math.round(donationCents * 0.15), 99);
    const feeDollar = feeCents / 100;
    const chargeSum = donationDollar + feeDollar;

    const spinner = this.state.spinner;

    return (
      <div>
        <ReactTooltip // NOTE serves as globals for component
          effect='solid'
          multiline={true}
          delayShow={400}
          delayHide={200}
        />
        <div style={style.donationHeader}><strong>Make a donation of ${donationDollar}</strong> to {pacName}</div>


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
                <th style={style.columnSplit}>
                  <MainCard cardInfo={this.handleUserInput.bind(this)} />
                </th>
                <th>&nbsp;</th>
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

        <Modal
          isOpen={this.state.modalIsOpen}
          shouldCloseOnOverlayClick={false}
          onRequestClose={this.closeModal.bind(this)}
          style={style.modalStyle}
        >
          {((this.state.stripeError) ? (
            <div style={style.modal.error}><span style={style.modal.glyf} class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span></div>
          ) : (
            <div style={style.modal.success}><span style={style.modal.glyf} class="glyphicon glyphicon glyphicon-check" aria-hidden="true"></span></div>
          ))}

          <div style={style.modal.contents}>
            <h3>{this.state.modalTitle}</h3>

            <div dangerouslySetInnerHTML={{__html: spinner}}></div>
            <div>{this.state.modalText}</div>

            {((this.state.modalButton === undefined) ? (
              <span></span>
            ) : (
              <button style={style.modal.button} className="btn btn-danger" onClick={this.closeModal.bind(this)}>{this.state.modalButton}</button>
            ))}
          </div>
        </Modal>

      </div>
    );
  }
}
