import React from 'react';
import PropTypes from 'prop-types';

const CoverDisplay = ({ path, className }) => (
  <img className={className} style={{ width: '45vw', maxWidth: 250, height: 'auto' }} alt="Kein Cover" src={path} />
);

CoverDisplay.propTypes = {
  path: PropTypes.string.isRequired,
  className: PropTypes.string,
};
CoverDisplay.defaultProps = {
  className: '',
};
export default CoverDisplay;
