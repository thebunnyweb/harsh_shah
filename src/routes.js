import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { Root, AddCharacter } from './pages';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Root} />
    <Route
      path="/addcharacter"
      exact
      render={() => <AddCharacter title="Add new character" event="add" />}
    />
    <Route path="**" render={() => <Redirect to="/" />} />
  </Switch>
);

export default Routes;
