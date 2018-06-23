import Typography from '@material-ui/core/Typography';
import defaultProps from 'recompose/defaultProps';
import styled from 'react-emotion';

const SidebarItem = defaultProps({
  component: 'a',
  variant: 'subheading'
})(
  styled(Typography)({
    textDecoration: 'none',
    ':hover': {
      opacity: 0.75
    }
  })
);

export default SidebarItem;
