import ButtonBase from '@material-ui/core/ButtonBase';
import EmailIcon from '@material-ui/icons/Email';
import InviteButton from './invite-button';
import LoginButton from './login-button';
import Logo from '../../assets/logo.svg';
import Navigation from '../navigation';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Section from '../section';
import Typography from '@material-ui/core/Typography';
import defaultProps from 'recompose/defaultProps';
import styled, {css} from 'react-emotion';
import theme from '../../theme';
import withProps from 'recompose/withProps';
import {FaFacebook, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa';
import {connect} from 'react-redux';
import {logOut} from '../../actions/user';
import {size} from 'polished';

export const footerClassName = css({
  color: theme.palette.grey[500],
  backgroundColor: theme.palette.grey[100]
});

const Container = styled.footer(footerClassName, {marginTop: 'auto'});
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

const iconSize = theme.spacing.unit * 2.5;
const iconClassName = css(baseIconClassName, size(iconSize), {
  margin: theme.spacing.unit / 4
});
const BlankTargetAnchor = defaultProps({
  target: '_blank',
  rel: 'noopener noreferrer'
})(StyledAnchor);

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

const socialMediaAccounts = {
  Twitter: {
    url: 'https://twitter.com/pollenizeorg',
    logo: FaTwitter
  },
  Instagram: {
    url: 'https://instagram.com/pollenize',
    logo: FaInstagram
  },
  Facebook: {
    url: 'https://facebook.com/pollenize',
    logo: FaFacebook
  },
  YouTube: {
    url: 'https://youtube.com/pollenizeorg',
    logo: FaYoutube
  }
};

const date = new Date();
const year = date.getFullYear();
const mailto = 'mailto:info@pollenize.org';

class Footer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  logOut = () => this.props.dispatch(logOut());

  renderNavigation(heading, items) {
    return (
      <NavigationContainer>
        <Typography gutterBottom color="primary" variant="caption">
          {heading}
        </Typography>
        {items ? <StyledNavigation items={items} /> : <StyledNavigation />}
      </NavigationContainer>
    );
  }

  render() {
    const contributeNav = {
      GitHub: {
        component: 'a',
        href: 'https://github.com/pollenize',
        target: '_blank',
        rel: 'noopener noreferrer'
      },
      'Be an editor': '/editors'
    };

    if (this.props.user) {
      if (this.props.user.organization_id === 1) {
        contributeNav['Invite a user'] = {
          component: InviteButton
        };
      }

      contributeNav['Log out'] = {
        component: ButtonBase,
        onClick: this.logOut
      };
    } else {
      contributeNav['Log in'] = {component: LoginButton};
    }

    return (
      <Container>
        <InnerContainer>
          <Colophon>
            <StyledLogo />
            <Typography gutterBottom color="inherit">
              &copy; {year} Really Awesome Doings
            </Typography>
            <Icons>
              {Object.keys(socialMediaAccounts).map(key => {
                const {url, logo} = socialMediaAccounts[key];
                return (
                  <BlankTargetAnchor
                    key={key}
                    href={url}
                    title={`Pollenize on ${key}`}
                  >
                    {React.createElement(logo, {className: iconClassName})}
                  </BlankTargetAnchor>
                );
              })}
              <StyledAnchor href={mailto}>
                <EmailIcon className={iconClassName} />
              </StyledAnchor>
            </Icons>
          </Colophon>
          {this.renderNavigation('Main menu')}
          {this.renderNavigation('The organization', {
            'Our team': '/team',
            'Contact us': {
              component: 'a',
              href: mailto
            },
            Donate: '/#donate',
            Shop: '/shop'
          })}
          {this.renderNavigation('Contribute', contributeNav)}
        </InnerContainer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data
});

export default connect(mapStateToProps)(Footer);
