import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

import '@styles/global.scss';
import '@styles/modal.scss';

import Home from '@containers/Home';
import Inbox from '@containers/Inbox';
import Help from '@containers/Help';
import Jury from '@containers/Jury';
import Notification from '@containers/Notification';
import Search from '@containers/Search';
import Onboarding from '@containers/Onboarding';
import Profile from '@containers/Profile';
import Paper from '@containers/Paper';
import Portfolio from '@containers/Portfolio';
import SignIn from '@containers/SignIn';
import Publish from '@containers/Publish';

function App() {
  return (
    <div className="app">
      <Router basename="/">
        <Switch>
          <Route path="/help">
            <Help />
          </Route>
          <Route path="/notification">
            <Notification />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/inbox">
            <Inbox />
          </Route>
          <Route path="/jury">
            <Jury />
          </Route>
          <Route path="/sign_in">
            <SignIn />
          </Route>
          <Route path="/portfolio">
            <Portfolio />
          </Route>
          <Route path="/onboarding">
            <Onboarding />
          </Route>
          <Route path="/publish">
            <Publish />
          </Route>
          <Route path='/paper/:paperId'>
            <Paper />
          </Route>
          <Route path="/:username">
            <Profile />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
