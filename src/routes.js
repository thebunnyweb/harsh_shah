import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { Root, AddCharacter } from './pages';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Root} />
    <Route
      path="/addcharacter"
      exact
      render={props => (
        <AddCharacter title="Add new character" pageevent="add" {...props} />
      )}
    />
    <Route
      path="/updatecharacter/:id"
      exact
      render={props => (
        <AddCharacter title="Update character" pageevent="patch" {...props} />
      )}
    />
    <Route path="**" render={() => <Redirect to="/" />} />
  </Switch>
);

export default Routes;
