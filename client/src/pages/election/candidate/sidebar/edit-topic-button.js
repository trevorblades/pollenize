import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import TopicForm from './topic-form';

class EditTopicButton extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    topic: PropTypes.object.isRequired
  };

  state = {
    dialogOpen: false
  };

  onClick = event => {
    event.target.blur();
    this.setState({dialogOpen: true});
  };

  closeDialog = () => this.setState({dialogOpen: false});

  render() {
    return (
      <Fragment>
        {React.cloneElement(this.props.children, {
          onClick: this.onClick
        })}
        <Dialog
          fullWidth
          open={this.state.dialogOpen}
          onClose={this.closeDialog}
        >
          <TopicForm onCancel={this.closeDialog} topic={this.props.topic} />
        </Dialog>
      </Fragment>
    );
  }
}

export default EditTopicButton;
