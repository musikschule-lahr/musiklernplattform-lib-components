/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
import React, {
  useState, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';
import {
  IconButton, TabNav, NavItem, RecordFile,
} from 'musiklernplattform-components';
import moment from 'moment';
import FullScreenIcon from '@iconify/icons-ion/scan';
import Tone from 'tone';
import webAudioTouchUnlock from 'web-audio-touch-unlock';
import RecordIcon from 'musiklernplattform-components/iconify/icon-player-record';
import SkipBackIcon from 'musiklernplattform-components/iconify/icon-player-skip-to-start';
import PlayPause from './PlayPauseButton';
import CurrentTime from './CurrentTime';
import PitchShift from './PitchShift';
import HertzShift from './HertzShift';
import PlaybackRate from './PlaybackRate';
import { playerTypes } from '../../constants/util';
import SeekBar from './SeekBar';
import CoverDisplay from './CoverDisplay';
import Duration from './Duration';
import TrackItem from './TrackItem';
import Crossfader from './Crossfader';
import './WavAudioEncoder.min.js';
import {
  SkipBackButton, RecordButton, VideoAudio, SeekBarRow, PlayBtnRow, MediaControls, TabContent,
} from './PlayerComponents';
import LoadingIndicator from '../Generic/LoadingIndicator';

const PlayerNavItem = ({ activeTab, setActiveTab, tabName }) => (
  <NavItem
    active={activeTab === tabName}
    onClickHandler={
    () => setActiveTab(tabName)
  }
    activeClassName="player-tabnav-active"
  >
    {tabName}
  </NavItem>
);
PlayerNavItem.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  tabName: PropTypes.string.isRequired,
};

const TonePlayer = ({
  trackList, videoSource, spurNamen, playerType, hertzBase, coverPath,
}) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chosenAudio, setChosenAudio] = useState('');
  // const [videoSource, setVideoSource] = useState(null);//"https://upload.sinusquadrat.com/Erna/output.mp4");
  const [videoloading, setVideoLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [pitch, setTrackPitch] = useState(0);
  const [hertz, setHertzValue] = useState(hertzBase);
  const [rate, setRate] = useState(100);
  const [volumeList, _setTrackVolumeList] = useState([]);
  const [playerList, _setPlayerList] = useState(new Array(trackList.length));
  const [crossFadeValue, setCrossFadeValue] = useState(100);
  const [along, setAlong] = useState(0);
  const [trackLength, setLength] = useState(0);
  const [activeTab, setActiveTab] = useState('MIXER');
  const [recording, setRecording] = useState(false);
  const [recordingsList, setRecordingsList] = useState([]);

  const ac = useRef(null);
  const audioDataBuffer = useRef([]);
  const trackIsSoloRef = useRef(null);
  const playerListRef = useRef(playerList);
  const recordName = useRef('');
  const recordPath = useRef();
  const totalReceivedData = useRef(0);
  const volumeListRef = useRef([]);

  const setTrackVolumeList = (value) => {
    _setTrackVolumeList(value);
    volumeListRef.current = value;
  };

  const setPlayerList = (data) => {
    playerListRef.current = data;
    _setPlayerList(data);
  };

  useEffect(() => {
    ac.current = new (window.AudioContext || window.webkitAudioContext)();
    webAudioTouchUnlock(ac.current).then(
      (unlocked) => {
      },
      (reason) => {
        console.error(reason);
      },
    );
    Tone.context = ac.current;
    const initGainValue = (playerType === playerTypes.ENSEMBLE_BAND ? 0.75 : 0.5);

    const initTrack = (track, index) => new Promise((resolve, reject) => {
      const t = new Tone.Buffer(track, (loaded) => {
        const player = new Tone.Player(t);
        const pitcher = new Tone.PitchShift();
        const gain = new Tone.Gain(initGainValue, 0);
        player.connect(pitcher);
        pitcher.connect(gain);
        gain.connect(ac.current.destination);
        playerListRef.current[index] = {
          player,
          gain,
          pitcher,
          prevGain: initGainValue,
          pitch: 0,
          hertz: 0,
          gainValue: initGainValue,
          muted: false,
        };
        resolve(true);
      }, (err) => reject(err));
    });
    Promise.all(trackList.map(initTrack)).then(() => {
      setPlayerList(playerListRef.current); // also put it in state
      Tone.now();
      setLoading(false);
    }).catch((err) => console.log(err));
    return function cleanup() {
      ac.current = null;
      playerListRef.current.forEach((player) => {
        player.player.dispose();
        player.gain.dispose();
        player.pitcher.dispose();
      });
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCrossfade = (newValue, valueFirst, valueSecond) => {
    playerListRef.current[0].gain.gain.value = parseFloat(valueFirst / 2, 10);
    playerListRef.current[0].gainValue = parseFloat(valueFirst, 10);
    playerListRef.current[1].gain.gain.value = parseFloat(valueSecond / 2, 10);
    playerListRef.current[1].gainValue = parseFloat(valueSecond, 10);
    setCrossFadeValue(newValue);
  };

  const setVolume = (value, node, i, isSolo, disallowMute) => {
    const newList = [...playerListRef.current];
    if (value !== newList[i].gainValue) newList[i].prevGain = newList[i].gain.gain.value;
    newList[i].gainValue = value;
    newList[i].muted = (disallowMute ? newList[i].muted : value === 0);
    newList[i].isSolo = isSolo !== undefined ? isSolo : newList[i].isSolo;
    newList[i].gain.gain.value = value;
    if (trackIsSoloRef.current !== null) {
      if (!newList[i].isSolo && trackIsSoloRef.current !== i && value !== 0) {
        newList[trackIsSoloRef.current].isSolo = false;
        trackIsSoloRef.current = null;
      }
    }
    setPlayerList(newList);
  };

  // trackIsSoloRef.current
  // which
  const playSolo = (which) => {
    if (which === trackIsSoloRef.current) {
      playerListRef.current.forEach((item, idx) => {
        if (which !== idx) {
          setVolume((item.muted ? 0 : item.prevGain), null, idx, false, true);
        } else {
          trackIsSoloRef.current = null;
          setVolume((item.muted ? 0 : item.gainValue), null, idx, false, true);
        }
      });
      return;
    }
    playerListRef.current.forEach((item, idx) => {
      if (which !== idx) {
        setVolume(0, null, idx, false, true);
      } else {
        trackIsSoloRef.current = idx;
        setVolume((item.muted ? 0 : item.gainValue), null, idx, true, true);
      }
    });
  };

  const handleMetadataEvent = () => {
    setLength(video.duration);
    video.play();
    video.pause();
  };

  const canPlayThroughEvent = () => {
    setVideoLoading(false);
  };

  const endedEvent = () => {
    video.pause();
    setAlong(0);
    setPlaying(false);
  };

  const timeUpdateEvent = () => {
    setAlong(video.currentTime);
  };

  useEffect(() => {
    if (!video) {
      let myVideo;
      if (videoSource) myVideo = document.querySelector('#video');
      else myVideo = document.querySelector('#audio');
      setVideo(myVideo);
    } else {
      video.addEventListener('loadedmetadata', handleMetadataEvent);
      video.addEventListener('canplaythrough', canPlayThroughEvent);
      video.addEventListener('ended', endedEvent);
      video.addEventListener('timeupdate', timeUpdateEvent);
    }

    return function mediaCleanup() {
      if (video) {
        video.removeEventListener('loadedmetadata', handleMetadataEvent, false);
        video.removeEventListener('canplaythrough', canPlayThroughEvent, false);
        video.removeEventListener('ended', endedEvent, false);
        video.removeEventListener('timeupdate', timeUpdateEvent, false);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoSource, video]);

  const loadRecording = (trackname, url) => {
    const newRecord = {
      path: url,
      date: moment(
        trackname,
      ).utc().local().format('DD.MM.YYYY'),
      time: moment(
        trackname,
      ).utc().local().format('HH:mm'),
    };
    setRecordingsList([...recordingsList, newRecord]);
  };

  const onAudioInput = (evt) => {
    if (evt && evt.data) {
      // Add the chunk to the buffer// Increase the debug counter for received data
      totalReceivedData.current += evt.data.length;
      // Add the chunk to the buffer
      audioDataBuffer.current = [...audioDataBuffer.current, ...evt.data];
    }
  };

  // Recording Initialization
  useEffect(() => {
    window.addEventListener(
      'audioinput',
      onAudioInput, true,
    );
    switch (window.device.platform.toLowerCase()) {
      case 'android': {
        recordPath.current = window.cordova.file.dataDirectory;
        break;
      }
      case 'ios': {
        recordPath.current = window.cordova.file.documentsDirectory;
        break;
      }
      default: {
        recordPath.current = `${window.cordova.file.cacheDirectory}/`;
      }
    }
    return function cleanup() {
      window.removeEventListener('audioinput', onAudioInput);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const play = () => {
    if (!playing) {
      const spawnTime = Tone.now() + 0.15;
      playerListRef.current.forEach((player) => {
        player.player.start(spawnTime, video.currentTime);
      });
      window.setTimeout(() => {
        video.play();
      }, Tone.now() - spawnTime);
      setPlaying(true);
    } else {
      playerListRef.current.forEach((player) => {
        player.player.stop();
      });
      video.pause();
      if (recording) {
        stopRecording();
      }
      setPlaying(false);
    }
  };

  const seekTo = (value) => {
    let newValue = value;
    if (newValue === trackLength) {
      newValue = 0;
    }
    setAlong(parseFloat(newValue, 10));
    video.pause();
    video.currentTime = newValue;
    if (playing) {
      const spawnTime = Tone.now() + 0.15;
      playerListRef.current.forEach((player) => {
        player.player.start(spawnTime, video.currentTime);
      });
      window.setTimeout(() => {
        video.play();
      }, Tone.now() - spawnTime);
    }
  };

  const setPlaybackRate = (newRate) => {
    const value = newRate / 100;
    playerListRef.current.forEach((player) => {
      player.player.playbackRate = value;
    });
    video.playbackRate = value;
    setRate(newRate);
  };

  const setPitch = (value) => {
    setTrackPitch(value);
    playerListRef.current.forEach((player) => {
      player.pitcher.pitch = value + player.hertz;
      player.pitch = value;
    });
  };

  const setHertz = (value) => {
    const newValue = (value - hertzBase) * 4 / 100;
    playerListRef.current.forEach((player) => {
      player.pitcher.pitch = newValue + player.pitch;
      player.hertz = newValue;
    });
    setHertzValue(value);
  };

  const playRecording = (url) => {
    setChosenAudio('');
    setChosenAudio(url);
  };

  useEffect(() => {
    if (chosenAudio.length > 0) {
      const newAudio = document.querySelector('#audioToPlay');
      if (newAudio) {
        newAudio.crossOrigin = 'anonymous';
        newAudio.pause();
        newAudio.load();
        newAudio.play();
      }
    }
  }, [chosenAudio]);

  const startRecording = () => {
    const startCapture = () => {
      recordName.current = (new Date()).toISOString();
      const record = () => {
        try {
          audioDataBuffer.current = [];
          totalReceivedData.current = 0;
          window.audioinput.start({
          });
          setRecording(true);
        } catch (err) {
          console.log(err);
        }
      };
      record();
      // We get FS & just to make sure no such file exist
      // (which shouldn't, but also if recordName is no longer timestamp)
      window.resolveLocalFileSystemURL(recordPath.current, (dir) => {
        const filename = `${recordName.current}.wav`;
        dir.getFile(filename, { create: false }, (recordedFile) => {
          if (recordedFile) {
            recordedFile.remove(() => record(), (err) => console.log(err));
          } else {
            record();
          }
        }, record());
      });
    };

    window.audioinput.initialize(
      null, () => {
        window.audioinput.checkMicrophonePermission(
          (hasPermission) => {
            if (hasPermission) {
              startCapture();
            } else {
              window.audioinput.getMicrophonePermission(
                (hasPermission, message) => {
                  if (hasPermission) {
                    startCapture();
                  } else {
                    alert('Das Mikrofon muss erlaubt sein, um Aufnahmen tätigen zu können.');
                  }
                },
              );
            }
          },
        );
      },
    );
  };

  const stopRecording = () => {
    window.audioinput.stop();
    const encoder = new WavAudioEncoder(window.audioinput.getCfg().sampleRate, window.audioinput.getCfg().channels);
    encoder.encode([audioDataBuffer.current]);
    const blob = encoder.finish('audio/wav');
    const reader = new window.FileReader();
    reader.onload = function (evt) {
      setRecording(false);
      loadRecording(recordName.current, evt.target.result);

      recordName.current = '';
      audioDataBuffer.current = [];
    };
    reader.readAsDataURL(blob);
  };

  function renderMixer() {
    return (
      <TabContent>
        {playerType === playerTypes.KORREPETITION
          ? (
            <Crossfader
              crossfadeValue={crossFadeValue}
              nameFirst={spurNamen[0]}
              nameSecond={spurNamen[1]}
              setCrossfade={setCrossfade}
            />
          )
          : playerList.map((gain, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="slider-container band" key={`spur-${i}`}>
              <TrackItem
                playSoloFunc={(wasSolo) => playSolo(i)}
                setTrackItem={(volume) => setVolume(volume, gain, i)}
                name={spurNamen[i]}
                trackItemValue={parseFloat(gain.gainValue, 10)}
                trackItemValuePrev={parseFloat(gain.prevGain, 10)}
                isSolo={gain.isSolo}
                isMuted={gain.muted}
              />
            </div>
          ))}
      </TabContent>
    );
  }

  function renderTempoAndTune() {
    return (
      <TabContent>
        <PlaybackRate
          setPlaybackRate={setPlaybackRate}
          playbackRate={rate}
        />
        <HertzShift
          setHertz={setHertz}
          hertz={hertz}
          upper={hertzBase + 4}
          lower={hertzBase - 4}
        />
        <PitchShift
          setPitch={setPitch}
          pitch={pitch}
        />
      </TabContent>
    );
  }

  function renderMore() {
    return (
      <TabContent>
        {recordingsList.map((record, index) => (
          <RecordFile
            // eslint-disable-next-line react/no-array-index-key
            key={`recording_${index}`}
            title={`Aufnahme vom ${record.date}`}
            onClickHandler={() => playRecording(record.path)}
            description={(
              <div>
                <span>
                  Uhrzeit:
                  {record.time}
                </span>
                <br />
                <span>
                  Länge:
                  {record.size}
                </span>
              </div>
            )}
          />
        ))}
        <div id="audiofiles" style={{ display: 'none' }}>
          {chosenAudio
            && (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <audio
              crossOrigin="anonymous"
              controls
              id="audioToPlay"
            >
              <source src={chosenAudio} type="audio/wav" />
            </audio>
            )}

        </div>
      </TabContent>
    );
  }

  function renderPlayerTab() {
    switch (activeTab) {
      case 'MIXER':
        return renderMixer();
      case 'TEMPO & TUNE':
        return renderTempoAndTune();
      case 'MORE':
        return renderMore();
      default:
        return null;
    }
  }

  const toggleFullscreen = () => {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
  };

  return (
    <div>
      <div>
        <VideoAudio>
          {videoSource
            ? (
              <video
                id="video"
                muted
                style={{
                  width: '100%',
                  margin: '0 auto',
                }}
                preload="auto"
                playsInline
                src={videoSource}
                type="video/mp4"
              />
            )
            : (
              <>
                <CoverDisplay path={coverPath} />
                <audio
                  style={{ opacity: 0 }}
                  id="audio"
                  muted
                  src={trackList[0]}
                />
              </>
            )}
        </VideoAudio>
        {!videoloading && !loading
          ? (
            <MediaControls>
              <SeekBarRow>
                <CurrentTime
                  currentTime={along}
                />
                <SeekBar
                  playPause={play}
                  isPlaying={playing}
                  duration={trackLength}
                  currentTime={along}
                  seekTo={seekTo}
                  className="seekBar"
                />
                <Duration
                  duration={trackLength}
                />
                <div className="fullscreenIcon">
                  {videoSource && (
                  <IconButton
                    disabled
                    icon={FullScreenIcon}
                    onClickHandler={toggleFullscreen}
                  />
                  )}
                </div>
              </SeekBarRow>
              <PlayBtnRow>
                <SkipBackButton icon={SkipBackIcon} onClickHandler={() => { seekTo(0); }} />
                <PlayPause isPlaying={playing} playPause={play} />
                <RecordButton
                  disabled={!playing || window.device.platform.toLowerCase() === 'browser'}
                  className={recording ? 'blinking' : ''}
                  icon={RecordIcon}
                  opacityOnDisabled
                  onClickHandler={() => {
                    if (recording) stopRecording();
                    else startRecording();
                  }}
                />
              </PlayBtnRow>
              <TabNav className="heading bold">
                <PlayerNavItem activeTab={activeTab} setActiveTab={setActiveTab} tabName="MIXER" />
                <PlayerNavItem activeTab={activeTab} setActiveTab={setActiveTab} tabName="TEMPO & TUNE" />
                <PlayerNavItem activeTab={activeTab} setActiveTab={setActiveTab} tabName="MORE" />
              </TabNav>
              {renderPlayerTab()}
            </MediaControls>
          )
          : <LoadingIndicator />}
      </div>
    </div>
  );
};

TonePlayer.propTypes = {
  trackList: PropTypes.arrayOf(PropTypes.string).isRequired,
  videoSource: PropTypes.string,
  spurNamen: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerType: PropTypes.number.isRequired,
  hertzBase: PropTypes.number,
  coverPath: PropTypes.string,
};
TonePlayer.defaultProps = {
  videoSource: null,
  hertzBase: 442,
  coverPath: null,
};

export default TonePlayer;
