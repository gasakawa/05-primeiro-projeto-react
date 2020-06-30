import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
  <Switch>
    <Route component={Dashboard} path="/" exact />
    <Route component={Repository} path="/repository" />
  </Switch>
);

export default Routes;
