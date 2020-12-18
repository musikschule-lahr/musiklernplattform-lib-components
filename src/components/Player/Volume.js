import React from 'react';
import PropTypes from 'prop-types';
import { RangeSlider } from 'musiklernplattform-components';

const Volume = ({ volume, setVolume, className }) => {
  const handleChange = (value) => {
    setVolume((+value / 200).toFixed(4));
  };
  return (
    <RangeSlider
      minValue={0}
      maxValue={200}
      value={volume * 200}
      onChangeHandler={handleChange}
      className={`${className} mixer-slider`}
      filled
      filledFromCenter
    />
  );
};

Volume.propTypes = {
  volume: PropTypes.number.isRequired,
  setVolume: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Volume.defaultProps = {
  className: '',
};

export default Volume;
