import ButtonBase from '@material-ui/core/ButtonBase';
import Dialog from '@material-ui/core/Dialog';
import React, {Component, Fragment} from 'react';
import SidebarItem from './sidebar-item';
import TopicForm from './topic-form';

class AddTopicButton extends Component {
  state = {
    dialogOpen: false
  };

  onClick = () => this.setState({dialogOpen: true});

  closeDialog = () => this.setState({dialogOpen: false});

  render() {
    return (
      <Fragment>
        <SidebarItem
          color="textSecondary"
          component={ButtonBase}
          onClick={this.onClick}
        >
          Add topic...
        </SidebarItem>
        <Dialog
          fullWidth
          open={this.state.dialogOpen}
          onClose={this.closeDialog}
        >
          <TopicForm onClose={this.closeDialog} />
        </Dialog>
      </Fragment>
    );
  }
}

export default AddTopicButton;
