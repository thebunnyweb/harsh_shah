import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';



const ListView = ({ searchApiRequest}) => {
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
                            onChange={e => searchApiRequest(e.target.value) }
                        />
                    </div>
                </div>
                <div className="col-sm-6 text-sm-right">
                    <Link to="/addcharacter">
                    <button type="button" className="btn btn-primary mb-3" >
                        Add New
                    </button>
                    </Link>
                </div>
            </div>
        </Fragment>
    )
}

export default ListView;