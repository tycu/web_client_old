import React from "react";
import ChangePassword from '../components/auth/ChangePassword';
import { Link } from "react-router";
import SetCard from '../components/contributions/SetCard';
import MainCard from '../components/contributions/MainCard';

export default class Contributions extends React.Component {

  // check if has card from user object
  // if no prompt to create
  // if yes show card, have ability to delete or remove?
    // don't support multiple cards off the bat

  // if have card show type of card, and last 4


  render() {

    return (
      <div className="jumbotron center-block">
        <h2>Contributions</h2>
        <MainCard />
        <Link to="/edit-card">Add or Edit Card</Link>
      </div>
    );
  }
}
