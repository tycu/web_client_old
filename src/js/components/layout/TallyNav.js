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
  }

  render() {
    const loggedIn = this.props.loggedIn;

    const loggedOutNavItems = [
      {link: 'signup', title: 'SIGNUP'},
      {link: 'signin', title: 'LOGIN'}
    ];

    var navitems = [
      {link: 'events', title: 'Events'},
      {link: 'about', title: 'About'},
      {link: 'faq', title: 'FAQ'}
    ];

    const dropdownItems = [
      {href: 'contributions', name: 'Contributions'},
      {href: 'settings', name: 'Settings'},
      {href: 'donor-info', name: 'Donor Info'},
      {href: 'signout', name: 'Logout'}
    ];

    var dropdown = <span></span>;
    if (!loggedIn) {
      _(loggedOutNavItems).forEach(function(LogOutNavItem) {
        navitems.push(LogOutNavItem);
      });
    } else {
      const maxDisplayEmailLength = 25;
      dropdown = <NavbarDropdown name={this.props.email.substring(0, maxDisplayEmailLength)}>
        <DropdownMenu menuItems={dropdownItems}/>
      </NavbarDropdown>
    }

    return (
      <Navbar {...this.props}>
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