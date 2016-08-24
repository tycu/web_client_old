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

  componentDidMount() {
    PacActions.fetchPacs();
    PacStore.addChangeListener(this.getPacs);
  }

  componentWillUnmount() {
    PacStore.removeChangeListener(this.getPacs);
  }


  getPacs() {
    this.setState({
      pacs: PacStore.getPacs()
    })
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
        <Link to='/admin'>Back to Admin</Link>
        <h2>Manage Pacs</h2>
        <Link to='/new_pac'>New Pac</Link>
        <ul ref="ul">{PacComponents}</ul>
      </div>
    );
  }
}

