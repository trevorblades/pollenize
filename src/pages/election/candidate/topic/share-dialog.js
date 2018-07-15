import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FacebookLogo from '../../../../assets/logos/facebook.svg';
import TwitterLogo from '../../../../assets/logos/twitter.svg';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import styled, {css} from 'react-emotion';
import theme from '../../../../theme';
import withProps from 'recompose/withProps';
import {size} from 'polished';

const buttonSpacing = theme.spacing.unit * 1.5;
const ShareButtons = styled.div({
  display: 'flex',
  marginBottom: buttonSpacing
});

const ShareButton = withProps({
  component: 'a',
  target: '_blank',
  rel: 'noopener noreferrer'
})(
  styled(ButtonBase)({
    padding: theme.spacing.unit,
    borderRadius: '50%',
    ':not(:last-child)': {
      marginRight: buttonSpacing
    },
    svg: css(size(theme.spacing.unit * 4), {
      fill: 'currentColor'
    })
  })
);

function focusAndSelect({target}) {
  target.focus();
  target.select();
}

class ShareDialog extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  render() {
    return (
      <Dialog
        fullWidth
        maxWidth="xs"
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <DialogTitle>Share this position</DialogTitle>
        <DialogContent>
          <ShareButtons>
            <ShareButton
              href="https://twitter.com/intent/tweet"
              style={{
                color: theme.palette.common.white,
                backgroundColor: '#1da1f2'
              }}
            >
              <TwitterLogo />
            </ShareButton>
            <ShareButton
              href="https://facebook.com/sharer.php"
              style={{
                color: theme.palette.common.white,
                backgroundColor: '#3b5998'
              }}
            >
              <FacebookLogo />
            </ShareButton>
          </ShareButtons>
          <TextField
            fullWidth
            readOnly
            value={window.location.href}
            onClick={focusAndSelect}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Done</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ShareDialog;
