import Header from '../../components/header';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styled from 'react-emotion';
import theme from '../../theme';
import withProps from 'recompose/withProps';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import {setEditMode} from '../../actions/settings';

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

class ElectionHeader extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired,
    editMode: PropTypes.bool.isRequired
  };

  onEditModeChange = event =>
    this.props.dispatch(setEditMode(event.target.checked));

  render() {
    return (
      <Header dark simple>
        <Title>{this.props.children}</Title>
        <Switch
          onChange={this.onEditModeChange}
          checked={this.props.editMode}
        />
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  editMode: state.settings.editMode
});

export default connect(mapStateToProps)(ElectionHeader);
