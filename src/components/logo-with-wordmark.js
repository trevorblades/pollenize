import Logo from '../assets/logo.svg';
import PropTypes from 'prop-types';
import React from 'react';
import Wordmark from '../assets/wordmark.svg';
import styled from 'react-emotion';

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  maxWidth: '100%',
  maxHeight: '100%',

  svg: {
    flexShrink: 0,
    fill: 'currentColor'
  }
});

const StyledLogo = styled(Logo)({height: '100%'});
const StyledWordmark = styled(Wordmark)({
  height: `${(1 / 1.875) * 100}%`,
  marginLeft: '0.4em'
});

const LogoWithWordmark = props => (
  <Container
    style={{
      height: props.height,
      fontSize: props.height
    }}
  >
    <StyledLogo />
    {!props.simple && <StyledWordmark />}
  </Container>
);

LogoWithWordmark.propTypes = {
  height: PropTypes.number.isRequired,
  simple: PropTypes.bool
};

export default LogoWithWordmark;
