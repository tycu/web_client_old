
import React from 'react';
import { collections } from 'lodash';
var moment = require('moment');

export default class AdminContribution extends React.Component {

  // static propTypes = {
  //   id: React.PropTypes.number,
  //   politicianId: React.PropTypes.number,
  //   eventId: React.PropTypes.number,
  //   pacId: React.PropTypes.number,
  //   amount: React.PropTypes.number,
  //   createdAt: React.PropTypes.string
  // }

  static propTypes = {
    day: React.PropTypes.string,
    contrib_per_day: React.PropTypes.string,
    daily_sum: React.PropTypes.string
  }

  render() {
    const { day, contrib_per_day, daily_sum } = this.props;

    return (
      <tr>
        <td>{moment.utc(day).format('dddd, MMMM Do YYYY')}</td>
        <td>{contrib_per_day}</td>
        <td>$ {daily_sum}</td>
      </tr>
    );
  }
}
