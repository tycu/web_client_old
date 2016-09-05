import React from 'react';
import Radium from 'radium';
var Link = require('react-router').Link;
Link = Radium(Link);

@Radium
export default class NavbarHeader extends React.Component {
  static propTypes = {
    href:        React.PropTypes.string,
    name:        React.PropTypes.string,
    headerStyle: React.PropTypes.object,
    brandStyle:  React.PropTypes.object
  }

  getStyles = () => {
    return {
      header: {
        '@media (min-width: 768px)': {
          float: 'left',
          marginRight: '0',
          marginLeft: '0'
        }
      },
      brand: {
        float: 'left',
        height: '50px',
        padding: '15px',
        lineHeight: '30px',
        textDecoration: 'none',
        backgroundColor: 'transparent',
        fontSize: '26px',
        color: '#eee',
        fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
        ':hover': {
          color: '#999'
        },
        ':focus': {
          color: '#999'
        },
        '@media (min-width: 768px)': {
          marginLeft: '-15px'
        }
      },
      navbarToggle: {
        position: 'relative',
        float: 'right',
        padding: '9px 10px',
        marginTop: '8px',
        marginRight: '15px',
        marginBottom: '8px',
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '4px',
        borderColor: '#888',
        cursor: 'pointer',
        ':hover': {
          backgroundColor: '#aaa'
        },
        ':focus': {
          outline: '0',
          backgroundColor: '#aaa'
        },
        '@media (min-width: 768px)': {
          display: 'none'
        }
      },
      srOnly: {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        borderWidth: '0',
        borderStyle: 'none',
        },
      iconBar: {
        display: 'block',
        width: '22px',
        height: '2px',
        borderRadius: '1px',
        backgroundColor: '#888',
      },
      burger: {
        marginTop: '4px'
      },
      pseudoBefore: {
        display: 'table',
      },
      pseudoAfter: {
        clear: 'both',
        display: 'table',
      }
    };
  }

  renderToggleButton = () => {
    const defStyle = this.getStyles();
    return (
      <button type="button" style={[defStyle.navbarToggle]} onClick= {this.props.navbarToggle}>
        <span style={[defStyle.srOnly]}>Toggle navigation</span>
        <span style={[defStyle.iconBar]}></span>
        <span style={[defStyle.iconBar, defStyle.burger]}></span>
        <span style={[defStyle.iconBar, defStyle.burger]}></span>
      </button>
    );
  }

  render() {
    const defStyle = this.getStyles();
    const {href, name, headerStyle, brandStyle} = this.props;
    return (
      <div key="header" style={[defStyle.header, headerStyle && headerStyle]}>
        <span style={[defStyle.pseudoBefore]} />
          {this.renderToggleButton()}
          <Link key="brand" to={href} style={[defStyle.brand, brandStyle && brandStyle]}>
            {name}
          </Link>
        <span style={[defStyle.pseudoAfter]} />
      </div>
    );
  }
}
