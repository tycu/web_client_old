import React from 'react';
import Radium from 'radium';
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
        height: '50px',
        fontSize: '16px',
        marginTop: '7px',
        backgroundColor: '#fff'
        },
        container: {
          margin: '0 auto',
          maxWidth: '750px',
          minWidth: '480px',
          position: 'relative',
          padding: '15px 20px',
          '@media (min-width: 768px)': {
            left: '-15px'
          },
          '@media (min-width: 990px)': {
            left: '-75px'
          },
          '@media (min-width: 1200px)': {
            left: '-175px'
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
        },
        pseudoAfter: {
          clear: 'both',
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