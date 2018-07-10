import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Form, {FormField} from './form';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import get from 'lodash/get';
import sentenceCase from 'sentence-case';
import styled from 'react-emotion';
import theme from '../theme';

const DeleteButton = styled(Button)({
  marginRight: 'auto',
  color: theme.palette.error.main
});

const verbs = [['Create', 'Creating'], ['Save', 'Saving']];
const field = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.array,
  PropTypes.node
]);

class AutoForm extends Component {
  static propTypes = {
    noun: PropTypes.string.isRequired,
    initialData: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    fields: PropTypes.arrayOf(field).isRequired,
    success: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSuccess: PropTypes.func
  };

  componentDidUpdate(prevProps) {
    if (this.props.onSuccess && this.props.success && !prevProps.success) {
      this.props.onSuccess();
    }
  }

  renderFormField(key, {xs = 12, ...props} = {}) {
    const {errors} = this.props.error || {};
    const error = errors && errors[key];
    return (
      <Grid item key={key} xs={xs}>
        <FormField
          name={key}
          label={sentenceCase(key)}
          defaultValue={get(this.props.initialData, key)}
          error={Boolean(error)}
          helperText={error && error.msg}
          {...props}
        />
      </Grid>
    );
  }

  render() {
    const {loading} = this.props;
    const editing = Boolean(this.props.initialData.id);
    const verb = verbs[Number(editing)][Number(loading)];
    return (
      <Form onSubmit={this.props.onSubmit}>
        <DialogTitle>
          {editing ? 'Edit' : 'Add'} a {this.props.noun}
        </DialogTitle>
        <DialogContent>
          <Grid container>
            {this.props.fields.map(field => {
              switch (typeof field) {
                case 'string': {
                  return this.renderFormField(field);
                }
                default:
                  return React.isValidElement(field)
                    ? field
                    : this.renderFormField(...field);
              }
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          {editing && (
            <DeleteButton disabled={loading} onClick={this.props.onDelete}>
              Delete
            </DeleteButton>
          )}
          <Button disabled={loading} onClick={this.props.onCancel}>
            Cancel
          </Button>
          <Button disabled={loading} type="submit">
            {verb} {this.props.noun}
            {loading ? '...' : ''}
          </Button>
        </DialogActions>
      </Form>
    );
  }
}

export default AutoForm;
