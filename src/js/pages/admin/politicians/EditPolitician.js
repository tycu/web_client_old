import React from 'react';
import { Link, browserHistory } from "react-router";
import { collections } from 'lodash';
import PoliticianStore from "../../../stores/PoliticianStore";
import PoliticianPhotoStore from "../../../stores/PoliticianPhotoStore";
import * as PoliticianActions from "../../../actions/PoliticianActions";
import Messages from '../../../components/layout/Messages';
import ImageStore from "../../../stores/ImageStore";
import * as FileUtils from "../../../utils/FileUtils";
import PoliticianImage from './PoliticianImage';
import * as PoliticianPhotoActions from "../../../actions/PoliticianPhotoActions";
import * as Validators from "../../../utils/ValidationUtils";
import ColorField from '../pacs/ColorField';

export default class EditPolitician extends React.Component {
  constructor() {
    super();
    this.getPolitician = this.getPolitician.bind(this);
    this.getPoliticianPhotos = this.getPoliticianPhotos.bind(this);
    this.setImage = this.setImage.bind(this);

    this.state = {
      politician: PoliticianStore.getPolitician(),
      politicianPhotos: PoliticianPhotoStore.getPoliticianPhotos(),
      key: 1
    };
  }

  static propTypes = {
    politician:        React.PropTypes.shape({
      politicianId:    React.PropTypes.string,
      url:             React.PropTypes.string,
      main:            React.PropTypes.string,
      color:           React.PropTypes.string,
      jobTitle:        React.PropTypes.string,
      twitterUsername: React.PropTypes.string
    }),
    politicianPhotos:   React.PropTypes.array
  }

  componentDidMount() {
    const politicianId = this.props.params.politicianId;
    PoliticianActions.fetchPolitician(politicianId);
    PoliticianStore.addChangeListener(this.getPolitician);

    PoliticianPhotoStore.fetchPoliticianPhotos(politicianId);
    PoliticianPhotoStore.addChangeListener(this.getPoliticianPhotos);
    ImageStore.addChangeListener(this.setImage);
  }

  componentWillUnmount() {
    PoliticianStore.removeChangeListener(this.getPolitician);
    PoliticianPhotoStore.removeChangeListener(this.getPoliticianPhotos);
    ImageStore.removeChangeListener(this.setImage);

  }

  getPolitician() {
    this.setState({
      politician: PoliticianStore.getPolitician(),
      message: PoliticianStore.getMessage(),
      error: PoliticianStore.getError(),
      key: Math.random()
    })
  }

  onUpdate(key, e) {
    let politician = this.state.politician;

    if (key === 'color') {
      politician[key] = e;
    } else {
      var val = e.target.value;
      politician[key] = val;
    }
    this.setState(politician);
  }

  validPolitician() {
    var that = this;
    var requiredFields = ['firstName', 'lastName', 'jobTitle', 'twitterUsername'];
    var shouldContinue = true;

    _(requiredFields).forEach(function(value) {
      if (_.isEmpty(that.state.politician[value])) {
        shouldContinue = false
        return false;
      }
    });
    return shouldContinue;
  }

  updatePolitician(e) {
    e.preventDefault();
    var that = this;

    if (!Validators.validPolitician(that.state)) {
      that.setState({error: "You must complete all Fields"});
      return false;
    } else {
      that.setState({error: ""});
      const politicianId = that.props.params.politicianId;

      PoliticianActions.updatePolitician(politicianId, {
        thumbnail: this.state.politician.thumbnail,
        firstName: this.state.politician.firstName,
        lastName:  this.state.politician.lastName,
        jobTitle:  this.state.politician.jobTitle,
        color:     this.state.politician.color,
        twitterUsername: this.state.politician.twitterUsername
      });

      const politicianPhotos = that.state.politicianPhotos;

      // NOTE if has Id, means is saved, so update
      _(politicianPhotos).forEach(function(value) {
        if (value.id) {
          PoliticianPhotoActions.updatePoliticianPhoto(politicianId, value.id, value);
        } else {
          PoliticianPhotoActions.createPoliticianPhoto(politicianId, value);
        }
      });

      browserHistory.replace('/manage_politicians');
    }
  }

  getPoliticianPhotos() {
    const politicianPhotos = PoliticianPhotoStore.getPoliticianPhotos();

    this.setState({
      politicianPhotos: PoliticianPhotoStore.getPoliticianPhotos()
    })
  }


  setImage() {
    var index = this.state.politicianPhotos.length - 1;
    let politicianPhotos = this.state.politicianPhotos;
    politicianPhotos[index]['url'] = ImageStore.getImageUrl(),
    politicianPhotos[index]['message'] = ImageStore.getMessage(),
    politicianPhotos[index]['error'] = ImageStore.getError(),
    politicianPhotos[index]['uploadStatus'] = ImageStore.getUploadStatus(),
    politicianPhotos[index]['key'] = Math.random()

    this.setState({
      politicianPhotos: politicianPhotos
    });
  }

  addImage(e) {
    e.preventDefault();
    const newPoliticianPhoto = { politicianId: this.state.politician.politicianId };

    this.setState({
      politicianPhotos: this.state.politicianPhotos.concat(newPoliticianPhoto)
    });
  }


  render() {
    const style = {
      container: {

      },
      thumbnail: {

      },
      firstName: {

      },
      lastName: {

      },
      jobTitle: {

      },
      twitterUsername: {

      },
      politicianId: {

      }
    }

    const politicianImages = this.state.politicianPhotos || [];
    const photoIndex = politicianImages.length - 1;
    const politicianId = parseInt(this.props.params.politicianId, 10);

    const politicianImageComponents = politicianImages.map((image, i) => {
      return <PoliticianImage key={Math.random()} {...image} photoIndex={i} onChange={this.setImage.bind(this, photoIndex)} />
    });

    return (
      <div style={style.container}>
        <form role="form">
          <h2>Edit Politician</h2>
          <Messages {...this.state} />

          <div className="form-group" style={style.politicianId} id='politicianImages'>
              <label htmlFor="summary">Politician Images</label>
              <br/>
              <button onClick={this.addImage.bind(this)}>Add Image</button>
              <br/>
              {politicianImageComponents}
          </div>

          <div className="form-group" style={style.firstName}>
            <label htmlFor="firstName">firstName</label>
            <input type="text" value={this.state.politician.firstName} onChange={this.onUpdate.bind(this, 'firstName')} className="form-control" id="firstName" ref="firstName" placeholder="firstName" />
          </div>
          <div className="form-group" style={style.lastName}>
            <label htmlFor="lastName">lastName</label>
            <input type="text" value={this.state.politician.lastName} onChange={this.onUpdate.bind(this, 'lastName')} className="form-control" id="lastName" ref="lastName" placeholder="lastName" />
          </div>
          <div className="form-group" style={style.jobTitle}>
            <label htmlFor="jobTitle">jobTitle</label>
            <input type="text" value={this.state.politician.jobTitle} onChange={this.onUpdate.bind(this, 'jobTitle')} className="form-control" id="jobTitle" ref="jobTitle" placeholder="jobTitle" />
          </div>
          <div className="form-group" style={style.twitterUsername}>
            <label htmlFor="twitterUsername">twitterUsername</label>
            <input type="text" value={this.state.politician.twitterUsername} onChange={this.onUpdate.bind(this, 'twitterUsername')} className="form-control" id="twitterUsername" ref="twitterUsername" placeholder="twitterUsername" />
          </div>
          <div className="form-group" style={style.color}>
            <label htmlFor="name">Color</label>
            <ColorField value={this.state.politician.color} onChange={this.onUpdate.bind(this, 'color')} />
          </div>
          <input type="file" id="fileInput" accept="image/jpeg, image/png" style={style.file} onChange={FileUtils.upLoadFile.bind(this)}/>

          <div className='form-group'>
            <button type="submit" className="btn btn-primary" onClick={this.updatePolitician.bind(this)}>Save Politician</button>
          </div>
        </form>
        <Link to='/manage_politicians'>Back To Politicians</Link>
      </div>
    );
  }
}
