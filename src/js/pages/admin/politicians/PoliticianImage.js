import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import * as FileUtils from "../../../utils/FileUtils";
import * as PoliticianPhotoActions from "../../../actions/PoliticianPhotoActions";

export default class PoliticianImage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      error: '',
      url: ''
    }
  }

  static propTypes = {
    url: React.PropTypes.string,
    main: React.PropTypes.bool,
    uploadStatus:  React.PropTypes.string,
    photoIndex: React.PropTypes.number
  }

  deletePoliticianPhoto(key, e) {
    e.preventDefault();
    if (key) {
      PoliticianPhotoActions.deletePoliticianPhoto(this.props.politicianId, key);
    }
    browserHistory.replace('/manage_politicians');
  }

  render () {
    const { politicianId }  = this.props;
    const { id } = this.props;

    const style = {
      container: {
        width: '300px',
        display: 'inline'
      },
      img: {
        position: 'relative',
        width: '414px',
        height: '220px',
        progress: {
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          textAlign: 'center',
        }
      },
      select: {
        width: '300px',
        display: 'inline'
      },
      delete: {
        marginLeft: '20px',
        width: '60px'
      }
    }

    return (
      <div style={style.container}>
        <div style={style.img} onClick={FileUtils.clickToAddFile.bind(this)}>
          <img id="image" class="pointer" height="100%" width="100%" src={this.props.url}/>
          <div id="progress" style={style.img.progress}>{this.props.uploadStatus}</div>
        </div>
        <image
          class="form-control pacList"
          type="select"
          style={style.select}>
        </image>
        <button style={style.delete} onClick={this.deletePoliticianPhoto.bind(this, id)}>Delete</button>
        <br/>
      </div>
    )
  }
}
