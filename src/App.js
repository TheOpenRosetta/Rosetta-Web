import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ArjsProvider } from 'arjs-react';

import '@styles/global.scss';
import '@styles/modal.scss';

import Home from '@containers/Home';
import Inbox from '@containers/Inbox';
import Help from '@containers/Help';
import Notification from '@containers/Notification';
import Search from '@containers/Search';
import Onboarding from '@containers/Onboarding';
import Profile from '@containers/Profile';
import Portfolio from '@containers/Portfolio';
import SignIn from '@containers/SignIn';
import Publish from '@containers/Publish';

function App() {
  return (
    <ArjsProvider
      connectors={{
          arconnect: true,
          arweave: true
      }}
      enableSWC={false}>
      <div className="app">
        <Router>
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
            <Route path="/portfolio">
              <Portfolio />
            </Route>
            <Route path="/onboarding">
              <Onboarding />
            </Route>
            <Route path="/publish">
              <Publish />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </ArjsProvider>
  );
}

export default App;
