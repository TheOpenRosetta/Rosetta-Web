import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import '@styles/global.scss';

import Home from '@containers/Home';
import Inbox from '@containers/Inbox';
import Help from '@containers/Help';
import Search from '@containers/Search';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/help">
            <Help />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/inbox">
            <Inbox />
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
