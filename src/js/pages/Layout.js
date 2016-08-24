import React from "react";
import { StyleRoot } from 'radium';
import { Link } from "react-router";
import AuthStore from '../stores/AuthStore';
import Footer from "../components/layout/Footer";
import TallyNav from "../components/layout/TallyNav";

export default class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.getAuthState = this.getAuthState.bind(this);

    this.state = {
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
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.getAuthState);
  }

  getAuthState() {
    this.setState({
      loggedIn: AuthStore.signedIn(),
      isAdmin:  AuthStore.isAdmin(),
      email:    AuthStore.currentUser()
    });
  }

  render() {
    const { location } = this.props;
    const style = {
      container: {
        marginTop: '30px'
      }
    }
    const { containerStyle } = this.props;

    return (
      <StyleRoot>
      <TallyNav {...this.state} />
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
