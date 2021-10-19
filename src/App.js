import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import '@styles/global.scss';
import '@styles/modal.scss';

import Home from '@containers/Home';
import Inbox from '@containers/Inbox';
import Help from '@containers/Help';
import Notification from '@containers/Notification';
import Search from '@containers/Search';
import Onboarding from '@containers/Onboarding';
import Profile from '@containers/Profile';
import SignIn from '@containers/SignIn';

function App() {
  return (
    <div className="app">
      <Router basename={process.env.PUBLIC_URL}>
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
          <Route path="/sign_in">
            <SignIn />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/onboarding">
            <Onboarding />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
