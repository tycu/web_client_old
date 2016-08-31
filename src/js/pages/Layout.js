import React from "react";
import { StyleRoot } from 'radium';
import { Link } from "react-router";
import AuthStore from '../stores/AuthStore';
import Footer from "../components/layout/Footer";
import TallyNav from "../components/layout/TallyNav";
import * as EventActions from '../actions/EventActions';
import EventStore from '../stores/EventStore';
import BreakingNews from '../components/layout/BreakingNews';

export default class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.getAuthState = this.getAuthState.bind(this);
    this.getBreakingEvent = this.getBreakingEvent.bind(this);

    this.state = {
      breakingEvent: EventStore.getEvent(),
      loggedIn: AuthStore.signedIn(),
      isAdmin:  AuthStore.isAdmin(),
      email:    AuthStore.currentUser(),
      key: 1
    };
  }

  static propTypes = {
    containerStyle:  React.PropTypes.object
  }

  componentDidMount() {
    AuthStore.addChangeListener(this.getAuthState);
    EventActions.fetchBreakingEvent();
    EventStore.addChangeListener(this.getBreakingEvent);
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
      breakingEvent: EventStore.getEvent(),
      breakingId: EventStore.getBreakingId()
    })
  }

  render() {
    const { location } = this.props;
    const style = {
      container: {
        marginTop: '30px'
      }
    }
    const { containerStyle } = this.props;
    const breakingEventInfo = this.state.breakingEvent;

    return (
      <StyleRoot>
      <TallyNav {...this.state} />
        <BreakingNews breakingEvent={breakingEventInfo} />
        <div class="container" ref="container" style={style.container}>
          <div class="row">
            <div class="col-lg-12">
              {this.props.children}
            </div>
          </div>
          <Footer />
        </div>
      </StyleRoot>
    );
  }
}
