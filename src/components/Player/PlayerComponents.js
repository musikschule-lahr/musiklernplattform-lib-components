import styled from 'styled-components';
import {
  IconButton,
} from 'musiklernplattform-components';

export const SkipBackButton = styled(IconButton)`
  font-size: 36px;
  @media only screen and (max-width: 600px) {
    font-size: 24px;
  }
`;

export const RecordButton = styled(IconButton)`
  font-size: 40px;
  @media only screen and (max-width: 600px) {
    font-size: 30px;
  }
`;

export const VideoAudio = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

export const SeekBarRow = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width:100%;
  padding: 18px 0 0 18px;
  box-sizing: border-box;
  time {
    margin: 0 18px;
    width: 38px;
  }
  .seekBar{
    min-width: 120px !important;
    display:flex;
  }
  .fullscreenIcon{
    width: 24px;
    min-width: 24px;
    margin-right: 18px;
  }
`;

export const PlayBtnRow = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width:100%;
  padding: 36px 0;
`;

export const MediaControls = styled('div')`
  margin: 0 auto;
  width:100%;
  text-align: center;

  .heading {
    background-color: transparent;
    border-top: 1px solid #A4A4A4;
    border-bottom: 1px solid #A4A4A4;
    font-size: 18px;
  }

  @media only screen and (max-width: 600px) {
    .heading {
      font-size: 13px;
    }
  }
  .bold{
    font-weight: bold;
  }
  .player-tabnav-active{
    color: rgba(10,132,255,1);
  }
`;

export const TabContent = styled('div')`
  min-height: 152px;
  margin-bottom: 32px;
  .recordings {
    display: flex;
    flex-direction: column;
  }
  .recordings > .recordings-list {
    display: flex;
    flex-direction: row;
    width: 100%;
    overflow-x: scroll;
    margin: 0 16px;
    border-top: 1px solid #A4A4A4;
  }
  .recordings > .recordings-list > div {
    flex-grow: 1;
  }
  .slider{
    display: flex;
  }
  .slider-container{
    width:100%;
    padding: 18px 0;
    min-height: 114px;
    border-bottom: 1px solid #A4A4A4;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap:wrap;
  }
  .slider-container.band{
    min-height: 26px;
  }
  .slider-knob {
    font-size: 12px;
    opacity: .5;
  }
  .slider-row{
    display:flex;
    align-items: center;
    max-width: 100%;
    flex: 1 0 100%;
  }
  .slider-row .slider{
    margin: 18px auto !important;
    width: 50% !important;
    flex-grow: 2;

  }
  .slider-label{
    font-size: 18px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .slider-lower-label{
    margin-left: auto !important;
    padding-left: 18px;
    padding-right: 18px;
    text-align: right;
    flex-grow: 1;
    width:15%;
    max-width:15%;
    font-weight: bold;
  }
  .track-item-btns{
    flex-grow: 1;
    display: flex;
    justify-content: end;
    width:15%;
    padding-right: 18px;
    padding-left: 18px;
  }
  .track-item-btn{
    height: 32px !important;
    width: 32px !important;
    min-width: 32px !important;
    padding: 0;
    margin: 0 6.5px;
    color: white;
  }
  .track-item-btn:focus { outline: none !important; }
  .track-item-btn.active{
    background-color: orange;
  }
  .track-item-solo-btn.active{
    background-color: rgba(10,132,255,1);
  }
  @media only screen and (max-width: 960px) {
    .slider-label{
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 600px) {
    .track-item-btns{
      flex-direction:column;
      align-items: center;
    }
    .track-item-btn{
      margin: 6.5px 0;
    }
    .slider-label{
      font-size: 9px;
    }
  }
  .slider-upper-label{
    text-align: left;
    padding-right: 18px;
    padding-left: 18px;
    margin-right: auto !important;
    flex-grow: 1;
    width:15%;
    max-width:15%;
    font-weight: bold;
  }
  .slider-upper-label.band{
    text-transform: uppercase;
    font-weight: bold;
  }
  .blinking {
    animation: blinker 1s linear infinite;
  }
  @keyframes blinker {
    50% {
      opacity: 0.3;
    }
  }
`;

export default {
  SkipBackButton, RecordButton, VideoAudio, SeekBarRow, PlayBtnRow, MediaControls, TabContent,
};
