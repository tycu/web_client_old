import React from "react";
import { Route, IndexRoute,  } from "react-router";
// IMPORT BOOTSTRAP to whole app
// import 'bootstrap/dist/css/bootstrap.css';

// LOGGED OUT General
import Layout from "./js/pages/Layout";
import Events from "./js/pages/Events";
import FourOhFour from './js/pages/static/FourOhFour';


const StaticRoutes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Events}></IndexRoute>
    <Route path="/events" component={Events}></Route>
    <Route path='*' component={FourOhFour}></Route>
  </Route>
);
export default StaticRoutes;
