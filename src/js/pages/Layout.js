import React from "react";
import Radium from 'radium'
import { StyleRoot } from 'radium';
import { Link } from "react-router";
import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';
import Footer from "../components/layout/Footer";
import TallyNav from "../components/layout/TallyNav";


@Radium
export default class Layout extends React.Component {
  displayName = 'Page Layout'

  static propTypes = {
    containerStyle:  React.PropTypes.object
  }

  constructor(props) {
    super(props)
  }

  getStyles = () => {
    return {
      container: {
        marginTop: '30px'
      }
    }
  }
  // shouldComponentUpdate(nextProps, nextState) {
    // must return true or false
    // return true;
  // }

  componentWillMount() {
    var loggedIn = AuthStore.signedIn();
    var email =  AuthStore.currentUser();

    if(loggedIn){
      this.setState({
        loggedIn : true,
        email: email
      });
    } else {
      this.setState({
        loggedIn : false,
        email: ''
      });
    }
    AuthStore.on("change", () => {
      this.setState({
        loggedIn: AuthStore.signedIn(),
        email:    AuthStore.currentUser()
      });
    });
  }

  componentWillUnmount() {
    AuthStore.removeListener("change", this.getAuthState);
  }

  getAuthState() {
    this.setState({
      loggedIn: AuthStore.signedIn(),
      email:    AuthStore.currentUser()
    });
  }

  render() {
    const { location } = this.props;
    const defStyle = this.getStyles();
    const { containerStyle } = this.props;

    return (
      <StyleRoot>
      <TallyNav {...this.state} />
        <div class="container" ref="container" style={[defStyle.container, containerStyle && containerStyle]}>
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
