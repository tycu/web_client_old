import React from 'react';
import Radium from 'radium';

@Radium
export default class Navbar extends React.Component {
  displayName = 'Navigation bar'

  static propTypes = {
    navStyle:  React.PropTypes.object,
    contStyle: React.PropTypes.object,
    children:  React.PropTypes.node
  }

  state = {
    collapseIn: false
  }

  getStyles = () => {
    return {
      navbar: {
        backgroundColor: '#333',
        position: 'relative',
        top: '0px',
        minHeight: '50px',
        display: 'block',
        boxSizing: 'border-box'
        },
        container: {
          boxSizing: 'border-box',
          margin: '0 auto',

          '@media (min-width: 768px)': {
            width: '750px'
          },
          '@media (min-width: 992px)': {
            width: '860px'
          },
          '@media (min-width: 1200px)': {
            width: '860px'
          }
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

  renderChildren = () => {
    const {children} = this.props;
    return React.Children.map(children, (child) => {
      return React.cloneElement(child,
        {
          navbarToggle: this.navbarToggle,
          collapseIn: this.state.collapseIn
        }
      );
    });
  }

  navbarToggle = () => {
    this.setState({collapseIn: !this.state.collapseIn});
  }

  render() {
    const defStyle = this.getStyles();
    const {navStyle, contStyle} = this.props;
    return (
      <nav ref="navbar" style={[defStyle.navbar, navStyle && navStyle]}>
        <span style={[defStyle.pseudoBefore]} />
          <div ref="container" style={[defStyle.container, contStyle && contStyle]}>
            <span style={[defStyle.pseudoBefore]} />
                {this.renderChildren()}
            <span style={[defStyle.pseudoAfter]} />
          </div>
        <span style={[defStyle.pseudoAfter]} />
      </nav>
    );
  }
}
