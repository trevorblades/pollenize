import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'react-emotion';
import theme from '../theme';
import withProps from 'recompose/withProps';

export const FormField = withProps({
  fullWidth: true,
  margin: 'dense'
})(TextField);

export const DeleteButton = withProps({children: 'Delete'})(
  styled(Button)({
    marginRight: 'auto',
    color: theme.palette.error.main
  })
);
