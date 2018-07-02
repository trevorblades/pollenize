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
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  })
);

const breakpoint = theme.breakpoints.down('sm');
const Colophon = styled.div({
  [breakpoint]: {
    width: '100%',
    marginBottom: theme.spacing.unit * 2
  }
});

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

const logoSize = theme.spacing.unit * 3;
const logoClassName = css(baseIconClassName, size(logoSize));
const BlankTargetAnchor = defaultProps({
  target: '_blank',
  rel: 'noopener noreferrer'
})(StyledAnchor);

const emailIconSize = theme.spacing.unit * 2.5;
const StyledEmailIcon = styled(EmailIcon)(
  baseIconClassName,
  size(emailIconSize),
  {margin: (logoSize - emailIconSize) / 2}
);

const NavigationContainer = styled.div({
  marginLeft: 'auto',
  marginRight: theme.spacing.unit * 2,
  [breakpoint]: {
    flexGrow: 1
  }
});

const StyledNavigation = styled(Navigation)({
  flexDirection: 'column',
  alignItems: 'flex-start',
  margin: 0,
  'a:not(:last-child)': {
    marginRight: 0
  }
});

const date = new Date();
const year = date.getFullYear();
const mailto = 'mailto:info@pollenize.org';

const navs = {
  'Main menu': undefined,
  'The organization': {
    'Our team': '/team',
    'Contact us': mailto,
    Donate: '/donate',
    Shop: '/shop'
  },
  Contribute: {
    'Be an editor': '/editors',
    'Log in': '/login',
    GitHub: {
      component: 'a',
      href: 'https://github.com/pollenize',
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  }
};

const socialMediaAccounts = {
  Twitter: {
    url: 'https://twitter.com/pollenizeorg',
    logo: TwitterLogo
  },
  Instagram: {
    url: 'https://instagram.com/pollenize',
    logo: InstagramLogo
  },
  Facebook: {
    url: 'https://facebook.com/pollenize',
    logo: FacebookLogo
  },
  YouTube: {
    url: 'https://youtube.com/pollenizeorg',
    logo: YouTubeLogo
  }
};

const navKeys = Object.keys(navs);
const socialMediaAccountKeys = Object.keys(socialMediaAccounts);

const Footer = () => (
  <Container>
    <InnerContainer>
      <Colophon>
        <StyledLogo />
        <Typography gutterBottom color="inherit">
          &copy; {year} Really Awesome Doings
        </Typography>
        <Icons>
          {socialMediaAccountKeys.map(key => {
            const {url, logo} = socialMediaAccounts[key];
            return (
              <BlankTargetAnchor
                key={key}
                href={url}
                title={`Pollenize on ${key}`}
              >
                {React.createElement(logo, {className: logoClassName})}
              </BlankTargetAnchor>
            );
          })}
          <StyledAnchor href={mailto}>
            <StyledEmailIcon />
          </StyledAnchor>
        </Icons>
      </Colophon>
      {navKeys.map(key => {
        const items = navs[key];
        return (
          <NavigationContainer key={key}>
            {items ? <StyledNavigation items={items} /> : <StyledNavigation />}
          </NavigationContainer>
        );
      })}
    </InnerContainer>
  </Container>
);

export default Footer;
