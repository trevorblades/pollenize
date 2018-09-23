import Button from '@material-ui/core/Button';
import React, {Component} from 'react';
import Section from '../../components/section';
import Typography from '@material-ui/core/Typography';
import defaultProps from 'recompose/defaultProps';
import noise from '../../assets/images/noise.png';
import styled from 'react-emotion';
import theme from '../../theme';
import withProps from 'recompose/withProps';
import {Link} from 'react-router-dom';

const Container = styled.div({
  display: 'flex',
  height: 400,
  backgroundColor: theme.palette.grey[900],
  overflow: 'hidden'
});

const InnerContainer = withProps({centered: true})(
  styled(Section)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  })
);

const Text = defaultProps({color: 'inherit'})(Typography);
const Headline = withProps({
  gutterBottom: true,
  variant: 'display3'
})(
  styled(Text)({
    lineHeight: 1
  })
);

const Content = styled.div({
  maxWidth: theme.breakpoints.values.sm,
  color: theme.palette.grey[50],
  position: 'relative'
});

const LargeButton = defaultProps({size: 'large'})(Button);
const PrimaryButton = withProps({
  component: Link,
  color: 'primary',
  variant: 'raised'
})(
  styled(LargeButton)({
    marginRight: theme.spacing.unit * 1.5
  })
);

const StyledImage = withProps({src: noise})(
  styled.img({
    height: 736,
    userSelect: 'none',
    pointerEvents: 'none',
    position: 'absolute',
    top: '50%',
    left: '100%',
    transform: `translate(${theme.spacing.unit * 3}px, -50%)`
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
              We break down elections and provide voters with an organized,
              unbiased overview of each candidate&apos;s platform.
            </Text>
            <PrimaryButton to="/elections">View elections</PrimaryButton>
            {/* <LargeButton color="inherit" variant="outlined">
              Learn more
            </LargeButton> */}
            <StyledImage />
          </Content>
        </InnerContainer>
      </Container>
    );
  }
}

export default Home;
