import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Events from "./pages/Events";
import Todos from "./pages/Todos";
import About from "./pages/About";
import Layout from "./pages/Layout";
import Settings from "./pages/Settings";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Events}></IndexRoute>
      <Route path="todo" component={Todos}></Route>
      <Route path="about" component={About}></Route>
      <Route path="settings" component={Settings}></Route>
    </Route>
  </Router>,
app);
