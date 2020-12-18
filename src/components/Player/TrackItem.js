import React from 'react';
import PropTypes from 'prop-types';
import { Button, RangeSlider } from 'musiklernplattform-components';

const TrackItem = ({
  trackItemValue, isMuted, trackItemValuePrev, name, setTrackItem, className, playSoloFunc, isSolo,
}) => {
  const handleChange = (value) => {
    setTrackItem((+value / 200).toFixed(4));
  };
  const muteUnmute = () => {
    if (!isMuted) setTrackItem(0);
    else setTrackItem(trackItemValuePrev);
  };

  return (
    <div className="slider-row">
      <div className="track-item-btns">
        <Button
          title="S"
          onClickHandler={playSoloFunc}
          className={isSolo ? 'track-item-btn  track-item-solo-btn active' : 'track-item-btn'}
        />
        <Button
          title="M"
          onClickHandler={muteUnmute}
          className={trackItemValue === 0 ? 'track-item-btn active' : 'track-item-btn'}
        />
      </div>

      <RangeSlider
        minValue={0}
        maxValue={200}
        value={trackItemValue * 200}
        onChangeHandler={handleChange}
        className={`${className} slider`}
        filled

      />
      <span className="slider-label slider-upper-label band">{name}</span>
    </div>
  );
};

TrackItem.propTypes = {
  trackItemValue: PropTypes.number.isRequired,
  trackItemValuePrev: PropTypes.number.isRequired,
  setTrackItem: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  playSoloFunc: PropTypes.func.isRequired,
  isSolo: PropTypes.bool,
  isMuted: PropTypes.bool,
};

TrackItem.defaultProps = {
  className: '',
  isSolo: false,
  isMuted: false,
};

export default TrackItem;
