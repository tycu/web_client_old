import React from "react";
import { Link } from "react-router";
import * as AdminContributionActions from "../../../actions/AdminContributionActions";
import Messages from '../../layout/Messages';
import AdminContribution from './contributions/AdminContribution';
import AdminContributionStore from '../../../stores/AdminContributionStore';

import { collections } from 'lodash';

export default class ContributionReport extends React.Component {
  constructor() {
    super();
    this.getContributions = this.getContributions.bind(this);

    this.state = {
      contributions: AdminContributionStore.getAdminContributions(),
      key: 1
    };
  }

  static propTypes = {
    contributions: React.PropTypes.array
  }

  componentDidMount() {
    AdminContributionActions.fetchAdminContributions(0);
    AdminContributionStore.addChangeListener(this.getContributions);
  }

  componentWillUnmount() {
    AdminContributionStore.removeChangeListener(this.getContributions);
  }

  getContributions() {
    this.setState({
      contributions:   AdminContributionStore.getAdminContributions(),
      message:  AdminContributionStore.getMessage(),
      error:    AdminContributionStore.getError()
    });
  }


  render() {
    const style = {
      container: {
        padding: '30px',
        background: 'white',
        width: '800px',
        minHeight: '600px',
        borderRadius: '2px'
      }
    };

    const contributions = this.state.contributions && this.state.contributions[0] || [];

    const ContributionReports = contributions.map((contribution) => {
      return <AdminContribution key={contribution.id} {...contribution}
      />;
    });


    return (
      <div style={style.container} className="jumbotron center-block">
        <Link to='/admin'>Back to Admin</Link>
        <h2>Last 30 Days of Contributions</h2>
        <Messages {...this.state} />

        <table ref="table" class="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Contribution Count</th>
              <th>Sum</th>
            </tr>
          </thead>
          <tbody>
            {ContributionReports}
          </tbody>
        </table>
      </div>
    );
  }
}

