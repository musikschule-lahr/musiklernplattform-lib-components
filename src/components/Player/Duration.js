import React from 'react';
import PropTypes from 'prop-types';
import { formatTime } from './utils';

const Duration = ({ duration, className }) => (
  <time className={className}>
    {formatTime(duration)}
  </time>
);
Duration.propTypes = {
  duration: PropTypes.number.isRequired,
  className: PropTypes.string,
};

Duration.defaultProps = {
  className: '',
};

export default Duration;
