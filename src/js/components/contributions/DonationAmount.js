import React from 'react';
import { Link, browserHistory } from "react-router";
import PacEventStore from "../../stores/PacEventStore";
import * as PacEventActions from "../../actions/PacEventActions";
import Messages from '../layout/Messages';
import ReactTooltip from 'react-tooltip';

export default class DonationAmount extends React.Component {
  constructor() {
    super();
    this.getPacEvents = this.getPacEvents.bind(this);

    this.state = {
      donationAmount: '0.00',
      selectedPacId: '',
      selectedPacName: '',
      amountFocus: true,
      paymentFocus: false,
      pacEvents: PacEventStore.getPacEvents(),
      displayAmt: '',
      key: 1
    };
  }

  static propTypes = {
    donationAmount:  React.PropTypes.string,
    selectedPacId:   React.PropTypes.number,
    selectedPacName: React.PropTypes.string,
    pacEvents:       React.PropTypes.array,
    displayAmt:      React.PropTypes.string,
    event:           React.PropTypes.shape({
      eventId:       React.PropTypes.number,
      isPinned:      React.PropTypes.bool,
      imageUrl:      React.PropTypes.string,
      imageAttribution: React.PropTypes.string,
      politicianId:  React.PropTypes.number,
      headline:      React.PropTypes.string,
      summary:       React.PropTypes.string
    }),
    amountFocus: React.PropTypes.bool,
    paymentFocus: React.PropTypes.bool
  }

  handleStateChange(val) {
    this.props.onComplete({
      amountFocus: false,
      paymentFocus: true,
      donationAmount: this.state.donationAmount,
      selectedPacId: this.state.selectedPacId,
      selectedPacName: this.state.selectedPacName
    });
  }

  componentDidMount() {
    const eventId = this.props.eventId;
    const support = window.location.search.split('=')[1] === 'true';
    PacEventStore.addChangeListener(this.getPacEvents);
    PacEventActions.fetchPacEvents(eventId, support);

    this.setState({
      amountFocus: true,
      pacEvents: PacEventStore.getPacEvents()
    });
  }

  componentWillUnmount() {
    PacEventStore.removeChangeListener(this.getPacEvents);
  }

  getCard() {
    this.setState({
      key: Math.random()
    });
  }

  getPacEvents() {
    var that = this;
    this.setState({
      pacEvents: PacEventStore.getPacEvents(),
      selectedPacId: PacEventStore.getFirstMatchingId(),
      selectedPacName: PacEventStore.getFirstMatchingName()
    });
  }

  selectTargetPac(pacOpts, e) {
    this.setState(pacOpts);
  }

  onUpdate(amount, e) {
    e.preventDefault();
    var that = this,
        val,
        displayAmt = that.state.displayAmt;

    if (amount === 'enterAmount') {
      val = Math.floor(parseFloat(e.target.value, 10) * 100) / 100;
      displayAmt = e.target.value;
      if ((/\./).test(displayAmt) && displayAmt.split('.')[1].length > 2) {
        displayAmt = (Math.floor(parseFloat(displayAmt, 10) * 100) / 100).toFixed(2);
      }

      if (isNaN(val)) {
        val = '0.00';
      }
    } else {
      val = parseFloat(amount.replace(/\D/g,''), 10);
    }
    this.setState({
      donationAmount: val,
      displayAmt: displayAmt
    });
  }

  setDonationAmount(e) {
    e.preventDefault();
    var that = this,
        val;

    const donationAmount = this.state.donationAmount;

    if (isNaN(donationAmount) || donationAmount < 5) {
      that.setState({error: "Invalid amount, the minimum donation is $5.00."});
      return false;
    }
    else {
      that.setState({error: ""});
      const eventId = that.props.event.eventId;
      that.handleStateChange()
    }
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

      donationAmountBox: {
        float: 'left',
        width: '330px',
        minHeight: '250px',
        marginBottom: '30px',
        padding: '30px'
      },

      pacSelectBox: {
        marginLeft: '20px',
        float: 'left',
        width: '360px',
        padding: '20px',
        marginTop: '50px',
        '@media (minWidth: 768px)': {
          marginTop: '20px',
          minHeight: '100px',
          marginBottom: '20px',
        },
        '@media (minWidth: 990px)': {
          minHeight: '287px',
          marginTop: '108px',
          marginBottom: '30px',
        },
        '@media (minWidth: 1200px)': {
          minHeight: '287px',
          marginTop: '108px',
          marginBottom: '30px'
        }
      },
      donorFormPull: {
        cursor: 'auto',
        backgroundAttachment: 'scroll',
        backgroundAize: '16px 18px',
        backgroundPosition: '98% 50%',
        backgroundRepeat: 'noRepeat'
      },
      buttonRow: {
        width: '280px'
      },
      otherAmountInput: {
        width: '140px',
        marginLeft: '20px'
      },
      buttonPadding: {
        marginRight: '10px'
      },
      secure: {
        marginLeft: '80px'
      },
      continueButton: {
        marginTop: '20px'
      },
      submissionLine: {
        display: 'inline-block'
      },
      donationAmountIndicator: {
        fontSize: '18px',
        marginLeft: '31px',
        display: 'inline',
        position: 'relative',
        top:'12px'
      },
      lastButton: {
        width: '120px'
      }

    }
    // TODO clean up props and state handling so state is only in eventShow and props are passed up to it

    const donationAmount = parseFloat(this.state.donationAmount || "0.00", 10).toFixed(2);
    const pacEvents = this.state.pacEvents;
    const displayAmt = this.state.displayAmt;
    const support = this.props.support;
    const that = this;

    if (pacEvents.length > 0 && support !== undefined) {
      var selectPacButtons = pacEvents.map(function(pacEventWithPac, i) {
        // NOTE must match support or oppose
        if (pacEventWithPac.support === support) {
          return (
            <div class="radio" key={i + Math.random()}>
              <input class='btn btn-default' type="radio" name={pacEventWithPac.Pac.name}
                     value={pacEventWithPac.id}
                     checked={pacEventWithPac.pacId === this.state.selectedPacId}
                     onChange={this.selectTargetPac.bind(this, {selectedPacId: pacEventWithPac.pacId, selectedPacName: pacEventWithPac.Pac.name})} />
               <span>{pacEventWithPac.Pac.name}</span>
            </div>
          );
        }
      }, this);
    }


    return (
      <div>
        <ReactTooltip // NOTE serves as globals for component
          effect='solid'
          multiline={true}
          delayShow={400}
          delayHide={200}
        />

        <div style={style.donationAmountBox}>
          <br/>
          <Messages key={this.state.key + 1} {...this.state} />
          <div class='pull-left'>
            <p>
              <strong>Select an Amount</strong>
              <span style={style.secure}>
                <span class="glyphicon glyphicon-lock" aria-hidden="true">&nbsp;</span>
                Secure
              </span>
            </p>

            <div style={style.buttonRow}>
              <div  class="btn-group btn-group-justified">
                <div class="btn-group">
                  <button style={style.buttonPadding} type="button" class="btn btn-primary" onClick={this.onUpdate.bind(this, '5')}>$5</button>
                </div>
                <div class="btn-group">
                  <button style={style.buttonPadding} type="button" class="btn btn-primary" onClick={this.onUpdate.bind(this, '10')}>$10</button>
                </div>
                <div class="btn-group">
                  <button style={style.buttonPadding} type="button" class="btn btn-primary" onClick={this.onUpdate.bind(this, '25')}>$25</button>
                </div>
              </div><br />
              <div class="btn-group btn-group-justified">
                <div class="btn-group">
                  <button style={style.buttonPadding} type="button" class="btn btn-primary" onClick={this.onUpdate.bind(this, '50')}>$50</button>
                </div>
                <div class="btn-group">
                  <button style={style.buttonPadding} type="button" class="btn btn-primary" onClick={this.onUpdate.bind(this, '100')}>$100</button>
                </div>
                <div class="btn-group">
                  <button style={style.buttonPadding} type="button" class="btn btn-primary" onClick={this.onUpdate.bind(this, '200')}>$200</button>
                </div>
              </div><br />

              <div style={style.lastButton} class="btn-group">
                <button style={style.buttonPadding} type="button" class="btn btn-primary btn-block" onClick={this.onUpdate.bind(this, '250')}>$250</button>
              </div>
              <div class="btn-group">
                <input
                  style={style.otherAmountInput}
                  type='text'
                  className="form-control"
                  onChange={this.onUpdate.bind(this, 'enterAmount')}
                  value={displayAmt}
                  placeholder="other amount"
                />
              </div>
            </div>
            <div style={style.submissionLine}>
              <button type="button" class="btn btn-danger" style={style.continueButton} onClick={this.setDonationAmount.bind(this)}>Continue&nbsp;&nbsp;<span class="glyphicon glyphicon-arrow-right" aria-hidden="true">&nbsp;</span></button>

              <strong style={style.donationAmountIndicator}>${donationAmount}</strong>
            </div>
          </div>

        </div>
        <div style={style.pacSelectBox}>
          <strong>Select Organization&nbsp;<span data-tip="Select the PAC where<br/>we'll route your contribution." class="glyphicon glyphicon-info-sign" aria-hidden="true"></span></strong><br/>
            <form role="form">
              {selectPacButtons}
            </form>
        </div>
      </div>
    )
  }
};
