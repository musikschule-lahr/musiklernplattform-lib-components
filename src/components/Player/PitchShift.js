import React from 'react';
import PropTypes from 'prop-types';
import { RangeSlider } from 'musiklernplattform-components';

const PitchShift = ({ pitch, setPitch, className }) => {
  const handleChange = (value) => {
    setPitch(value - 6);
  };

  return (
    <div className="slider-container">
      <span className="slider-knob">
        {pitch >= 0 && '+'}
        {pitch}
        {' '}
        Halbtöne
      </span>
      <div className="slider-row">
        <span className="slider-label slider-lower-label">-&nbsp;6 Halbtöne</span>
        <RangeSlider
          minValue={0}
          maxValue={12}
          value={pitch + 6}
          step={1}
          onChangeHandler={handleChange}
          className={`${className} slider`}
          filled
          filledFromCenter
        />
        <span className="slider-label slider-upper-label">+&nbsp;6 Halbtöne</span>
      </div>

      <span className="slider-label">TRANSPOSE</span>
    </div>
  );
};

PitchShift.propTypes = {
  pitch: PropTypes.number.isRequired,
  setPitch: PropTypes.func.isRequired,
  className: PropTypes.string,
};
PitchShift.defaultProps = {
  className: '',
};
export default PitchShift;
