import ButtonBase from '@material-ui/core/ButtonBase';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'react-emotion';
import {connect} from 'react-redux';
import {getLocalize, getMatchMessage} from '../../../../selectors';
import {setCompareIndex} from '../../../../actions/settings';

const StyledMenuItem = styled(MenuItem)({height: 'auto'});
const menuOrigin = {
  horizontal: 'right',
  vertical: 'top'
};

class ChangeButton extends Component {
  static propTypes = {
    comparates: PropTypes.array.isRequired,
    compareIndex: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    localize: PropTypes.func.isRequired,
    matchMessage: PropTypes.func.isRequired
  };

  state = {
    anchorEl: null
  };

  onClick = event => this.setState({anchorEl: event.currentTarget});

  onMenuItemClick = index => {
    this.props.dispatch(setCompareIndex(index));
    this.closeMenu();
  };

  closeMenu = () => this.setState({anchorEl: null});

  render() {
    return (
      <Fragment>
        <ButtonBase onClick={this.onClick}>
          <Typography color="textSecondary">
            {this.props.localize('Change')}
          </Typography>
        </ButtonBase>
        <Menu
          anchorOrigin={menuOrigin}
          transformOrigin={menuOrigin}
          open={Boolean(this.state.anchorEl)}
          anchorEl={this.state.anchorEl}
          onClose={this.closeMenu}
        >
          {this.props.comparates.map((comparate, index) => {
            const {message: party} = this.props.matchMessage(comparate.parties);
            return (
              <StyledMenuItem
                key={comparate.id}
                selected={index === this.props.compareIndex}
                onClick={() => this.onMenuItemClick(index)}
              >
                <ListItemText
                  primary={comparate.name}
                  secondary={party && party.text}
                />
              </StyledMenuItem>
            );
          })}
        </Menu>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  compareIndex: state.settings.compareMode.index,
  localize: getLocalize(state),
  matchMessage: getMatchMessage(state)
});

export default connect(mapStateToProps)(ChangeButton);
