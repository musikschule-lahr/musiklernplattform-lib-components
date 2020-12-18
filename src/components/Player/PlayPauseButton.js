import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  IconButton,
} from 'musiklernplattform-components';
import PauseIcon from 'musiklernplattform-components/iconify/icon-player-pause';
import PlayIcon from 'musiklernplattform-components/iconify/icon-player-play';
import RecordPauseIcon from 'musiklernplattform-components/iconify/icon-player-record-pause';

const PlayPauseButton = styled(IconButton)`
  color: white;
  font-size: 80px;
  padding-left:54px;
  padding-right:54px;
  @media only screen and (max-width: 600px) {
    font-size: 60px;
    padding-left:27px;
    padding-right:27px;
  }
`;

const PlayPause = ({
  isPlaying, playPause, className, isRecording,
}) => {
  const handlePlayPause = () => {
    playPause();
  };

  const getIcon = (recording, playing) => {
    console.log('recording, playing', recording, playing);
    if (recording) return RecordPauseIcon;
    if (playing) return PauseIcon;
    return PlayIcon;
  };

  return (
    <PlayPauseButton
      icon={getIcon(isRecording, isPlaying)}
      onClickHandler={handlePlayPause}
      className={className}
    />
  );
};

PlayPause.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  playPause: PropTypes.func.isRequired,
  className: PropTypes.string,
  isRecording: PropTypes.bool,
};
PlayPause.defaultProps = {
  className: '',
  isRecording: false,
};

export default PlayPause;
