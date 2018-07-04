import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Popover from '@material-ui/core/Popover';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import theme from '../../../theme';
import {ChromePicker} from 'react-color';

const centerOrigin = {
  horizontal: 'center',
  vertical: 'center'
};

class ColorPicker extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  state = {
    open: false,
    anchorEl: null
  };

  onClick = event =>
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });

  onClose = () => this.setState({open: false});

  render() {
    return (
      <Fragment>
        <FormControl margin="dense">
          <Typography gutterBottom variant="caption">
            Primary color
          </Typography>
          <Button
            disabled={this.state.open}
            variant="raised"
            onClick={this.onClick}
            style={{
              color: theme.palette.getContrastText(this.props.color),
              backgroundColor: this.props.color
            }}
          >
            {this.props.color}
          </Button>
        </FormControl>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={centerOrigin}
          transformOrigin={centerOrigin}
          onClose={this.onClose}
        >
          <ChromePicker
            disableAlpha
            color={this.props.color}
            onChangeComplete={this.props.onChange}
          />
        </Popover>
      </Fragment>
    );
  }
}

export default ColorPicker;
