import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import styled from 'react-emotion';
import theme from '../theme';
import {size} from 'polished';

const StyledIconButton = styled(IconButton)(size(theme.spacing.unit * 3));
const StyledEditIcon = styled(EditIcon)(size(theme.spacing.unit * 2));
const EditButton = props => (
  <StyledIconButton {...props}>
    <StyledEditIcon />
  </StyledIconButton>
);

export default EditButton;
