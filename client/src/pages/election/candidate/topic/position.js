import Dialog from '@material-ui/core/Dialog';
import EditButton from '../../../../components/edit-button';
import PositionForm from './position-form';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'react-emotion';
import theme from '../../../../theme';
import {connect} from 'react-redux';

const StyledSup = styled.sup({lineHeight: 1});
const StyledEditButton = styled(EditButton)({
  marginLeft: theme.spacing.unit / 2,
  verticalAlign: 'top'
});

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

  render() {
    return (
      <Fragment>
        <Typography paragraph variant="subheading">
          {this.props.position.text}
          {this.props.position.sources.map(source => (
            <StyledSup key={source.id}>
              [<a href="#sources">{source.index + 1}</a>]
            </StyledSup>
          ))}
          {this.props.editMode && <StyledEditButton />}
        </Typography>
        {this.props.editMode && (
          <Dialog
            fullWidth
            open={this.state.dialogOpen}
            onClose={this.closeDialog}
          >
            <PositionForm
              key={this.props.position.updated_at}
              onCancel={this.closeDialog}
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
