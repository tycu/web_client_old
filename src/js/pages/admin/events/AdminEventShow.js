import React from 'react';
import { Link, browserHistory } from "react-router";
import { collections } from 'lodash';
import EventStore from "../../../stores/EventStore";
import * as EventActions from "../../../actions/EventActions";
import * as PacEventActions from "../../../actions/PacEventActions";
import Messages from '../../../components/layout/Messages';
import PacsFieldStatic from './PacsFieldStatic';
import PacStore from "../../../stores/PacStore";
import PacEventStore from "../../../stores/PacEventStore";
import * as PacActions from "../../../actions/PacActions";
import * as FileUtils from "../../../utils/FileUtils";
import * as Validators from "../../../utils/ValidationUtils";
import * as AdminContributionActions from "../../../actions/AdminContributionActions";
import AdminContributionStore from '../../../stores/AdminContributionStore';


export default class EditEvent extends React.Component {
  constructor() {
    super();
    this.getEvent = this.getEvent.bind(this);
    this.getPacs = this.getPacs.bind(this);
    this.getPacEvents = this.getPacEvents.bind(this);
    this.getContributionSum = this.getContributionSum.bind(this);

    this.state = {
      event: EventStore.getEvent(),
      availablePacs: PacStore.getPacs(),
      supportPacs: [],
      opposePacs: [],
      pacEvents: PacEventStore.getPacEvents(),
      eventContributionSum: '0',
      key: 1
    };
  }

  static propTypes = {
    event: React.PropTypes.shape({
      eventId:     React.PropTypes.number,
      isPinned:    React.PropTypes.bool,
      imageUrl:    React.PropTypes.string,
      imageAttribution: React.PropTypes.string,
      politicianId: React.PropTypes.number,
      headline:    React.PropTypes.string,
      summary:     React.PropTypes.string
    }),
    availablePacs: React.PropTypes.array,
    supportPacs:   React.PropTypes.array,
    opposePacs:    React.PropTypes.array,
    pacEvents:     React.PropTypes.array,
    eventContributionSum: React.PropTypes.string
  }

  componentDidMount() {
    const eventId = this.props.params.eventId;
    EventActions.fetchAdminEvent(eventId);
    EventStore.addChangeListener(this.getEvent);

    PacActions.fetchPacs();
    PacStore.addChangeListener(this.getPacs);
    PacEventActions.fetchPacEvents(eventId);
    PacEventStore.addChangeListener(this.getPacEvents);
    AdminContributionActions.fetchEventContributionSum(eventId);
    AdminContributionStore.addChangeListener(this.getContributionSum);
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this.getEvent);
    PacStore.removeChangeListener(this.getPacs);
    PacEventStore.removeChangeListener(this.getPacEvents);
    AdminContributionStore.removeChangeListener(this.getContributionSum);
  }

  getEvent() {
    this.setState({
      event: EventStore.getEvent()
    })
  }

  getPacs() {
    this.setState({
      availablePacs: PacStore.getPacs()
    })
  }

  getPacEvents() {
    const pacEvents = PacEventStore.getPacEvents();

    this.setState({
      pacEvents: PacEventStore.getPacEvents(),
      supportPacs: PacEventStore.getSupportPacEvents(),
      opposePacs:  PacEventStore.getOpposePacEvents()
    })
  }

  getContributionSum() {
    this.setState({
      eventContributionSum: AdminContributionStore.getEventContributionSum(),
      message:       AdminContributionStore.getMessage(),
      error:         AdminContributionStore.getError()
    })
  }

  setPacId(support, pacIndex, pacId) {
    let pacs = this.state[support];

    pacs[pacIndex]['pacId'] = parseInt(pacId, 10);

    this.setState({
      [support]: pacs
    });
  }


  render() {
    const supportPacs = this.state.supportPacs || [];
    const opposePacs  = this.state.opposePacs  || [];
    const eventId = this.props.params.eventId;

    const supportIndex = supportPacs.length - 1;
    const opposeIndex = opposePacs.length - 1;

    const supportPacList = supportPacs.map((pac) => {
      return <PacsFieldStatic key={Math.random()} {...pac} setPacId={this.setPacId.bind(this, 'supportPacs', supportIndex)} availablePacs={this.state.availablePacs} pacEventId={pac.id} eventId={eventId} />
    });
    const opposePacList  = opposePacs.map((pac) => {
      return <PacsFieldStatic key={Math.random()} {...pac} setPacId={this.setPacId.bind(this, 'opposePacs', opposeIndex)} availablePacs={this.state.availablePacs} pacEventId={pac.id} eventId={eventId} />
    });
    const eventContributionSum = this.state.eventContributionSum || '0';

    const style = {
      container: {

      },
      img: {
        position: 'relative',
        width: '414px',
        height: '220px',
        progress: {
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          textAlign: 'center',
        }
      },
      imageUrl: {

      },
      imageAttribution: {

      },
      politicianId: {

      },
      headline: {

      },
      pacId: {

      },
      summary: {
        textArea: {
          height: '300px'
        }
      },
      file: {
        display: 'none'
      }
    }

    return (
      <div style={style.container}>
        <h2>Event Details - Total Contributions: ${eventContributionSum}</h2>
        <br/>
        <div>
          <b style={style.headline}>Headline: </b><span>{this.state.event.headline}</span>
        </div>

        <br/>
        <img id="image" class="pointer" height="100%" width="100%" src={this.state.event.imageUrl}/>
        <br/>

        <div>
          <b style={style.imageAttribution}>imageUrl: </b><span>{this.state.event.imageUrl || ''}</span>
        </div>

        <div>
          <b>imageAttribution:</b><span>{this.state.event.imageAttribution}</span>
        </div>

        <div>
          <b style={style.politicianId}>politicianId: </b><span>{this.state.event.politicianId}</span>
        </div>

        <div>
          <b style={style.pacId}>Support Pacs: </b><span>{supportPacList}</span>
        </div>

        <div>
          <b style={style.pacId}>Oppose Pacs: </b><span>{opposePacList}</span>
        </div>

        <div style={style.summary}>
          <b>Summary: </b>
          <div style={style.summary.textArea}>
            {this.state.event.summary}
          </div>
        </div>

        <Link to='/manage_events'>Back To Events</Link>
      </div>
    );
  }
}
