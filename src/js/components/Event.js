import React from 'react';
import Radium from 'radium';
import { collections } from 'lodash';
import { browserHistory } from "react-router";
var Link = require('react-router').Link;
Link = Radium(Link);

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
        outlineLeft: '1px solid #e7e7e7',
        outlineRight: '1px solid #e7e7e7',
        outlineBottom: '1px solid #e7e7e7',
        // borderRadius: '0px',
        marginBottom: '40px',
        padding: '25px',
        clear: 'both'
      },
      summary: {
        maxWidth: '750px',
        fontSize: '1.15em',
        lineHeight: '1.8em',
        fontFamily: 'georgia,"times new roman",times,serif'
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
      },
      supportLink: {
        marginBottom: '20px',
      },
      opposeLink: {
        marginBottom: '30px',
        '@media (min-width: 768px)': {
          marginLeft: '50px',
        },
        '@media (min-width: 990px)': {
          marginLeft: '80px',
        },
        '@media (min-width: 1200px)': {
          marginLeft: '140px',
        }
      },
      donateLinks: {
        marginTop: '40px',
        marginLeft: '180px',
        marginBottom: '30px',
        fontSize: '16px',
      },
      politicianImg: {
        margin: '10px 30px 30px 0px',
        clear: 'both',
        maxHeight: '170px',
        maxWidth:  '170px',
        '@media (max-width: 480px)': {
          display: 'none'
        }
      },
      hr: {
        border: '0',
        height: '1px',
        background: '#ccc',
        // backgroundImage: 'linear-gradient(to right, #ddd, #666, #ddd)',
      }
    };
  }


  render() {
    const defStyle = this.getStyles();
    const { id, isPinned, imageUrl, imageAttribution, politicianId, headline, summary, createdAt, updatedAt, style, itemStyle, link } = this.props;

    var sanitizedSummary;
    if (summary) {
      sanitizedSummary = marked(summary);
    }
    var sanitizedAttribution;
    if (imageAttribution) {
      sanitizedAttribution = marked(imageAttribution).replace('<p>','').replace('</p>', '') + '<span> | ' + moment(createdAt).fromNow() + '</span>';
    }
    const eventId = this.props.eventId;
    const eventShow = "events/" + eventId;
    const attribution = <div dangerouslySetInnerHTML={{__html: sanitizedAttribution}}></div>;

    const politician = this.props.Politician;
    const politicianName = politician.firstName + ' ' + politician.lastName;

    const politicanPhotos = politician.PoliticianPhotos;
    const politicanPhotoUrl = politicanPhotos[Math.floor(Math.random() * politicanPhotos.length)].url;


    return (
      <li id={eventId} style={[defStyle.container]}>
        <img src={imageUrl} style={[defStyle.img]} alt={headline} title={headline}  />
        <div ref="list" style={[defStyle.base, style && style]}>
          <div style={[defStyle.columnClear, style && style]}>
            <h2 class='section-title'>{headline}</h2>
            {attribution}
          </div>
          <hr style={[defStyle.hr]}/>
          <img src={politicanPhotoUrl} style={[defStyle.politicianImg]} class='img-circle pull-left' alt={politicianName} title={politicianName} />
          <div style={[defStyle.summary, style && style]} dangerouslySetInnerHTML={{__html: sanitizedSummary}}>
          </div>

          <div style={[defStyle.donateLinks]}>
            <span style={[defStyle.supportLink, style && style.link]}>
              <Link
                // to={eventShow + '?support=true'}
                to={"events/" + eventId}
                class="text-success"
              >
                <strong>Support</strong>&nbsp;&nbsp;<span class="glyphicon glyphicon-menu-up" aria-hidden="true">&nbsp;</span>
              </Link>
            </span>
            <span style={[defStyle.opposeLink, style && style.link]}>
              <Link
                to={eventShow + '?support=false'}
                class="text-danger"
              >
                <strong>Oppose</strong>&nbsp;&nbsp;<span class="glyphicon glyphicon-menu-down" aria-hidden="true">&nbsp;</span>
              </Link>
            </span>
          </div>

        </div>
      </li>
    );
  }
}
