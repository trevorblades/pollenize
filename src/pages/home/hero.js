import Button from '@material-ui/core/Button';
import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import noise from '../../assets/images/noise.png';
import styled from 'react-emotion';
import theme from '../../theme';
import defaultProps from 'recompose/defaultProps';
import withProps from 'recompose/withProps';

const Container = styled.div({
  display: 'flex',
  height: 400,
  color: theme.palette.grey[50],
  backgroundColor: theme.palette.grey[900],
  overflow: 'hidden'
});

const InnerContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: theme.breakpoints.values.lg,
  margin: '0 auto'
});

const Text = defaultProps({color: 'inherit'})(Typography);
const Headline = withProps({
  gutterBottom: true,
  variant: 'display3'
})(
  styled(Text)({
    lineHeight: 1
  })
);

const padding = theme.spacing.unit * 8;
const Content = styled.div({
  maxWidth: theme.breakpoints.values.sm,
  padding,
  paddingRight: padding / 2,
  position: 'relative'
});

const StyledImage = withProps({src: noise})(
  styled.img({
    height: 736,
    userSelect: 'none',
    pointerEvents: 'none',
    position: 'absolute',
    top: '50%',
    left: '100%',
    transform: 'translateY(-50%)'
  })
);

class Home extends Component {
  render() {
    return (
      <Container>
        <InnerContainer>
          <Content>
            <Headline>Informing voters</Headline>
            <Text paragraph variant="title">
              We break down popular elections and provide voters with an
              organized, unbiased overview of each candidate&apos;s platform.
            </Text>
            <Button color="primary" size="large" variant="raised">
              View elections
            </Button>
            <StyledImage />
          </Content>
        </InnerContainer>
      </Container>
    );
  }
}

export default Home;
