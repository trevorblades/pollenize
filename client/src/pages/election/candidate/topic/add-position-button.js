import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import PositionForm from './position-form';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

class AddPositionButton extends Component {
  static propTypes = {
    candidate: PropTypes.object.isRequired,
    position: PropTypes.object,
    topic: PropTypes.object.isRequired
  };

  static getDerivedStateFromProps(props) {
    if (props.position) {
      return {
        dialogOpen: false
      };
    }
    return null;
  }

  state = {
    dialogOpen: false
  };

  onAddClick = () => this.setState({dialogOpen: true});

  closeDialog = () => this.setState({dialogOpen: false});

  render() {
    return (
      <Fragment>
        <Button onClick={this.onAddClick}>Add a position</Button>
        <Dialog
          fullWidth
          open={this.state.dialogOpen}
          onClose={this.closeDialog}
        >
          <PositionForm
            position={{
              text: '',
              sources: [{url: ''}],
              candidate_id: this.props.candidate.id,
              topic_id: this.props.topic.id
            }}
            onClose={this.closeDialog}
          />
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  position: state.position.data
});

export default connect(mapStateToProps)(AddPositionButton);
