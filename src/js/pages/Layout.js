import React from "react";
import Radium from 'radium'
import { StyleRoot } from 'radium';
import { Link } from "react-router";
import LoginActions from '../actions/LoginActions';

import Footer from "../components/layout/Footer";
import TallyNav from "../components/layout/TallyNav";
import AuthService from '../services/AuthService';


@Radium
export default class Layout extends React.Component {
  displayName = 'Page Layout'

  static propTypes = {
    containerStyle:  React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      loggedIn : false,
      currentUserEmail: ''
    }
  }

  getStyles = () => {
    return {
      container: {
        marginTop: '30px'
      }
    }
  }

  componentWillMount() {
    var loggedIn = LoginActions.signedIn()
    var currentUserEmail =  LoginActions.currentUser()
    if(loggedIn){
      this.setState({
        loggedIn : true,
        currentUserEmail: currentUserEmail
      });
    } else {
      this.setState({
        loggedIn : false,
        currentUserEmail: ''
      });
    }
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
