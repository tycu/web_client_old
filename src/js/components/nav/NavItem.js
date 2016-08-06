import React from 'react';
import Radium from 'radium';
var Link = require('react-router').Link;
Link = Radium(Link);

@Radium
export default class NavItem extends React.Component {
  displayName = 'Navigation bar item'

  static propTypes = {
    link:  React.PropTypes.string,
    title: React.PropTypes.string,
    style: React.PropTypes.object,
    itemStyle: React.PropTypes.object
  }

  getStyles = () => {
    return {
      base: {
        position: 'relative',
        display: 'block',
        boxSizing: 'border-box',

        '@media (min-width: 768px)': {
          float: 'left'
        }
      },
      link: {
        paddingTop: '15px',
        paddingBottom: '15px',
        paddingLeft: '15px',
        paddingRight: '15px',
        lineHeight: '30px',
        position: 'relative',
        display: 'block',
        boxSizing: 'border-box',
        textDecoration: 'none',
        backgroundColor: 'transparent',
        color: '#ccc',

        ':hover': {
          color: '#111',
          backgroundColor: '#eee'
        },

        ':focus': {
          color: '#111',
          backgroundColor: 'transparent'
        },

        '@media (min-width: 768px)': {
          paddingTop: '15px',
          paddingBottom: '15px'
        }
      }
    };
  }

  clickLink(e) {

    // TODO get react router passed in context to components
    // e.preventDefault();
    // context.router.push(e.target.href)

    // browserHistory.push(e.target.href);
  }

  render() {
    const defStyle = this.getStyles();
    const {style, link, title, itemStyle} = this.props;
    return (
      <li ref="list" style={[defStyle.base, style && style]}>
        <Link ref="link" to={link} onClick={this.clickLink.bind(this)} style={[defStyle.link, itemStyle && itemStyle]}>{title}</Link>
      </li>
    );
  }
}
