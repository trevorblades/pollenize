import CanadaFlag from '../../../assets/flags/canada.svg';
import ElectionDrawer from './election-drawer';
import Header, {HEADER_LOGO_SIZE} from '../../../components/header';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import arrayToSentence from 'array-to-sentence';
import map from 'lodash/map';
import styled from 'react-emotion';
import theme from '../../../theme';
import withProps from 'recompose/withProps';
import {connect} from 'react-redux';
import {getLocalize} from '../../../selectors';
import {size} from 'polished';

const TitleContainer = styled.div({
  margin: '0 auto',
  textAlign: 'center'
});

const Title = withProps({
  color: 'inherit',
  variant: 'subheading'
})(
  styled(Typography)({
    display: 'flex',
    alignItems: 'center',
    fontWeight: theme.typography.fontWeightMedium
  })
);

const StyledCanadaFlag = styled(CanadaFlag)({
  height: theme.spacing.unit * 2,
  marginRight: theme.spacing.unit
});

const Subtitle = withProps({variant: 'caption'})(
  styled(Typography)({
    color: theme.palette.grey[300]
  })
);

const menuButtonSize = theme.spacing.unit * 6;
const MenuButton = styled(IconButton)(size(menuButtonSize), {
  margin: (HEADER_LOGO_SIZE - menuButtonSize) / 2
});

class ElectionHeader extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    election: PropTypes.object.isRequired,
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
      <Subtitle>
        {this.props.localize('Presented by {{partners}}', {
          partners: arrayToSentence(partners, {
            lastSeparator: this.props.localize('and')
          })
        })}
      </Subtitle>
    );
  }

  render() {
    return (
      <Header dark simple logoHref="/elections">
        <TitleContainer>
          <Title>
            <StyledCanadaFlag />
            {this.props.children}
          </Title>
          {this.renderSubtitle()}
        </TitleContainer>
        <MenuButton color="inherit" onClick={this.onMenuClick}>
          <MenuIcon />
        </MenuButton>
        <ElectionDrawer
          open={this.state.drawerOpen}
          onClose={this.closeDrawer}
        />
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  election: state.election.data,
  localize: getLocalize(state)
});

export default connect(mapStateToProps)(ElectionHeader);
