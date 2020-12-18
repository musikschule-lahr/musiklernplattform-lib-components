import React from 'react';
import PropTypes from 'prop-types';
import { RangeSlider } from 'musiklernplattform-components';

const SeekBar = ({
  currentTime, duration, seekTo, className,
}) => {
  const handleChange = (value) => {
    seekTo(value);
  };

  return (
    <RangeSlider
      minValue={0}
      maxValue={duration}
      value={parseInt(currentTime, 10)}
      onChangeHandler={handleChange}
      className={className}
      small
      filled
    />
  );
};
SeekBar.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  seekTo: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SeekBar.defaultProps = {
  className: '',
};

export default SeekBar;
