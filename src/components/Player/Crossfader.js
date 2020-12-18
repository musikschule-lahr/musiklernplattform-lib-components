import React from 'react';
import PropTypes from 'prop-types';
import { RangeSlider } from 'musiklernplattform-components';

const Crossfader = ({
  crossfadeValue, nameFirst, nameSecond, setCrossfade, className,
}) => {
  const handleChange = (value) => {
    const newVolume = value - 100;
    // 110 ->
    const firstVol = 100 - newVolume;
    const secondVol = 100 + newVolume;
    setCrossfade(value, (firstVol / 100).toFixed(4), (secondVol / 100).toFixed(4));
  };

  return (
    <div className="slider-container">
      <span className="slider-knob">
        {crossfadeValue - 100}
        %
      </span>
      <div className="slider-row">
        <span className="slider-label slider-lower-label">{nameFirst.toUpperCase()}</span>
        <RangeSlider
          minValue={0}
          maxValue={200}
          value={crossfadeValue}
          onChangeHandler={handleChange}
          className={`${className} slider`}
          filled
          filledFromCenter
        />
        <span className="slider-label slider-upper-label">{nameSecond.toUpperCase()}</span>
      </div>
      <span className="slider-label">&nbsp;</span>
    </div>
  );
};

Crossfader.propTypes = {
  crossfadeValue: PropTypes.number.isRequired,
  nameFirst: PropTypes.string.isRequired,
  nameSecond: PropTypes.string.isRequired,
  setCrossfade: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Crossfader.defaultProps = {
  className: '',
};

export default Crossfader;
