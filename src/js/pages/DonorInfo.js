import React from "react";
import StatesField from "../components/StatesField";
import * as DonorInfoActions from "../actions/DonorInfoActions";
import DonorInfoStore from "../stores/DonorInfoStore";

export default class DonorInfo extends React.Component {

  // TODO fetch this info from store/server
  // TODO make sure DB aligns with this.


  constructor() {
    super()
    this.getDonorInfo = this.getDonorInfo.bind(this);

    this.state = {
      donorInfo: DonorInfoStore.getDonorInfo(),
      hideEmployerOccupation: false
    };
  }

  componentWillMount() {
    this.setState({
      donorInfo: DonorInfoStore.getDonorInfo(),
      hideEmployerOccupation: false
    });
  }

  componentWillUnmount() {
    DonorInfoStore.removeListener("change", this.getDonorInfo);
  }

  getDonorInfo() {
    this.setState({
      donorInfo: DonorInfoStore.getDonorInfo()
    });
  }

  handleEmployedChange(event) {
    this.setState({
      donorInfo: {
        employed: !event.target.checked,
        occupation: '',
        employer: ''
      },
      hideEmployerOccupation: event.target.checked
    })
  }
  handleOccupationChange(event) {
    this.setState({donorInfo: {occupation: event.target.value}})
  }
  handleEmployerChange(event) {
    this.setState({donorInfo: {employer: event.target.value}})
  }
  handleNameChange(event) {
    this.setState({donorInfo: {name: event.target.value}})
  }
  handleStreetAddressChange(event) {
    this.setState({donorInfo: {streetAddress: event.target.value}})
  }
  handleCityChange(event) {
    this.setState({donorInfo: {city: event.target.value}})
  }
  handleresidenceStateChange(event) {
    this.setState({donorInfo: {residenceState: event.target.value}})
  }
  handleZipChange(event) {
    this.setState({donorInfo: {zip: event.target.value}})
  }

  updateDonorInfo(e) {
    e.preventDefault();
    DonorInfoActions.updateDonorInfo(this.state.donorInfo);
  }

  render() {
    var showExtrafield = this.state.hideEmployerOccupation ? 'hidden' : null;

    var unemployed = !this.state.donorInfo.employed

    return (
      <div className="signin jumbotron center-block">
        <h2>Donor Info</h2>
        <form role="form">
        <div className="form-group">

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" value={this.state.donorInfo.name} onChange={this.handleNameChange.bind(this)} className="form-control" id="name" ref="name" placeholder="Full Name" />
        </div>
        <div className="form-group">
          <label htmlFor="streetAddress">Street Address</label>
          <input type="text" value={this.state.donorInfo.streetAddress} onChange={this.handleStreetAddressChange.bind(this)} className="form-control" id="streetAddress" ref="streetAddress" placeholder="Street Address" />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" value={this.state.donorInfo.city} onChange={this.handleCityChange.bind(this)} className="form-control" id="city" ref="city" placeholder="City" />
        </div>
        <div className="form-group">
          <label htmlFor="name">State</label>
          <input type="text" value={this.state.donorInfo.residenceState} onChange={this.handleresidenceStateChange.bind(this)} className="form-control" id="residenceState" ref="residenceState" placeholder="State of Residence" />
        </div>
        <div className="form-group">
          <label htmlFor="name">Zip</label>
          <input type="text" value={this.state.donorInfo.zip} onChange={this.handleZipChange.bind(this)} className="form-control" id="zip" ref="zip" placeholder="Zip" />
        </div>

        <StatesField />
          <label htmlFor="employed">Retired or Unemployed</label>
          <input type="checkbox" checked={unemployed} onChange={this.handleEmployedChange.bind(this)}  id="employed" placeholder="employed" />
        </div>

        <div className={showExtrafield}>

          <div className='form-group'>
            <label htmlFor="occupation">Occupation</label>
            <input type="text" value={this.state.donorInfo.occupation} onChange={this.handleOccupationChange.bind(this)} className="form-control" id="occupation" ref="occupation" placeholder="occupation" />
          </div>

          <div className='form-group'>
            <label htmlFor="employer">Employer</label>
            <input type="text" value={this.state.donorInfo.employer} onChange={this.handleEmployerChange.bind(this)} className="form-control" id="employer" ref="employer" placeholder="employer" />
          </div>
        </div>

        <button type="submit" className="btn btn-default" onClick={this.updateDonorInfo.bind(this)}>Submit</button>
      </form>
    </div>
    );
  }
}
