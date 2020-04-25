import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import { ContextProvider } from './components/context/Context';
import Signup from './components/layout/pages/Signup';
import Login from './components/layout/pages/Login';
import Account from './components/layout/pages/Account';
import Home from './components/layout/pages/Home';

function App() {
  return (
    <ContextProvider>
      <Router>
        <Fragment>
          <div className='App text-gray-700 max-w-3xl m-auto lg:max-w-4xl'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/account' component={Account} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ContextProvider>
  );
}

export default App;
