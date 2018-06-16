import Header, {logoSize} from '../../components/header';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'react-emotion';
import theme from '../../theme';
import withProps from 'recompose/withProps';
import Typography from '@material-ui/core/Typography';
import {size} from 'polished';

const Title = withProps({
  color: 'inherit',
  variant: 'subheading'
})(
  styled(Typography)({
    display: 'flex',
    margin: '0 auto',
    fontWeight: theme.typography.fontWeightMedium
  })
);

const MenuButton = styled.div(size(logoSize), {
  backgroundColor: theme.palette.common.black
});

const ElectionHeader = props => (
  <Header dark simple>
    <Title>{props.children}</Title>
    <MenuButton />
  </Header>
);

ElectionHeader.propTypes = {
  children: PropTypes.node.isRequired
};

export default ElectionHeader;
