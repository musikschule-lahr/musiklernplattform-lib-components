import React from 'react';
import PropTypes from 'prop-types';
import { RangeSlider } from 'musiklernplattform-components';

const PlaybackRate = ({ playbackRate, setPlaybackRate, className }) => {
  const handleChange = (value) => {
    const rate = value;
    //  rate = Math.ceil(rate / 25) * 25;
    //   if (rate < 50) rate = 50;
    setPlaybackRate(rate);
  };

  return (
    <div
      className="slider-container"
    >
      <span className="slider-knob">
        {playbackRate}
        %
      </span>
      <div className="slider-row">
        <span className="slider-label slider-lower-label">50%</span>
        <RangeSlider
          minValue={50}
          maxValue={150}
          value={playbackRate}
          step={1}
          onChangeHandler={handleChange}
          className={`${className} slider`}
          filled
          filledFromCenter
        />
        <span className="slider-label slider-upper-label">150%</span>
      </div>
      <span className="slider-label">TEMPO</span>
    </div>
  );
};

PlaybackRate.propTypes = {
  playbackRate: PropTypes.number.isRequired,
  setPlaybackRate: PropTypes.func.isRequired,
  className: PropTypes.string,
};
PlaybackRate.defaultProps = {
  className: '',
};
export default PlaybackRate;
