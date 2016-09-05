import React from 'react';
import Radium from 'radium';

import { collections } from 'lodash';
var moment = require('moment');
var marked = require('marked');

@Radium
export default class Event extends React.Component {

  static propTypes = {
    id: React.PropTypes.number,
    isPinned: React.PropTypes.bool,
    imageUrl: React.PropTypes.string,
    imageAttribution: React.PropTypes.string,
    politicianId: React.PropTypes.number,
    headline: React.PropTypes.string,
    summary: React.PropTypes.string,
    createdAt: React.PropTypes.string,
    updatedAt: React.PropTypes.string,
    link:  React.PropTypes.string,
    style: React.PropTypes.object,
    itemStyle: React.PropTypes.object
  }

  getStyles = () => {
    return {
      base: {
        backgroundColor: '#fff',
        borderLeft: '1px solid #e7e7e7',
        borderRight: '1px solid #e7e7e7',
        borderBottom: '1px solid #e7e7e7',
        borderRadius: '0px',
        marginBottom: '30px',
        padding: '25px',
        clear: 'both'
      },
      summary: {
        maxWidth: '750px'
      },
      link: {
        textDecoration: 'none',
        backgroundColor: 'transparent',
        color: '#001c00',
        ':hover': {
          color: '#333',
          backgroundColor: '#eee'
        },
        ':focus': {
          color: '#333',
          backgroundColor: 'transparent'
        },
      },
      container: {
        backgroundColor: '#fff',
        maxWidth: '750px',
        minWidth: '480px'
      },
      columnClear: {
        clear: 'both'
      },
      img: {
        maxWidth: '100%'
      }
    };
  }

  render() {
    const defStyle = this.getStyles();
    const { id, isPinned, imageUrl, imageAttribution, politicianId, headline, summary, createdAt, updatedAt, style, itemStyle, link } = this.props;

    var sanitizedSummary;// = '';
    if (summary) {
      sanitizedSummary = marked(summary);
    }
    var sanitizedAttribution;// = '';
    if (imageAttribution) {
      sanitizedAttribution = marked(imageAttribution);
    }
    const eventId = this.props.eventId;
    return (
      <li id={eventId} style={[defStyle.container]}>
        <img src={imageUrl} style={[defStyle.img]} alt={headline} title={headline}  />
        <div ref="list" style={[defStyle.base, style && style]}>
          <div style={[defStyle.columnClear, style && style]}>
            <h2>{headline}</h2>
            <span dangerouslySetInnerHTML={{__html: sanitizedAttribution}}></span>
            <span>{moment(createdAt).fromNow()}</span>
          </div>

          <hr />

          <div style={[defStyle.summary, style && style]} dangerouslySetInnerHTML={{__html: sanitizedSummary}}>
          </div>
          <p>politicianId: {politicianId}</p>
        </div>
      </li>
    );
  }
}
