import React from "react";
import { Link } from "react-router";
import * as PacActions from "../../actions/PacActions";
import PacStore from "../../stores/PacStore";
import AdminPac from './pacs/AdminPac';
import Messages from '../../components/layout/Messages';
import { collections } from 'lodash';

export default class ManagePacs extends React.Component {
  constructor() {
    super();
    this.getPacs = this.getPacs.bind(this);

    this.state = {
      pacs: PacStore.getPacs(),
      key: 1
    };
  }

  static propTypes = {
    pacs: React.PropTypes.array
  }

  componentWillMount() {
    PacStore.once("change", () => {
      this.setState({
        pacs: PacStore.getPacs()
      })
    });
  }

  componentWillUnmount() {
    PacStore.removeListener("change", this.getPacs);
  }

  componentDidMount() {
    this.getPacs();
  }

  getPacs() {
    PacActions.fetchPacs();
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

    const { pacs } = this.state;
    const PacComponents = pacs.map((pac) => {
      return <AdminPac key={pac.id} {...pac}/>;
    });

    return (
      <div style={style.container} className="jumbotron center-block">
        <h2>Manage Pacs</h2>
        <Link to='/new_pac'>New Pac</Link>
        <ul ref="ul">{PacComponents}</ul>
      </div>
    );
  }
}

