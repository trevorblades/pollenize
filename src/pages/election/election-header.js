import Header, {HEADER_LOGO_SIZE} from '../../components/header';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'react-emotion';
import theme from '../../theme';
import withProps from 'recompose/withProps';
import {connect} from 'react-redux';
import {setEditMode} from '../../actions/settings';
import {size} from 'polished';

const Title = withProps({
  color: 'inherit',
  variant: 'subheading'
})(
  styled(Typography)({
    display: 'flex',
    margin: '0 auto',
    fontWeight: theme.typography.fontWeightMedium
  })
);

const menuButtonSize = theme.spacing.unit * 6;
const MenuButton = styled(IconButton)(size(menuButtonSize), {
  margin: (HEADER_LOGO_SIZE - menuButtonSize) / 2
});

class ElectionHeader extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired,
    editMode: PropTypes.bool.isRequired
  };

  toggleEditMode = () => this.props.dispatch(setEditMode(!this.props.editMode));

  render() {
    return (
      <Header dark simple>
        <Title>{this.props.children}</Title>
        <MenuButton
          color={this.props.editMode ? 'primary' : 'inherit'}
          onClick={this.toggleEditMode}
        >
          <MenuIcon />
        </MenuButton>
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  editMode: state.settings.editMode
});

export default connect(mapStateToProps)(ElectionHeader);
