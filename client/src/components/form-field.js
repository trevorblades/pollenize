import TextField from '@material-ui/core/TextField';
import withProps from 'recompose/withProps';

const FormField = withProps({
  fullWidth: true,
  margin: 'dense'
})(TextField);

export default FormField;
