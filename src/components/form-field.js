import TextField from '@material-ui/core/TextField';
import mapProps from 'recompose/mapProps';

export const formFieldProps = {
  margin: 'dense',
  fullWidth: true
};

const FormField = mapProps(({errors, ...props}) => {
  const error = errors && errors[props.name];
  return {
    error: Boolean(error),
    helperText: error && error.msg,
    ...props,
    ...formFieldProps
  };
})(TextField);

export default FormField;
