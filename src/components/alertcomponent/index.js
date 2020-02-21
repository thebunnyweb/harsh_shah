import React from 'react';
import classNames from 'classnames';

const AlertComponent = ({ data, flag }) => (
  <div
    className={classNames('alert', {
      'alert-success': flag === 'success',
      'alert-danger': flag === 'error',
      'alert-warning': flag === 'warning'
    })}
  >
    {data.message || data.toLocaleString()}
  </div>
);

export default AlertComponent;
