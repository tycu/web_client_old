import React from 'react';
import Radium from 'radium';

@Radium
export default class Navbar extends React.Component {
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
        backgroundColor: '#333'
      },
      container: {
        margin: '0 auto',
        maxWidth: '800px',
        minWidth: '480px',
        position: 'relative',
        '@media (min-width: 990px)': {
          left: '-75px'
        },
        '@media (min-width: 1200px)': {
          left: '-125px'
        }
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
