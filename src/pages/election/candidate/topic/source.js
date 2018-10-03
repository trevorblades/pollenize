import PropTypes from 'prop-types';
import React from 'react';
import styled from 'react-emotion';

const Superscript = styled.sup({lineHeight: 1});
const Source = props => (
  <Superscript>
    [<a href="#sources">{props.source.index + 1}</a>]
  </Superscript>
);

Source.propTypes = {
  source: PropTypes.object.isRequired
};

export default Source;
