import React from 'react';
import PropTypes from 'prop-types';
import { RangeSlider } from 'musiklernplattform-components';

const HertzShift = ({
  hertz, setHertz, className, upper, lower,
}) => {
  const handleChange = (value) => {
    setHertz(value);
  };

  return (
    <div className="slider-container">
      <span className="slider-knob">
        {hertz}
        {' '}
        Hz
      </span>
      <div className="slider-row">
        <span className="slider-label slider-lower-label">
          {lower}
          Hz
        </span>
        <RangeSlider
          minValue={lower}
          maxValue={upper}
          value={hertz}
          step={1}
          onChangeHandler={handleChange}
          className={`${className} slider`}
          filled
          filledFromCenter
        />
        <span className="slider-label slider-upper-label">
          {upper}
          {' '}
          Hz
        </span>
      </div>

      <span className="slider-label">TUNE</span>
    </div>
  );
};

HertzShift.propTypes = {
  lower: PropTypes.number.isRequired,
  upper: PropTypes.number.isRequired,
  hertz: PropTypes.number.isRequired,
  setHertz: PropTypes.func.isRequired,
  className: PropTypes.string,
};
HertzShift.defaultProps = {
  className: '',
};
export default HertzShift;
