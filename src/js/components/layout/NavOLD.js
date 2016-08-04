//        <TallyNav location={location} loggedIn={this.state.loggedIn} currentUserEmail={this.state.currentUserEmail} />


import React from "react";
import { IndexLink, Link } from "react-router";
import Logout from '../Logout';
import AuthService from '../../services/AuthService';

export default class TallyNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: true,
      loggedIn: this.props.loggedIn,
      currentUserEmail: this.props.currentUserEmail,
      userActions: '',
      selected: ''
    };
  }

  componentWillMount() {
    this.checkAuthState();
    console.log('Navbar componentDidMount ', this.props.loggedIn);

    this.setState({
      collapsed: true,
    });
  }

  componentWillReceiveProps(){
    console.log('Navbar componentWillReceiveProps ', this.props.loggedIn);
    this.setState({
      loggedIn : this.props.loggedIn
    });
    this.checkAuthState();
  }

  componentDidUpdate(nextProps, nextState) {
    console.log('Your prev auth state: ' + this.state.loggedIn);
    console.log('Your next auth state: ' + nextState.loggedIn);

    // debugger;

    this.state.loggedIn == nextState.loggedIn
  }

  isActive(value){
    return ((value === this.state.selected) ? 'active' : '');
  }

  signout(e) {
    e.preventDefault();
    var token = LoginActions.getAuthToken()

    AuthService.signout(token, Constants.SIGNOUT_URL)
      .catch(function(response) {
        if (response.status !== 200) {
          alert("There is an error signing out.");
          console.log("Error signing out.", response);
        }
    });
  }

  checkAuthState(){
    console.log('Nav Mounted with auth : ', this.state.loggedIn);
    if (this.state.loggedIn == undefined) {
      this.setState({
        userActions: ''
      });
    }
    if (!this.state.loggedIn) {
        var userActions = <NavItem eventKey={1}>
          <Link to="login" onClick={this.handleClick.bind(this, 'login')}>Sign In</Link>
        </NavItem>

        this.setState({
          userActions: userActions,
          loggedIn: false
        });
    }

    if (this.state.loggedIn) {
      this.state.userActions = <NavDropdown eventKey={3} title={this.props.currentUserEmail} id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>
            <li class={this.isActive('settings')}>
              <Link to="settings" onClick={this.handleClick.bind(this, 'settings')}>Settings</Link>
            </li>
          </MenuItem>
          <MenuItem eventKey={3.2}>
            <li class={this.isActive('donor-info')}>
              <Link to="donor-info" onClick={this.handleClick.bind(this, 'donor')}>Donor Info</Link>
            </li>
          </MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>
            <li class={this.isActive('logout')}>
              <Link to="logout" onClick={this.handleClick.bind(this, 'logout')}>Log out</Link>
            </li>
          </MenuItem>
        </NavDropdown>

      this.setState({
        userActions : this.state.userActions,
        loggedIn: true
      });
    }
  }



  handleClick(selectClass) {
    const collapsed = !this.state.collapsed;
    var selected = selectClass;

    // NOTE need to get these broken up
    // so they can live in the right places
    if (selectClass === 'logout') {
      this.signout()
    }

    this.setState({
      collapsed: collapsed,
      selected: selected
    });
    this.checkAuthState();
  }

  render() {
    const { location }  = this.props;
    const { collapsed } = this.state;
    const { selected }  = this.state;

    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Tally.us</a>
          </Navbar.Brand>
          <Navbar.Toggle type="button" class={"navbar-toggle " + this.state.collapsed} onClick={this.handleClick.bind(this)} />
        </Navbar.Header>
        <Navbar.Collapse class={"navbar-collapse " + this.state.collapsed} id="bs-example-navbar-collapse-1">
          <Nav pullRight>
            <NavItem class={this.isActive('/')} eventKey={1}>
              <IndexLink to="/" onClick={this.handleClick.bind(this, '/')}>Events</IndexLink>
            </NavItem>
            <NavItem class={this.isActive('about')} eventKey={2}>
              <Link to="about" onClick={this.handleClick.bind(this, 'about')}>About</Link>
            </NavItem>

            {this.state.userActions}

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
