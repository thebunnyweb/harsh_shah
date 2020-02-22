import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types'

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

AlertComponent.propTypes = {
  data: PropTypes.object,
  flag: PropTypes.string
}

export default AlertComponent;
