import React from "react";
import ChangePassword from '../components/auth/ChangePassword';
import { Link } from "react-router";
import SetCard from '../components/contributions/SetCard';

export default class Settings extends React.Component {


  // check if has card from user object
  // if no prompt to create
  // if yes show card, have ability to delete or remove?
    // don't support multiple cards off the bat

  // if have card show type of card, and last 4


  render() {
    // const =
    // debugger;

    return (
      <div className="signin jumbotron center-block">
        <h2>Contributions</h2>

        <SetCard />


      </div>
    );
  }
}
