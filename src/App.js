import React, { Fragment } from 'react';
import Routes from './routes';
import { Navbar } from './components';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <Routes />
      </div>
    </Fragment>
  );
};

export default App;
