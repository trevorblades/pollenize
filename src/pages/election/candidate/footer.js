import CivixQuebecLogo from '../../../assets/logos/civix-quebec.svg';
import ImpactCampusLogo from '../../../assets/logos/impact-campus.svg';
import LavalLogo from '../../../assets/logos/laval.svg';
import LogoWithWordmark from '../../../components/logo-with-wordmark';
import PropTypes from 'prop-types';
import React from 'react';
import Section from '../../../components/section';
import Typography from '@material-ui/core/Typography';
import styled, {css} from 'react-emotion';
import theme from '../../../theme';
import defaultProps from 'recompose/defaultProps';
import withProps from 'recompose/withProps';
import {connect} from 'react-redux';
import {footerClassName} from '../../../components/footer';
import {getLocalize} from '../../../selectors';
import {size} from 'polished';

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

const logoClassName = css({
  display: 'block',
  fill: 'currentColor'
});

const StyledImpactCampusLogo = styled(ImpactCampusLogo)(logoClassName, {
  height: 100,
  marginBottom: theme.spacing.unit * 3
});

const Logos = styled.div({
  display: 'flex',
  alignItems: 'center',
  height: 48
});

const TargetBlankAnchor = defaultProps({
  target: '_blank',
  rel: 'noopener noreferrer'
})('a');

const StyledAnchor = styled(TargetBlankAnchor)({
  maxWidth: 120,
  maxHeight: 48,
  svg: css(size('100%'), logoClassName)
});

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
      <StyledImpactCampusLogo />
      <Text gutterBottom>{props.localize('In partnership with')}</Text>
      <Logos>
        <StyledAnchor href="https://civix.quebec" title="CIVIX-Québec">
          <CivixQuebecLogo />
        </StyledAnchor>
        <X />
        <TargetBlankAnchor href="https://pollenize.org">
          <LogoWithWordmark height={32} />
        </TargetBlankAnchor>
        <X />
        <StyledAnchor href="https://ulaval.ca" title="Université Laval">
          <LavalLogo />
        </StyledAnchor>
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
