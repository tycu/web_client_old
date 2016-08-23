import React from 'react';
import { Link } from "react-router";
import { collections } from 'lodash';

export default class AdminPolitician extends React.Component {
  static propTypes = {
    id: React.PropTypes.number,
    thumbnail: React.PropTypes.string,
    firstName: React.PropTypes.string,
    lastName: React.PropTypes.string,
    jobTitle: React.PropTypes.string,
    twitterUsername: React.PropTypes.string
  }

  state = {
    id: '',
    thumbnail: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    twitterUsername: '',
    key: 1
  }

  render() {
    const { id, thumbnail, firstName, lastName, jobTitle, twitterUsername } = this.props;

    const linkTo = "edit_politicians/" + id;

    return (
      <li key={id}>
        <span>{lastName}, {firstName} <Link to={linkTo}>Edit</Link></span>
      </li>
    );
  }
}
