import React from 'react';
import Navbar from '../nav/Navbar';
import NavItem from '../nav/NavItem';
import NavbarHeader from '../nav/NavbarHeader';
import NavbarItems from '../nav/NavbarItems';
import NavbarDropdown from '../nav/NavbarDropdown';
import DropdownMenu from '../nav/DropdownMenu';
import { collections } from 'lodash';

export default class TallyNav extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const loggedIn = this.props.loggedIn;
    const isAdmin  = this.props.isAdmin;

    const loggedOutNavItems = [
      {link: 'signup', title: 'SIGNUP'},
      {link: 'signin', title: 'LOGIN'}
    ];

    var navitems = [
      {link: 'events', title: 'Events'},
      {link: 'about', title: 'About'},
      {link: 'faq', title: 'FAQ'}
    ];

    var adminItem = {link: 'admin', title: 'Admin'};

    const dropdownItems = [
      {href: 'contributions', name: 'Contributions'},
      {href: 'settings', name: 'Settings'},
      {href: 'donor-info', name: 'Donor Info'},
      {href: 'signout', name: 'Logout'}
    ];

    var dropdown = <span></span>;
    if (isAdmin) {
      navitems.push(adminItem);
    }
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