export const formatTime = (time) => {
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60) - (hours * 60);
  const seconds = Math.floor(time % 60);
  const formatted = `${hours !== 0 ? (`${hours.toString().padStart(2, '0')}:`) : ''}
    ${`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}`;
  return formatted;
};

export default { formatTime };
