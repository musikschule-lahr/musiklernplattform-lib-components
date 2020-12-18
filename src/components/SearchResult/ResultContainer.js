import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ResultHeading = styled.h3`
  width:100%;
  border-bottom: 1px solid rgb(41,41,41);
  display: inline-flex;
  list-style: none;
  flex-direction: row;
`;
const ResultList = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
  display: inline-flex;
  list-style: none;
  flex-direction: row;

`;
const ResultItem = styled.li`
  padding: 0 16px;
  &:nth-child(1){
    padding: 0;
  }
  color: white;
  font-size: 1rem;
  .libitem-heading{
    font-weight: bold;
  }
  .libitem-sub{
    color: rgba(255,255,255,.7);
  }
`;

const ResultContainer = ({
  heading, libElements, onElementClickHandler, style, className,
}) => (
  <div style={style} className={className}>
    <ResultHeading>{heading}</ResultHeading>
    <ResultList>
      {libElements.map((libElement) => (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
        <ResultItem
          onClick={() => { onElementClickHandler(libElement); }}
          key={libElement.idLibElement}
        >
          <span className="libitem-heading">{libElement.metaData.shortTitle}</span>
          <br />
          <span className="libitem-sub">
            {' '}
            {libElement.metaData.composer}
          </span>
        </ResultItem>
      ))}
    </ResultList>
  </div>
);

ResultContainer.propTypes = {
  heading: PropTypes.string,
  libElements: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      title: PropTypes.string,
      composer: PropTypes.string,
    }),
  ),
  onElementClickHandler: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  className: PropTypes.string,
};

ResultContainer.defaultProps = {
  heading: '',
  libElements: [],
  onElementClickHandler: () => console.log('element clicked'),
  style: {},
  className: '',
};

export default ResultContainer;
