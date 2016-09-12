import React from 'react';
import { Link, browserHistory } from "react-router";
import PacEventStore from "../../stores/PacEventStore";
import * as PacEventActions from "../../actions/PacEventActions";
import Messages from '../layout/Messages';

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
      key: 1
    };
  }

  static propTypes = {
    donationAmount: React.PropTypes.string,
    selectedPacId: React.PropTypes.number,
    selectedPacName: React.PropTypes.string,
    pacEvents:     React.PropTypes.array,
    event: React.PropTypes.shape({
      eventId:     React.PropTypes.number,
      isPinned:    React.PropTypes.bool,
      imageUrl:    React.PropTypes.string,
      imageAttribution: React.PropTypes.string,
      politicianId: React.PropTypes.number,
      headline:    React.PropTypes.string,
      summary:     React.PropTypes.string
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
    this.setState({
      amountFocus: true
    })
    const eventId = this.props.eventId;
    PacEventActions.fetchPacEvents(eventId, this.props.support);
    PacEventStore.addChangeListener(this.getPacEvents);

    var blankEvent = new Event('blank');
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
    const pacEvents = PacEventStore.getPacEvents();
    const defaultPacId = pacEvents[0].Pac.id;
    const defaultPacName = pacEvents[0].Pac.name;

    this.setState({
      pacEvents: PacEventStore.getPacEvents(),
      supportPacs: PacEventStore.getSupportPacEvents(),
      opposePacs:  PacEventStore.getOpposePacEvents(),
      selectedPacId: defaultPacId,
      selectedPacName: defaultPacName
    })
  }

  selectTargetPac(pacOpts, e) {
    this.setState(pacOpts);
  }

  onUpdate(amount, e) {
    e.preventDefault();
    var that = this,
        val;

    if (amount === 'enterAmount') {
      val = parseInt(e.target.value.replace(/\D/g,''), 10).toFixed(2);
    } else {
      val = parseInt(amount.replace(/\D/g,''), 10).toFixed(2);
    }

    if (isNaN(val) > 2700) {
      that.setState({error: "Invalid amount, you can donate between $5 and $2700"});
      return false;
    }
    this.setState({
      donationAmount: val
    });
  }

  setDonationAmount(e) {
    e.preventDefault();
    var that = this,
        val;

    const donationAmount = this.state.donationAmount;

    if (isNaN(donationAmount) || donationAmount < 5 || donationAmount > 2700) {
      that.setState({error: "Invalid amount, you can donate between $5 and $2700"});
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
        float: 'left',
        width: '330px',
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
        },
        padding: '30px'
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


    const donationAmount = this.state.donationAmount || "0.00";
    const pacEvents = this.state.pacEvents;

    if (pacEvents.length > 0) {
      const selectedPacId = this.state.selectedPacId || this.state.pacEvents[0].pacId;

      var selectPacButtons = pacEvents.map(function(pacEventWithPac, i) {
        return (
          <div class="radio" key={i + Math.random()}>
            <input class='btn btn-default' type="radio" name={pacEventWithPac.Pac.name}
                   value={pacEventWithPac.id} // pacEvent.id
                   checked={pacEventWithPac.pacId === selectedPacId}
                   onChange={this.selectTargetPac.bind(this, {selectedPacId: pacEventWithPac.pacId, selectedPacName: pacEventWithPac.Pac.name})} />
             <span>{pacEventWithPac.Pac.name}</span>
          </div>
        );
      }, this);
    }


    return (
      <div>
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
                  value={this.props.oldPassword}
                  placeholder="other amount"
                  // onBlur={this.handleBlur.bind(this)}
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
          <strong>Select Organization</strong><br/>
            <form role="form">
              {selectPacButtons}
            </form>
        </div>
      </div>
    )
  }
};
