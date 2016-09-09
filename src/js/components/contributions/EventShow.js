import React from 'react';
import Radium from 'radium';
import { Link, browserHistory } from "react-router";
import DonationAmount from './DonationAmount';
import PaymentInfo from './PaymentInfo';
import EventStore from "../../stores/EventStore";

// import Messages from '../layout/Messages';
// import * as CardActions from '../../actions/CardActions';
// import * as Constants from '../../constants/CardConstants';
// import CardStore from '../../stores/CardStore';

@Radium
export default class  extends React.Component {
  constructor() {
    super();

    this.state = {
      support: false,
      event: EventStore.getEvent(),
      amountFocus: true,
      paymentFocus: false,
      key: 1
    };
  }

  static propTypes = {
    donationAmount: React.PropTypes.string,
    support: React.PropTypes.bool,
    selectedPac: React.PropTypes.number,
    event: React.PropTypes.shape({
      eventId:     React.PropTypes.number,
      isPinned:    React.PropTypes.bool,
      imageUrl:    React.PropTypes.string,
      imageAttribution: React.PropTypes.string,
      politicianId: React.PropTypes.number,
      headline:    React.PropTypes.string,
      summary:     React.PropTypes.string
    }),
    pacEvents:     React.PropTypes.array
  }

  componentDidMount() {
    var support = this.props.location.query.support === 'true';

    this.setState({
      support: support,
      amountFocus: true
    })
  }

  componentWillUnmount() {
  }

  getEvent() {
    this.setState({
      event: EventStore.getEvent()
    })
  }

  handleUserInput(contributionStep) {
    this.setState(contributionStep);
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
      donationWarning: {
        display: 'inline-block',
        clear: 'both',
        width: '100%',
        padding: '30px',
        border: '1px solid #999',
        margin: '0px auto'
      }
    }

    const supportText = this.props.location.query.support === 'true' ? 'Support' : 'Oppose';
    const support = this.state.event.headline;
    const eventId = this.props.params.eventId;


    return (
      <div style={style.container}>
        <div style={style.topWrapper}>
          <h4>{supportText}: {support}</h4>
          {( (this.state.amountFocus) ? (
            <DonationAmount {...this.state} eventId={eventId} onComplete={this.handleUserInput.bind(this)} />
          ) : (
            <PaymentInfo {...this.state} eventId={eventId} onComplete={this.handleUserInput.bind(this)} />
          ))}

        </div>

        <div style={style.donationWarning}>
          <p><strong>You are about to make a political contribution.</strong></p>
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
