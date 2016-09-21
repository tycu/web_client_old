import React from "react";
import { Link } from "react-router";
import AuthStore from '../../stores/AuthStore';
import Footer from "../layout/Footer";
import TallyNav from "../layout/TallyNav";
import * as EventActions from '../../actions/EventActions';
import * as AuthActions from '../../actions/AuthActions';
import BreakingNews from '../layout/BreakingNews';
import EventStore from '../../stores/EventStore';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.getAuthState = this.getAuthState.bind(this);
    this.getBreakingEvent = this.getBreakingEvent.bind(this);

    this.state = {
      breakingEvent: EventStore.getBreakingEvent(),
      loggedIn: AuthStore.signedIn(),
      isAdmin:  AuthStore.isAdmin(),
      email:    AuthStore.currentUser(),
      key: 1
    };
  }

  static propTypes = {
    breakingEvent: React.PropTypes.object,
    loggedIn: React.PropTypes.bool,
    isAdmin: React.PropTypes.bool,
    email: React.PropTypes.string
  }

  componentDidMount() {
    AuthStore.addChangeListener(this.getAuthState);
    EventActions.fetchBreakingEvent();
    EventStore.addChangeListener(this.getBreakingEvent);
    AuthActions.startJwtPoll();
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.getAuthState);
    EventStore.removeChangeListener(this.getBreakingEvent);
  }

  getAuthState() {
    this.setState({
      loggedIn: AuthStore.signedIn(),
      isAdmin:  AuthStore.isAdmin(),
      email:    AuthStore.currentUser()
    });
  }

  getBreakingEvent() {
    this.setState({
      breakingEvent: EventStore.getBreakingEvent(),
      breakingId: EventStore.getBreakingId()
    });
  }

  render() {
    const { location } = this.props;
    const style = {
      container: {
        marginTop: '30px'
      }
    };
    const breakingEventInfo = this.state.breakingEvent;

    return (
      <div>
      <TallyNav {...this.state} />
        <BreakingNews breakingEvent={breakingEventInfo} />
        <div className="container" ref="container" style={style.container}>
          <div className="row">
            <div className="col-lg-12">
              {this.props.children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
