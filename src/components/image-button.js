import ButtonBase from '@material-ui/core/ButtonBase';
import ImageIcon from '@material-ui/icons/Image';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styled from 'react-emotion';
import theme from '../theme';
import withProps from 'recompose/withProps';
import {size} from 'polished';

const Button = withProps({component: 'label'})(
  styled(ButtonBase)({
    color: theme.palette.grey[500],
    backgroundColor: theme.palette.grey[100],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  })
);

const StyledImageIcon = styled(ImageIcon)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
});

const FileInput = withProps({type: 'file'})(
  styled.input({
    display: 'none'
  })
);

class ImageButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    iconSize: PropTypes.number,
    image: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    iconSize: 36
  };

  onChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', event =>
      this.props.onChange({
        file,
        dataUrl: event.target.result
      })
    );

    reader.readAsDataURL(file);
    event.target.value = null;
  };

  render() {
    return (
      <Button
        className={this.props.className}
        style={{
          backgroundImage: this.props.image && `url(${this.props.image})`
        }}
      >
        {!this.props.image && (
          <StyledImageIcon style={size(this.props.iconSize)} />
        )}
        <FileInput onChange={this.onChange} />
      </Button>
    );
  }
}

export default ImageButton;
