import React from "react";
import * as DonorInfoActions from "../../actions/DonorInfoActions";
import DonorInfoStore from "../../stores/DonorInfoStore";
import AuthStore from '../../stores/AuthStore';

export default class UserProfile extends React.Component {
  constructor() {
    super();
    this.getDonorInfo = this.getDonorInfo.bind(this);

    this.state = {
      donorInfo: DonorInfoStore.getDonorInfo()
    };
  }

  static propTypes = {
    donorInfo: React.PropTypes.shape({
      occupation: React.PropTypes.string,
      employer: React.PropTypes.string,
      name: React.PropTypes.string,
      streetAddress: React.PropTypes.string,
      city: React.PropTypes.string,
      residenceState: React.PropTypes.string,
      zip: React.PropTypes.string,
      picSquare: React.PropTypes.string
    })
  }

  componentDidMount() {
    var userId = AuthStore.currentUserId();
    DonorInfoActions.fetchDonorInfo(userId);
    DonorInfoStore.addChangeListener(this.getDonorInfo);
  }

  componentWillUnmount() {
    DonorInfoStore.removeChangeListener(this.getDonorInfo);
  }

  getDonorInfo() {
    this.setState({
      donorInfo: DonorInfoStore.getDonorInfo()
    })
  }

  render() {
    const style = {
      margin: "0 auto",
      padding: "25px"
    };
    const donorInfo = this.state.donorInfo;

    return (
      <div style={style}>
        <div class="container text-center">

          <img src={donorInfo.picSquare} alt={donorInfo.name} title={donorInfo.name} height="200" width="200" />

          <p>occupation: {donorInfo.occupation}</p>
          <p>employer: {donorInfo.employer}</p>
          <p>name: {donorInfo.name}</p>
          <p>streetAddress: {donorInfo.streetAddress}</p>
          <p>city: {donorInfo.city}</p>
          <p>residenceState: {donorInfo.residenceState}</p>
          <p>zip: {donorInfo.zip}</p>

        </div>
      </div>
    );
  }
}
