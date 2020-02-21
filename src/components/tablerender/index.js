import React, { Fragment } from 'react';
import classNames from 'classnames';
import { debounce } from 'lodash';

const TableRenderer = ({
  data,
  totalPages,
  currentPage,
  handlePageChange,
  deleteRecord
}) => {
  return (
    <Fragment>
      <table className="table table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Species</th>
            <th scope="col">Gender</th>
            <th scope="col">Homeworld</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.species}</td>
                <td>{item.gender}</td>
                <td>{item.homeworld}</td>
                <td>
                  <div
                    className="btn-group btn-group-sm"
                    role="group"
                    aria-label="Actions"
                  >
                    <button type="button" className="btn btn-secondary">
                      <i className="fa fa-pencil" aria-hidden="true" /> Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteRecord(item.id)}
                    >
                      <i className="fa fa-trash-o" aria-hidden="true" /> Remove
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav aria-label="Data grid navigation">
        <ul className="pagination justify-content-end">
          {totalPages !== 0 && (
            <li
              className={classNames('page-item', {
                disabled: currentPage === 1
              })}
            >
              <button
                type="button"
                className="page-link"
                tabIndex="-1"
                onClick={debounce(() => handlePageChange(currentPage - 1), 100)}
              >
                Previous
              </button>
            </li>
          )}
          {[...Array(totalPages)].map((elem, i) => {
            return (
              <li
                key={i}
                className={classNames('page-item', {
                  active: currentPage === +(i + 1)
                })}
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={debounce(() => handlePageChange(i + 1), 200)}
                >
                  {i + 1}
                  {currentPage === +(i + 1) && (
                    <span className="sr-only">(current)</span>
                  )}
                </button>
              </li>
            );
          })}
          {totalPages !== 0 && (
            <li
              className={classNames('page-item', {
                disabled: currentPage === totalPages
              })}
            >
              <button
                type="button"
                className="page-link"
                onClick={debounce(() => handlePageChange(currentPage + 1), 100)}
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </nav>
    </Fragment>
  );
};

export default TableRenderer;
