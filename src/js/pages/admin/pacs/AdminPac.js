import React from 'react';
import { Link } from "react-router";
import { collections } from 'lodash';

export default class AdminPac extends React.Component {
  displayName = 'Event'

  static propTypes = {
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    color: React.PropTypes.string,
    twitterUsername: React.PropTypes.string
  }

  state = {
    id: '',
    name: '',
    description: '',
    color: '',
    twitterUsername: '',
    key: 1
  }

  render() {
    const { id, name, description, color, twitterUsername } = this.props;

    const linkTo = "edit_pacs/" + id;

    return (
      <li>
        <span>{id}. {name} <Link to={linkTo}>Edit</Link></span>
      </li>
    );
  }
}
