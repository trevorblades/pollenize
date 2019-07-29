import {HEADER_HEIGHT} from './header-base';
import {styled} from '@material-ui/styles';

export const PageAnchor = styled('a')({
  display: 'block',
  height: HEADER_HEIGHT,
  marginTop: -HEADER_HEIGHT
});
