
import React from 'react';
import Radium from 'radium';

import { collections } from 'lodash';
var moment = require('moment');
var marked = require('marked');

@Radium
export default class Event extends React.Component {
  displayName = 'Event'

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

  constructor(props) {
    super(props);
  }

  getStyles = () => {
    return {
      base: {
        position: 'relative',
        display: 'block',
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        border: '1px solid #e7e7e7',
        borderRadius: '0px',
        marginBottom: '30px',
        padding: '25px',
        '@media (min-width: 768px)': {
          float: 'left'
        }
      },
      link: {
        // paddingTop: '10px',
        // paddingBottom: '10px',
        // paddingLeft: '15px',
        // paddingRight: '15px',
        // lineHeight: '20px',
        position: 'relative',
        // display: 'block',
        boxSizing: 'border-box',
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

        '@media (min-width: 768px)': {
          paddingTop: '15px',
          paddingBottom: '15px'
        }
      }
    };
  }

  render() {
    const defStyle = this.getStyles();
    const { id, isPinned, imageUrl, imageAttribution, politicianId, headline, summary, createdAt, updatedAt, style, itemStyle, link } = this.props;

    // <a ref="link" href={link} style={[defStyle.link, itemStyle && itemStyle]}>{headline}</a>

    var sanitizedSummary     = marked(summary);
    var sanitizedAttribution = marked(imageAttribution);

    return (
      <li>
        <img src={imageUrl} alt={headline} title={headline} height="407" width="750" />
        <div ref="list" style={[defStyle.base, style && style]}>
        <span dangerouslySetInnerHTML={{__html: sanitizedAttribution}}></span>
          <span>{moment(createdAt).fromNow()}</span>
          <h2>{headline}</h2>

          <div dangerouslySetInnerHTML={{__html: sanitizedSummary}}></div>
          <p>politicianId: {politicianId}</p>
        </div>
      </li>
    );
  }
}
