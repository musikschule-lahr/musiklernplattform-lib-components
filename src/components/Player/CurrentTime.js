import React from 'react';
import PropTypes from 'prop-types';
import { formatTime } from './utils';

const CurrentTime = ({ currentTime, className }) => (
  <time
    className={className}
  >
    {formatTime(currentTime)}
  </time>
);

CurrentTime.propTypes = {
  currentTime: PropTypes.number.isRequired,
  className: PropTypes.string,
};

CurrentTime.defaultProps = {
  className: '',
};

export default CurrentTime;
