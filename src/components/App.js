import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import counter from '../reducers/counter';
import injectReducer from '../../packages/app-initializer/src/utils/injectReducer';
import * as Routes from '../routes';

const App = () => {
  return (
    <div>
      <h1>App</h1>
      <Switch>
        <Route path="/" component={Routes.Other} />
        <Route path="/about" component={Routes.About} />
      </Switch>
      <footer>
        <Link to="/">Other</Link>
        <Link to="/about">About</Link>
      </footer>
    </div>
  )
}

const withReducer = injectReducer({key: 'counter', reducer: counter })

export default withReducer(App);