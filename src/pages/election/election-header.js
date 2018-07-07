import Avatar from '@material-ui/core/Avatar';
import CanadaFlag from '../../assets/flags/canada.svg';
import Drawer from '@material-ui/core/Drawer';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import EditIcon from '@material-ui/icons/Edit';
import Header, {HEADER_LOGO_SIZE} from '../../components/header';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import styled, {css} from 'react-emotion';
import theme from '../../theme';
import withProps from 'recompose/withProps';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setEditMode} from '../../actions/settings';
import {size, transparentize} from 'polished';

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

const drawerClassName = css({width: 320});
const StyledListSubheader = styled(ListSubheader)({
  backgroundColor: transparentize(0.15, theme.palette.background.paper)
});

class ElectionHeader extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired,
    editMode: PropTypes.bool.isRequired,
    election: PropTypes.object.isRequired,
    user: PropTypes.object
  };

  state = {
    drawerOpen: false
  };

  onMenuClick = event => {
    event.currentTarget.blur();
    this.setState({drawerOpen: true});
  };

  closeDrawer = () => this.setState({drawerOpen: false});

  onEditModeChange = event =>
    this.props.dispatch(setEditMode(event.target.checked));

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
        <Drawer
          classes={{paper: drawerClassName}}
          open={this.state.drawerOpen}
          onClose={this.closeDrawer}
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
                onClick={this.closeDrawer}
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
              <ListItemText primary="Compare mode" secondary="Coming soon" />
              <ListItemSecondaryAction>
                <Switch disabled />
              </ListItemSecondaryAction>
            </ListItem>
            {this.props.user && (
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
            )}
          </List>
        </Drawer>
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
