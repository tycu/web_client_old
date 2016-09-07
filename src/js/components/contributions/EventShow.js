import React from 'react';
import Radium from 'radium';
import { Link, browserHistory } from "react-router";
import EventStore from "../../stores/EventStore";
// import PacStore from "../../stores/PacStore";
import PacEventStore from "../../stores/PacEventStore";
import { m } from "../../utils/StyleUtil";
import Messages from '../layout/Messages';
import * as PacEventActions from "../../actions/PacEventActions";
// import * as EventActions from "../../actions/EventActions";

// import * as CardActions from '../../actions/CardActions';
// import * as Constants from '../../constants/CardConstants';
// import CardStore from '../../stores/CardStore';
@Radium
export default class  extends React.Component {
  constructor() {
    super();
    // this.getEvent = this.getEvent.bind(this);
    // this.getPacs = this.getPacs.bind(this);
    this.getPacEvents = this.getPacEvents.bind(this);


    this.state = {
      donationAmount: '0.00',
      // support: false,
      event: EventStore.getEvent(),
      // availablePacs: PacStore.getPacs(),
      // supportPacs: [],
      // opposePacs: [],
      // uploadStatus: '',
      pacEvents: PacEventStore.getPacEvents(),
      key: 1
    };
  }

  static propTypes = {
    donationAmount: React.PropTypes.string,
    support: React.PropTypes.bool,
    event: React.PropTypes.shape({
      eventId:     React.PropTypes.number,
      isPinned:    React.PropTypes.bool,
      imageUrl:    React.PropTypes.string,
      imageAttribution: React.PropTypes.string,
      politicianId: React.PropTypes.number,
      headline:    React.PropTypes.string,
      summary:     React.PropTypes.string
    }),
    // availablePacs: React.PropTypes.array,
    // supportPacs:   React.PropTypes.array,
    // opposePacs:    React.PropTypes.array,
    pacEvents:     React.PropTypes.array
  }

  componentDidMount() {
    var support = this.props.location.query.support === 'true';

    this.setState({
      support: support
    })

    const eventId = this.props.params.eventId;
    // const support = this.state.support;
    // EventActions.fetchEvent(eventId);
    // EventStore.addChangeListener(this.getEvent);

    // PacActions.fetchPacs();
    // PacStore.addChangeListener(this.getPacs);
    // ImageStore.addChangeListener(this.setImage);


    PacEventActions.fetchPacEvents(eventId, support);
    PacEventStore.addChangeListener(this.getPacEvents);
  }

  componentWillUnmount() {
    // EventStore.removeChangeListener(this.getEvent);
    // PacStore.removeChangeListener(this.getPacs);
    // ImageStore.removeChangeListener(this.setImage);
    // PacEventStore.removeChangeListener(this.getPacEvents);
  }

  // getEvent() {
  //   this.setState({
  //     event: EventStore.getEvent()
  //   })
  // }

  // getPacs() {
  //   this.setState({
  //     availablePacs: PacStore.getPacs()
  //   })
  // }

  getPacEvents() {
    const pacEvents = PacEventStore.getPacEvents();

    this.setState({
      pacEvents: PacEventStore.getPacEvents(),
      supportPacs: PacEventStore.getSupportPacEvents(),
      opposePacs:  PacEventStore.getOpposePacEvents()
    })
  }

  selectTargetPac(pacId, e) {

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

  // handleBlur(){
  //   if (this.props.pwError) {
  //     this.props.onUpdate('pwError', false);
  //   }
  // }

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
      const eventId = that.props.params.eventId;

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


      // browserHistory.replace('/manage_events');
    }
  }


  render() {
    const style = {
      container: {
        padding: '20px',
        background: 'white',
        borderRadius: '2px',
        marginBottom: '20px',
        maxWidth: '750px',
        minWidth: '480px',
      },
      topWrapper: {
        maxWidth: '750px',
        minWidth: '480px',
        margin: '0 auto'
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
        '@media (min-width: 768px)': {
          marginTop: '20px',
          minHeight: '100px',
          marginBottom: '20px',
        },
        '@media (min-width: 990px)': {
          minHeight: '287px',
          marginTop: '108px',
          marginBottom: '30px',
        },
        '@media (min-width: 1200px)': {
          minHeight: '287px',
          marginTop: '108px',
          marginBottom: '30px'
        },
        padding: '30px'
      },
      donationWarning: {
        display: 'inline-block',
        clear: 'both',
        width: '100%',
        padding: '30px',
        border: '1px solid #999',
        margin: '0px auto'
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
    // const { last4 } = this.state;
    // const { brand } = this.state;
    // const { cardText } = this.state;

    // NOTE stripe suggests deleting entire customer
    // perhaps add to settings
    // https://support.stripe.com/questions/can-i-delete-a-customer-s-card-from-my-stripe-account

    //   <button style={style.button} type="submit" className="btn btn-primary" onClick={this.deleteCard.bind(this)}>Delete</button>


    const supportText = this.props.location.query.support === 'true' ? 'Support' : 'Oppose';
    const support = this.state.event.headline;
    const donationAmount = this.state.donationAmount || "0.00";
    const pacEvents = this.state.pacEvents;


    var selectPacButtons = pacEvents.map(function(pacEventWithPac, i) {
      return (
        <div class="radio">
          <input class='btn btn-default' type="radio" name={pacEventWithPac.Pac.name}
                 value={pacEventWithPac.id} // pacEvent.id
                 checked={i === 0}
                 onChange={this.selectTargetPac.bind(this, pacEventWithPac.pacId)} />
           <label>{pacEventWithPac.Pac.name}</label>
        </div>
      );
    }, this);


    return (
      <div style={style.container}>
        <div style={style.topWrapper}>
          <div style={style.donationAmountBox}>
            <h4>{supportText}: {support}</h4>
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


        <div style={style.donationWarning}>
          <p>By clicking "Donate," I certify that:</p>
          <ol>
            <li>I am a U.S. citizen or lawfully admitted permanent resident of the U.S.</li>
            <li>I am making this contribution on a personal card with my own personal funds, not those of another person or entity.</li>
            <li>I am not a federal contractor.</li>
            <li>I am at least 18 years old.</li>
          </ol>
          <p>Contributions or gifts made to political action committees (PACs) through Tally US are not tax deductible.</p>
          <p>An individual may contribute up to $2,700 per election (the primary and general are separate elections). By submitting your contribution, you agree that your contribution will be designated for the 2016 general election.</p>
          <p>Federal law requires us to use our best efforts to collect and report the name, mailing address, occupation and name of employer of individuals whose contributions exceed $200 in an election cycle.</p>
        </div>
      </div>
    )
  }
};
