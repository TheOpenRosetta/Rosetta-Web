import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

import {
  selectStatus,
  checkAuth,
} from '@services/Auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';

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
  const isLogin = useSelector(selectStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="app">
      <Router basename="/">
        <Switch>
          <Route path="/help">
            <Help />
          </Route>
          <Route path="/notification">
            { isLogin ? <Notification /> : <Redirect to="/" /> }
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/inbox">
            { isLogin ? <Inbox /> : <Redirect to="/" /> }
          </Route>
          <Route path="/jury">
            { isLogin ? <Jury /> : <Redirect to="/" /> }
          </Route>
          <Route path="/sign_in">
            { isLogin ? <Redirect to="/" /> : <SignIn /> }
          </Route>
          <Route path="/portfolio">
            { isLogin ? <Portfolio /> : <Redirect to="/" /> }
          </Route>
          <Route path="/onboarding">
            { isLogin ? <Redirect to="/" /> : <Onboarding /> }
          </Route>
          <Route path="/publish">
            { isLogin ? <Publish /> : <Redirect to="/" /> }
          </Route>
          <Route path='/paper/:paperId'>
            <Paper />
          </Route>
          <Route path="/:username">
            <Profile />
          </Route>
          <Route path="/user/:username">
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
