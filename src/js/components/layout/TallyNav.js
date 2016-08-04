import React from 'react';
import Navbar from '../nav/Navbar';
import NavItem from '../nav/NavItem';
import NavbarHeader from '../nav/NavbarHeader';
import NavbarItems from '../nav/NavbarItems';
import NavbarDropdown from '../nav/NavbarDropdown';
import DropdownMenu from '../nav/DropdownMenu';
import { collections } from 'lodash';
// import { IndexLink, Link } from "react-router";
// import Logout from '../Logout';

export default class TallyNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: this.props.loggedIn,
      currentUserEmail: this.props.currentUserEmail
    }
  }

  render() {
    const loggedIn = this.props.loggedIn;

    const loggedOutNavItems = [
      {link: 'signup', title: 'SIGNUP'},
      {link: 'signin', title: 'LOGIN'}
    ];

    var navitems = [
      {link: 'about', title: 'About'},
      {link: 'faq', title: 'FAQ'}
    ];

    const dropdownItems = [
      {href: 'settings', name: 'Settings'},
      {href: 'donor-info', name: 'Donor Info'},
      {href: 'signout', name: 'Logout'}
    ];

    // debugger;


    //
    var dropdown = <span></span>;
    if (!loggedIn) {
      _(loggedOutNavItems).forEach(function(LogOutNavItem) {
        navitems.push(LogOutNavItem);
      });
    } else {
      dropdown = <NavbarDropdown name={this.props.currentUserEmail}>
        <DropdownMenu menuItems={dropdownItems}/>
      </NavbarDropdown>
    }

    return (
      <Navbar>
        <NavbarHeader href="/" name="Tally.us"/>
          <NavbarItems>
            {navitems.map(item => {
              return <NavItem key={navitems.indexOf(item)} link={item.link} title={item.title} />;
            })}
          {dropdown}
        </NavbarItems>
      </Navbar>
    )
  }
}