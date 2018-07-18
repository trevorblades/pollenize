import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FacebookLogo from '../../../../assets/logos/facebook.svg';
import TwitterLogo from '../../../../assets/logos/twitter.svg';
import GooglePlusLogo from '../../../../assets/logos/google-plus.svg';
import VKLogo from '../../../../assets/logos/vk.svg';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import querystring from 'querystring';
import styled, {css} from 'react-emotion';
import theme from '../../../../theme';
import mapProps from 'recompose/mapProps';
import {size} from 'polished';
import {connect} from 'react-redux';
import {getLocalize, getMatchMessage} from '../../../../selectors';

const buttonSpacing = theme.spacing.unit * 1.5;
const ShareButtons = styled.div({
  display: 'flex',
  marginBottom: buttonSpacing
});

const ShareButton = mapProps(({children, href, query, style}) => ({
  style,
  children,
  href: `${href}?${querystring.stringify(query)}`,
  component: 'a',
  target: '_blank',
  rel: 'noopener noreferrer'
}))(
  styled(ButtonBase)({
    padding: theme.spacing.unit,
    borderRadius: '50%',
    color: theme.palette.common.white,
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
    candidate: PropTypes.object.isRequired,
    localize: PropTypes.func.isRequired,
    matchMessage: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    topic: PropTypes.object.isRequired
  };

  render() {
    const url = window.location.href;
    const {message: title} = this.props.matchMessage(this.props.topic.titles);
    return (
      <Dialog
        fullWidth
        maxWidth="xs"
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <DialogTitle>{this.props.localize('Share this position')}</DialogTitle>
        <DialogContent>
          <ShareButtons>
            <ShareButton
              style={{backgroundColor: '#1da1f2'}}
              href="https://twitter.com/intent/tweet"
              query={{
                url,
                text: this.props.localize(
                  "Check out {{name}}'s stance on {{topic}}",
                  {
                    name: this.props.candidate.name,
                    topic: title.text.toLowerCase()
                  }
                ),
                related: 'pollenizeorg'
              }}
            >
              <TwitterLogo />
            </ShareButton>
            <ShareButton
              style={{backgroundColor: '#3b5998'}}
              href="https://facebook.com/sharer.php"
              query={{u: url}}
            >
              <FacebookLogo />
            </ShareButton>
            <ShareButton
              style={{backgroundColor: '#dc4e41'}}
              href="https://plus.google.com/share"
              query={{url}}
            >
              <GooglePlusLogo />
            </ShareButton>
            <ShareButton
              style={{backgroundColor: '#6383a8'}}
              href="https://vk.com/share.php"
              query={{url}}
            >
              <VKLogo />
            </ShareButton>
          </ShareButtons>
          <TextField fullWidth readOnly value={url} onClick={focusAndSelect} />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>
            {this.props.localize('Done')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  localize: getLocalize(state),
  matchMessage: getMatchMessage(state)
});

export default connect(mapStateToProps)(ShareDialog);
