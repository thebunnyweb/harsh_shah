import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ListView = ({ searchApiRequest, searchInputRef }) => {
  return (
    <Fragment>
      <h1>List View</h1>
      <div className="row">
        <div className="col-sm-6">
          <div className="form-group">
            <label htmlFor="searchInput" className="sr-only">
              Search
            </label>
            <input
              type="text"
              className="form-control"
              id="searchInput"
              placeholder="Search..."
              ref={searchInputRef}
              onChange={e => searchApiRequest(e.target.value)}
            />
          </div>
        </div>
        <div className="col-sm-6 text-sm-right">
          <Link to="/addcharacter">
            <button type="button" className="btn btn-primary mb-3">
              Add New
            </button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

ListView.propTypes = {
  searchApiRequest: PropTypes.func
}

export default ListView;
