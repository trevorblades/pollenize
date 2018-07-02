import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import React from 'react';
import styled from 'react-emotion';
import theme from '../../theme';
import {size} from 'polished';

const StyledFavoriteIcon = styled(FavoriteIcon)({
  marginRight: theme.spacing.unit
});

const DonateButton = () => (
  <form
    action="https://www.paypal.com/cgi-bin/webscr"
    method="post"
    target="_blank"
  >
    <input name="cmd" type="hidden" value="_s-xclick" />
    <input name="hosted_button_id" type="hidden" value="9B2B2V2TDLPEE" />
    <Button variant="extendedFab" color="primary" type="submit">
      <StyledFavoriteIcon />
      Donate
    </Button>
    <img
      {...size(1)}
      border={0}
      src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
    />
  </form>
);

export default DonateButton;
