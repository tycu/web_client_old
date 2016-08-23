import React from 'react';
import { Link } from "react-router";
import { collections } from 'lodash';

export default class AdminEvent extends React.Component {
  static propTypes = {
    id: React.PropTypes.number,
    isPinned: React.PropTypes.bool,
    imageUrl: React.PropTypes.string,
    imageAttribution: React.PropTypes.string,
    politicianId: React.PropTypes.number,
    headline: React.PropTypes.string,
    summary: React.PropTypes.string
  }

  state = {
    id: '',
    isPinned: '',
    imageUrl: '',
    imageAttribution: '',
    politicianId: '',
    headline: '',
    summary: '',
    key: 1
  }

  render() {
    const { id, isPinned, imageUrl, imageAttribution, politicianId, headline, summary } = this.props;

    const linkTo = "edit_events/" + id;

    return (
      <li>
        <span>{id}. {name} <Link to={linkTo}>Edit</Link></span>
      </li>
    );
  }
}
