import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './js/AppRoutes';

window.onload = () => {
  ReactDOM.render(<AppRoutes />, document.getElementById('app'));
};
