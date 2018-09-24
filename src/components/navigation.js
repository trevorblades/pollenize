import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import styled, {css} from 'react-emotion';
import theme from '../theme';
import withProps from 'recompose/withProps';
import {Link, NavLink} from 'react-router-dom';

const Container = styled.nav({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto'
});

const ItemBase = withProps({
  color: 'inherit',
  variant: 'subheading',
  noWrap: true
})(
  styled(Typography)({
    textDecoration: 'none',
    ':not(:last-child)': {
      marginRight: theme.spacing.unit * 3
    }
  })
);

const hover = css({
  ':hover': {
    opacity: 0.75
  }
});

const NavlessItem = styled(ItemBase)(hover);
const NavItem = styled(ItemBase)({
  ':not(.active)': css({opacity: 0.5}, hover)
});

const ExactNavLink = withProps({exact: true})(NavLink);

class Navigation extends Component {
  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.object,
    withActive: PropTypes.bool
  };

  static defaultProps = {
    items: {
      Home: '/',
      Elections: '/elections',
      // Tools: '/tools',
      Blog: {
        component: 'a',
        href: 'https://medium.com/pollenize',
        rel: 'noopener noreferrer',
        target: '_blank'
      }
    }
  };

  render() {
    const Item = this.props.withActive ? NavItem : NavlessItem;
    const keys = Object.keys(this.props.items);
    return (
      <Container className={this.props.className}>
        {keys.map(key => {
          let props = this.props.items[key];
          if (typeof props === 'string') {
            props = {
              component: this.props.withActive ? ExactNavLink : Link,
              to: props
            };
          }

          return (
            <Item {...props} key={key}>
              {key}
            </Item>
          );
        })}
      </Container>
    );
  }
}

export default Navigation;
