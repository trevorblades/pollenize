import CanadaFlag from '../../../assets/flags/canada.svg';
import ElectionDrawer from './election-drawer';
import Header, {HEADER_LOGO_SIZE} from '../../../components/header';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'react-emotion';
import theme from '../../../theme';
import withProps from 'recompose/withProps';
import {connect} from 'react-redux';
import {size} from 'polished';

const Title = withProps({
  color: 'inherit',
  variant: 'subheading'
})(
  styled(Typography)({
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
    fontWeight: theme.typography.fontWeightMedium
  })
);

const StyledCanadaFlag = styled(CanadaFlag)({
  height: theme.spacing.unit * 2,
  marginRight: theme.spacing.unit
});

const menuButtonSize = theme.spacing.unit * 6;
const MenuButton = styled(IconButton)(size(menuButtonSize), {
  margin: (HEADER_LOGO_SIZE - menuButtonSize) / 2
});

class ElectionHeader extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  state = {
    drawerOpen: false
  };

  onMenuClick = event => {
    event.currentTarget.blur();
    this.setState({drawerOpen: true});
  };

  closeDrawer = () => this.setState({drawerOpen: false});

  render() {
    return (
      <Header dark simple logoHref="/elections">
        <Title>
          <StyledCanadaFlag />
          {this.props.children}
        </Title>
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
  editMode: state.settings.editMode,
  election: state.election.data,
  user: state.user.data
});

export default connect(mapStateToProps)(ElectionHeader);
