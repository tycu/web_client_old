import React from 'react';
import Radium from 'radium';
import { Link } from "react-router";
import AuthStore from '../../stores/AuthStore';
var moment = require('moment');

@Radium
export default class BreakingNews extends React.Component {
  static propTypes = {
    message:  React.PropTypes.string
  }

  state = {
    message: ''
  }

  getStyles = () => {
    return {
      breakingNews: {
        margin: '0 auto',
        position: 'relative',
        top: '0px',
        height: '50px',
        display: 'block',
        boxSizing: 'border-box',
        maxWidth: '720px'
        },
        container: {
          backgroundColor: '#fff',
          padding: '20px',
          // marginRight: 'auto',
          // marginLeft: 'auto',
          boxSizing: 'border-box',

          '@media (min-width: 768px)': {
            width: '720px'
          },
          '@media (min-width: 992px)': {
            width: '820px'
          },
          '@media (min-width: 1200px)': {
            width: '820px'
          }
        },
        breakingHeader: {
          fontWeight: '600',
          color: '#C14242'
        },
        link: {
          color: '#333',
          padding: '0px 20px'
        },
        timeHeader: {
          fontWeight: '200',
          color: '#C14242'
        },
        pseudoBefore: {
          display: 'table',
          // content: ' ',
          boxSizing: 'border-box'
        },
        pseudoAfter: {
          clear: 'both',
          display: 'table',
          // content: ' ',
          boxSizing: 'border-box'
        }
      };
  }

  render() {
    const message = this.props.message;
    const defStyle = this.getStyles();
    const { container } = this.props;
    const breakingEvent = this.props.breakingEvent || {};
    const eventIdLink = '/events#' + breakingEvent.eventId;

    return (
      <span>

            {(breakingEvent.eventId ? (
              <div style={[defStyle.breakingNews]}>
              <div style={[defStyle.container]}>
                <span style={[defStyle.breakingHeader]}>
                  Breaking News
                </span>
                <a style={[defStyle.link]} href={eventIdLink}>{breakingEvent.headline}</a>
                <span style={[defStyle.timeHeader]}>
                  {moment.utc(breakingEvent.createdAt).format('h:hh A')}
                </span>
              </div></div>) : (<span></span>))}

      </span>
    )
  }

}