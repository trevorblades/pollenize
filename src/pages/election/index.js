import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'react-emotion';
import theme from '../../theme';

const Hero = styled.div({
  padding: theme.spacing.unit * 5,
  textAlign: 'center',
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary[500]
});

const Container = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  margin: '0 auto',
  padding: theme.spacing.unit * 5,
  position: 'relative'
});

const Sidebar = styled.aside({
  flexShrink: 0,
  width: 150,
  marginRight: theme.spacing.unit * 5,
  paddingTop: theme.spacing.unit * 2,
  position: 'sticky',
  top: 72
});

const Content = styled.div({
  maxWidth: 720
});

const Position = styled.div({
  marginTop: theme.spacing.unit * 2,
  ':not(:last-child)': {
    marginBottom: 200
  }
});

const topics = [
  'Economy',
  'Environment',
  'Aboriginal Affairs',
  'Pipelines',
  'Justice',
  'Healthcare',
  'Foreign Policy',
  'Immigration',
  'Education',
  'Housing',
  'Privacy',
  'Government & Transparency'
];

class Election extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  render() {
    return (
      <Fragment>
        <Hero>
          <Typography color="inherit" variant="headline">
            Election {this.props.match.params.id}
          </Typography>
        </Hero>
        <Container>
          <Sidebar>
            <Typography gutterBottom variant="caption">
              Topics
            </Typography>
            {topics.map(topic => (
              <Typography gutterBottom key={topic} variant="subheading">
                {topic}
              </Typography>
            ))}
          </Sidebar>
          <Content>
            {topics.map(topic => (
              <Position key={topic}>
                <Typography gutterBottom variant="title">
                  {topic}
                </Typography>
                <Typography paragraph variant="subheading">
                  A Liberal government would work to offer more benefits for
                  Canadian families, readjust tax brackets in favour of the
                  middle class, and overhaul the Canadian Revenue Agency (CRA).
                  They would also make investments into clean energy technology
                  and green innovation in sectors across the economy.
                </Typography>
                <Button variant="raised" color="secondary">
                  Share
                </Button>
              </Position>
            ))}
          </Content>
        </Container>
      </Fragment>
    );
  }
}

export default Election;
