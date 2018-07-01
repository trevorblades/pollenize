import Logo from '../assets/logo.svg';
import React from 'react';
import Section from './section';
import TwitterLogo from '../assets/logos/twitter.svg';
import InstagramLogo from '../assets/logos/instagram.svg';
import FacebookLogo from '../assets/logos/facebook.svg';
import Typography from '@material-ui/core/Typography';
import styled, {css} from 'react-emotion';
import theme from '../theme';
import withProps from 'recompose/withProps';
import {size} from 'polished';

const Container = styled.footer({
  color: theme.palette.grey[500],
  backgroundColor: theme.palette.grey[100]
});

const baseIconClassName = css({
  display: 'block',
  fill: 'currentColor'
});

const StyledLogo = styled(Logo)(
  baseIconClassName,
  size(theme.spacing.unit * 5),
  {marginBottom: theme.spacing.unit * 1.5}
);

const Icons = styled.div({
  display: 'flex'
});

const StyledAnchor = withProps({
  target: '_blank',
  rel: 'noopener noreferrer'
})(
  styled.a({
    ':not(:last-child)': {
      marginRight: theme.spacing.unit
    },
    svg: css(baseIconClassName, size(24))
  })
);

const date = new Date();
const year = date.getFullYear();
const Footer = () => (
  <Container>
    <Section>
      <StyledLogo />
      <Typography gutterBottom color="inherit">
        &copy; {year} Really Awesome Doings
      </Typography>
      <Icons>
        <StyledAnchor href="https://twitter.com/pollenizeorg">
          <TwitterLogo />
        </StyledAnchor>
        <StyledAnchor href="https://instagram.com/pollenize">
          <InstagramLogo />
        </StyledAnchor>
        <StyledAnchor href="https://facebook.com/pollenize">
          <FacebookLogo />
        </StyledAnchor>
      </Icons>
    </Section>
  </Container>
);

export default Footer;
