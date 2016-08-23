import React from "react";
import { Link } from "react-router";
import * as PoliticianActions from "../../actions/PoliticianActions";
import PoliticianStore from "../../stores/PoliticianStore";
import AdminPolitician from './politicians/AdminPolitician';
import Messages from '../../components/layout/Messages';
import { collections } from 'lodash';

export default class ManagePoliticians extends React.Component {
  constructor() {
    super();
    this.getPoliticians = this.getPoliticians.bind(this);

    this.state = {
      politicians: PoliticianStore.getPoliticians(),
      key: 1
    };
  }

  static propTypes = {
    politicians: React.PropTypes.array
  }

  componentWillMount() {
    PoliticianStore.once("change", () => {
      this.setState({
        politicians: PoliticianStore.getPoliticians()
      })
    });
  }

  componentWillUnmount() {
    PoliticianStore.removeListener("change", this.getPoliticians);
  }

  componentDidMount() {
    this.getPoliticians();
  }

  getPoliticians() {
    PoliticianActions.fetchPoliticians();
  }


  render() {
    const style = {
      container: {
        padding: '20px',
        background: 'white',
        width: '490px',
        borderRadius: '2px'
      }
    }

    const { politicians} = this.state;
    const PoliticianComponents = politicians.map((politician) => {
      return <AdminPolitician key={politician.id} {...politician}/>;
    });

    return (
      <div style={style.container} className="jumbotron center-block">
        <Link to='/admin'>Back to Admin</Link>
        <h2>Manage Politicians</h2>
        <Link to='/new_politician'>New Politician</Link>
        <ul ref="ul">{PoliticianComponents}</ul>
      </div>
    );
  }
}

