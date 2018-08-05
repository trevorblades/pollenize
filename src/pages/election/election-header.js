import AppsIcon from '@material-ui/icons/Apps';
import ElectionDrawer from './election-drawer';
import Header, {HEADER_LOGO_SIZE} from '../../components/header';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import arrayToSentence from 'array-to-sentence';
import compose from 'recompose/compose';
import map from 'lodash/map';
import styled from 'react-emotion';
import theme from '../../theme';
import withProps from 'recompose/withProps';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getLocalize} from '../../selectors';
import {size} from 'polished';

const TitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 auto'
});

const Title = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  fontWeight: theme.typography.fontWeightMedium
});

const Flag = styled.img({
  height: theme.spacing.unit * 2,
  marginRight: theme.spacing.unit
});

const Subtitle = styled(Typography)({
  color: theme.palette.grey[300]
});

const CssHidden = withProps({
  implementation: 'css'
})(Hidden);

const menuButtonSize = theme.spacing.unit * 6;
const MenuButton = withProps({color: 'inherit'})(
  styled(IconButton)(size(menuButtonSize), {
    margin: (HEADER_LOGO_SIZE - menuButtonSize) / 2
  })
);

class ElectionHeader extends Component {
  static propTypes = {
    basePath: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    election: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    localize: PropTypes.func.isRequired
  };

  state = {
    drawerOpen: false
  };

  onMenuClick = event => {
    event.currentTarget.blur();
    this.setState({drawerOpen: true});
  };

  closeDrawer = () => this.setState({drawerOpen: false});

  renderSubtitle() {
    if (!this.props.election.partners.length) {
      return null;
    }

    const partners = map(this.props.election.partners, 'name');
    return (
      <Subtitle variant="caption">
        {this.props.localize('In partnership with')}{' '}
        {arrayToSentence(partners, {
          lastSeparator: this.props.localize('and')
        })}
      </Subtitle>
    );
  }

  render() {
    return (
      <Header dark simple logoHref={null}>
        <TitleContainer>
          <Title color="inherit" variant="subheading">
            <Flag src={this.props.election.flag} />
            {this.props.children}
          </Title>
          {/* {this.renderSubtitle()} */}
        </TitleContainer>
        <CssHidden xsDown>
          <MenuButton onClick={this.onMenuClick}>
            <MenuIcon />
          </MenuButton>
          <ElectionDrawer
            basePath={this.props.basePath}
            open={this.state.drawerOpen}
            onClose={this.closeDrawer}
          />
        </CssHidden>
        <CssHidden smUp>
          <MenuButton
            disabled={this.props.basePath === this.props.location.pathname}
            component={Link}
            to={this.props.basePath}
          >
            <AppsIcon />
          </MenuButton>
        </CssHidden>
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  election: state.election.data,
  localize: getLocalize(state)
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ElectionHeader);
