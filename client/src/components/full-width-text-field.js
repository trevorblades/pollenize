import TextField from '@material-ui/core/TextField';
import withProps from 'recompose/withProps';

const FullWidthTextField = withProps({
  fullWidth: true,
  margin: 'dense'
})(TextField);

export default FullWidthTextField;
