import CivixQuebecLogo from '../../../assets/logos/civix-quebec.svg';
import ImpactCampusLogo from '../../../assets/logos/impact-campus.svg';
import LavalLogo from '../../../assets/logos/laval.svg';
import LogoWithWordmark from '../../../components/logo-with-wordmark';
import PropTypes from 'prop-types';
import React from 'react';
import Section from '../../../components/section';
import Typography from '@material-ui/core/Typography';
import defaultProps from 'recompose/defaultProps';
import styled, {css} from 'react-emotion';
import theme from '../../../theme';
import withProps from 'recompose/withProps';
import {connect} from 'react-redux';
import {footerClassName} from '../../../components/footer';
import {getLocalize} from '../../../selectors';

const Container = styled.footer(footerClassName);
const InnerContainer = styled(Section)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const Text = withProps({
  color: 'inherit',
  variant: 'subheading'
})(Typography);

const StyledImpactCampusLogo = styled(ImpactCampusLogo)({
  display: 'block',
  height: 100,
  marginBottom: theme.spacing.unit * 3,
  fill: 'currentColor'
});

const Logos = styled.div({
  display: 'flex',
  alignItems: 'center'
});

const logoClassName = css({
  fill: 'currentColor',
  width: 120
});

const TargetBlankAnchor = defaultProps({
  target: '_blank',
  rel: 'noopener noreferrer'
})('a');

const X = withProps({
  children: 'x'
})(
  styled(Text)({
    margin: `0 ${theme.spacing.unit * 3}px`
  })
);

const Footer = props => (
  <Container>
    <InnerContainer centered>
      <Text gutterBottom>{props.localize('A project by')}</Text>
      <TargetBlankAnchor href="http://impactcampus.ca" title="Impact Campus">
        <StyledImpactCampusLogo />
      </TargetBlankAnchor>
      <Text gutterBottom>{props.localize('In partnership with')}</Text>
      <Logos>
        <TargetBlankAnchor href="https://civix.quebec" title="CIVIX Québec">
          <CivixQuebecLogo className={logoClassName} />
        </TargetBlankAnchor>
        <X />
        <TargetBlankAnchor href="https://pollenize.org" title="Pollenize">
          <LogoWithWordmark height={32} />
        </TargetBlankAnchor>
        <X />
        <TargetBlankAnchor href="https://ulaval.ca" title="Université Laval">
          <LavalLogo className={logoClassName} />
        </TargetBlankAnchor>
      </Logos>
    </InnerContainer>
  </Container>
);

Footer.propTypes = {
  localize: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  localize: getLocalize(state)
});

export default connect(mapStateToProps)(Footer);
