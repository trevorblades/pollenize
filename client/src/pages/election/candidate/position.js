import Dialog from '@material-ui/core/Dialog';
import PositionForm from './position-form';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';

class Position extends Component {
  static propTypes = {
    editMode: PropTypes.bool.isRequired,
    position: PropTypes.object.isRequired
  };

  state = {
    dialogOpen: false
  };

  onEditClick = event => {
    event.preventDefault();
    this.setState({dialogOpen: true});
  };

  closeDialog = () => this.setState({dialogOpen: false});

  renderText() {
    if (this.props.editMode) {
      return (
        <a href="#" onClick={this.onEditClick}>
          {this.props.position.text}
        </a>
      );
    }
    return this.props.position.text;
  }

  render() {
    return (
      <Fragment>
        <Typography paragraph variant="subheading">
          {this.renderText()}
          {this.props.position.sources.map(source => (
            <sup key={source.id}>
              [<a href="#">{source.index + 1}</a>]
            </sup>
          ))}
        </Typography>
        {this.props.editMode && (
          <Dialog
            fullWidth
            open={this.state.dialogOpen}
            onClose={this.closeDialog}
          >
            <PositionForm
              onClose={this.closeDialog}
              position={this.props.position}
            />
          </Dialog>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  editMode: state.settings.editMode
});

export default connect(mapStateToProps)(Position);
