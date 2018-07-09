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
import Switch from '@material-ui/core/Switch';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import styled, {css} from 'react-emotion';
import theme from '../../../../theme';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setEditMode} from '../../../../actions/settings';
import {transparentize} from 'polished';
import {update as updateElection} from '../../../../actions/election';

const drawerClassName = css({width: 320});
const StyledListSubheader = styled(ListSubheader)({
  backgroundColor: transparentize(0.15, theme.palette.background.paper)
});

class ElectionDrawer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    editMode: PropTypes.bool.isRequired,
    election: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  onEditModeChange = event =>
    this.props.dispatch(setEditMode(event.target.checked));

  onVisibilityChange = event => {
    const {slug, title} = this.props.election;
    this.props.dispatch(
      updateElection({
        slug,
        title,
        public: event.target.checked
      })
    );
  };

  render() {
    return (
      <Drawer
        classes={{paper: drawerClassName}}
        open={this.props.open}
        onClose={this.props.onClose}
        anchor="right"
      >
        <List>
          <StyledListSubheader>Jump to candidate</StyledListSubheader>
          {this.props.election.candidates.map(candidate => (
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
                secondary={candidate.party}
              />
            </ListItem>
          ))}
          <StyledListSubheader>Settings</StyledListSubheader>
          <ListItem disabled>
            <ListItemIcon>
              <CompareArrowsIcon />
            </ListItemIcon>
            <ListItemText primary="Compare mode" />
            <ListItemSecondaryAction>
              <Switch disabled />
            </ListItemSecondaryAction>
          </ListItem>
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
                  primary={this.props.election.public ? 'Public' : 'Private'}
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
                <ListItemText primary="Edit mode" />
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
  editMode: state.settings.editMode,
  election: state.election.data,
  user: state.user.data
});

export default connect(mapStateToProps)(ElectionDrawer);
