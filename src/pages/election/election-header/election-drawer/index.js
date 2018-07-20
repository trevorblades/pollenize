import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import EditIcon from '@material-ui/icons/Edit';
import LanguagePicker from './language-picker';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import StarIcon from '@material-ui/icons/Star';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import styled, {css} from 'react-emotion';
import sumBy from 'lodash/sumBy';
import theme from '../../../../theme';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  getLocalize,
  getMatchMessage,
  getCandidates,
  getStarCounts
} from '../../../../selectors';
import {setCompareMode, setEditMode} from '../../../../actions/settings';
import {transparentize, size} from 'polished';
import {update as updateElection} from '../../../../actions/election';
import {reset as resetStars} from '../../../../actions/stars';

const drawerClassName = css({width: 320});
const StyledListSubheader = styled(ListSubheader)({
  backgroundColor: transparentize(0.15, theme.palette.background.paper)
});

const Stars = styled(ListItemSecondaryAction)({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing.unit * 2,
  color: theme.palette.text.secondary,
  pointerEvents: 'none',
  svg: size(theme.spacing.unit * 2)
});

class ElectionDrawer extends Component {
  static propTypes = {
    candidates: PropTypes.array.isRequired,
    compareMode: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    editMode: PropTypes.bool.isRequired,
    election: PropTypes.object.isRequired,
    localize: PropTypes.func.isRequired,
    matchMessage: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    starCounts: PropTypes.object.isRequired
  };

  onEditModeChange = event =>
    this.props.dispatch(setEditMode(event.target.checked));

  onCompareModeChange = event =>
    this.props.dispatch(setCompareMode(event.target.checked));

  onVisibilityChange = event =>
    this.props.dispatch(updateElection({public: event.target.checked}));

  resetStars = () => this.props.dispatch(resetStars());

  renderResetStarsButton() {
    const total = sumBy(
      this.props.candidates,
      candidate => this.props.starCounts[candidate.id]
    );
    return (
      <ListItem button disabled={!total} onClick={this.resetStars}>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary={this.props.localize('Reset stars')} />
      </ListItem>
    );
  }

  render() {
    return (
      <Drawer
        classes={{paper: drawerClassName}}
        open={this.props.open}
        onClose={this.props.onClose}
        anchor="right"
      >
        <List>
          <StyledListSubheader>
            {this.props.localize('Jump to candidate')}
          </StyledListSubheader>
          {this.props.candidates.map(candidate => {
            const {message: party} = this.props.matchMessage(candidate.parties);
            const starCount = this.props.starCounts[candidate.id];
            return (
              <ListItem
                button
                component={Link}
                to={`/elections/${this.props.election.slug}/${candidate.slug}`}
                key={candidate.id}
                onClick={this.props.onClose}
              >
                <Avatar alt={candidate.name} src={candidate.avatar} />
                <ListItemText
                  primary={candidate.name}
                  secondary={party && party.text}
                />
                {starCount && (
                  <Stars>
                    <Typography color="inherit">{starCount}</Typography>
                    <StarIcon />
                  </Stars>
                )}
              </ListItem>
            );
          })}
          <StyledListSubheader>
            {this.props.localize('Settings')}
          </StyledListSubheader>
          {this.renderResetStarsButton()}
          {this.props.election.candidates.length > 1 && (
            <ListItem>
              <ListItemIcon>
                <CompareArrowsIcon />
              </ListItemIcon>
              <ListItemText primary={this.props.localize('Compare mode')} />
              <ListItemSecondaryAction>
                <Switch
                  checked={this.props.compareMode}
                  onChange={this.onCompareModeChange}
                />
              </ListItemSecondaryAction>
            </ListItem>
          )}
          {this.props.election.languages.length > 1 && (
            <LanguagePicker languages={this.props.election.languages} />
          )}
          {this.props.election.editable && (
            <Fragment>
              <ListItem>
                <ListItemIcon>
                  {this.props.election.public ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={this.props.localize(
                    this.props.election.public ? 'Public' : 'Private'
                  )}
                />
                <ListItemSecondaryAction>
                  <Switch
                    checked={this.props.election.public}
                    onChange={this.onVisibilityChange}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary={this.props.localize('Edit mode')} />
                <ListItemSecondaryAction>
                  <Switch
                    checked={this.props.editMode}
                    onChange={this.onEditModeChange}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </Fragment>
          )}
        </List>
      </Drawer>
    );
  }
}

const mapStateToProps = state => ({
  candidates: getCandidates(state),
  compareMode: state.settings.compareMode.active,
  editMode: state.settings.editMode,
  election: state.election.data,
  localize: getLocalize(state),
  matchMessage: getMatchMessage(state),
  starCounts: getStarCounts(state),
  user: state.user.data
});

export default connect(mapStateToProps)(ElectionDrawer);
