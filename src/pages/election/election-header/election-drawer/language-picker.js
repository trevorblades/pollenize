import ISO6391 from 'iso-639-1';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import TranslateIcon from '@material-ui/icons/Translate';
import {connect} from 'react-redux';
import {getLocalize} from '../../../../selectors';
import {setLanguage} from '../../../../actions/settings';

class LanaguagePicker extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
    languages: PropTypes.array.isRequired,
    localize: PropTypes.func.isRequired
  };

  state = {
    anchorEl: null
  };

  onClick = event => this.setState({anchorEl: event.currentTarget});

  onClose = () => this.setState({anchorEl: null});

  setLanguage = language => {
    this.props.dispatch(setLanguage(language));
    this.onClose();
  };

  render() {
    return (
      <Fragment>
        <ListItem button onClick={this.onClick}>
          <ListItemIcon>
            <TranslateIcon />
          </ListItemIcon>
          <ListItemText
            primary={this.props.localize('Language: {{name}}', {
              name: ISO6391.getNativeName(this.props.language)
            })}
          />
        </ListItem>
        <Menu
          anchorOrigin={{vertical: 'top', horizontal: 'right'}}
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.onClose}
        >
          {this.props.languages.map(language => (
            <MenuItem
              key={language.id}
              selected={language.code === this.props.language}
              onClick={() => this.setLanguage(language.code)}
            >
              {ISO6391.getNativeName(language.code)}
            </MenuItem>
          ))}
        </Menu>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  language: state.settings.language,
  localize: getLocalize(state)
});

export default connect(mapStateToProps)(LanaguagePicker);
