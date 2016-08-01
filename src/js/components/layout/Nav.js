import React from "react";
import { IndexLink, Link } from "react-router";
import LoginActions from '../../actions/LoginActions';
import Logout from '../Logout';

export default class Nav extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      collapsed: true,
      loggedIn: LoginActions.loggedIn()
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({
      collapsed: collapsed,
      loggedIn: LoginActions.loggedIn()
    });
  }

  render() {
    const { location }  = this.props;
    const { collapsed } = this.state;
    const eventsClass = location.pathname === "/" ? "active" : "";
    const todoClass     = location.pathname.match(/^\/todo/) ? "active" : "";
    const aboutClass    = location.pathname.match(/^\/about/) ? "active" : "";
    const settingsClass = function() {
      if (this.state.loggedIn == false) {
        return ''
      } else if (location.pathname.match(/^\/settings/) && this.state.loggedIn == true) {
        return 'active'
      } else {
        ''
      }
    }
    const donorInfoClass = location.pathname.match(/^\/donor-info/) ? "active" : "";
    const loginClass    = (location.pathname.match(/^\/login/) || location.pathname.match(/^\/signup/)) ? "active" : "";
    const navClass      = collapsed ? "collapse" : "";

    return (
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>

          <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">

              <li class={eventsClass}>
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Events</IndexLink>
              </li>
              <li class={todoClass}>
                <Link to="todo" onClick={this.toggleCollapse.bind(this)}>Todos</Link>
              </li>
              <li class={aboutClass}>
                <Link to="about" onClick={this.toggleCollapse.bind(this)}>About</Link>
              </li>
              <li class={settingsClass}>
                <Link to="settings" onClick={this.toggleCollapse.bind(this)}>Settings</Link>
              </li>
                <li class={donorInfoClass}>
                <Link to="donor-info" onClick={this.toggleCollapse.bind(this)}>Donor Info</Link>
              </li>
              <li class={loginClass}>
                {this.state.loggedIn ? (
                  <Link to="/logout" onClick={this.toggleCollapse.bind(this)}>Log out</Link>
                ) : (
                  <Link to="/login" onClick={this.toggleCollapse.bind(this)}>Sign in</Link>
                )}
              </li>

            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
