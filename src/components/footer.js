import EmailIcon from '@material-ui/icons/Email';
import Logo from '../assets/logo.svg';
import Navigation from './navigation';
import React from 'react';
import Section from './section';
import TwitterLogo from '../assets/logos/twitter.svg';
import InstagramLogo from '../assets/logos/instagram.svg';
import FacebookLogo from '../assets/logos/facebook.svg';
import YouTubeLogo from '../assets/logos/youtube.svg';
import Typography from '@material-ui/core/Typography';
import defaultProps from 'recompose/defaultProps';
import styled, {css} from 'react-emotion';
import theme from '../theme';
import withProps from 'recompose/withProps';
import {size} from 'polished';

const Container = styled.footer({
  color: theme.palette.grey[500],
  backgroundColor: theme.palette.grey[100]
});

const InnerContainer = withProps({centered: true})(
  styled(Section)({
    display: 'flex',
    alignItems: 'flex-start'
  })
);

const baseIconClassName = css({
  display: 'block',
  fill: 'currentColor'
});

const StyledLogo = styled(Logo)(
  baseIconClassName,
  size(theme.spacing.unit * 4),
  {marginBottom: theme.spacing.unit * 1.5}
);

const Icons = styled.div({
  display: 'flex'
});

const StyledAnchor = styled.a({
  ':not(:last-child)': {
    marginRight: theme.spacing.unit
  }
});

const BlankTargetAnchor = defaultProps({
  target: '_blank',
  rel: 'noopener noreferrer'
})(StyledAnchor);

const logoSize = theme.spacing.unit * 3;
const logoClassName = css(baseIconClassName, size(logoSize));

const emailIconSize = theme.spacing.unit * 2.5;
const StyledEmailIcon = styled(EmailIcon)(
  baseIconClassName,
  size(emailIconSize),
  {margin: (logoSize - emailIconSize) / 2}
);

const date = new Date();
const year = date.getFullYear();
const Footer = () => (
  <Container>
    <InnerContainer>
      <div>
        <StyledLogo />
        <Typography gutterBottom color="inherit">
          &copy; {year} Really Awesome Doings
        </Typography>
        <Icons>
          <BlankTargetAnchor href="https://twitter.com/pollenizeorg">
            <TwitterLogo className={logoClassName} />
          </BlankTargetAnchor>
          <BlankTargetAnchor href="https://instagram.com/pollenize">
            <InstagramLogo className={logoClassName} />
          </BlankTargetAnchor>
          <BlankTargetAnchor href="https://facebook.com/pollenize">
            <FacebookLogo className={logoClassName} />
          </BlankTargetAnchor>
          <BlankTargetAnchor href="https://youtube.com/pollenizeorg">
            <YouTubeLogo className={logoClassName} />
          </BlankTargetAnchor>
          <StyledAnchor href="mailto:info@pollenize.org">
            <StyledEmailIcon />
          </StyledAnchor>
        </Icons>
      </div>
      <Navigation />
    </InnerContainer>
  </Container>
);

export default Footer;
