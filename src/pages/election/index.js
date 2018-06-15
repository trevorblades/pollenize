import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import NotFound from '../not-found';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'react-emotion';
import theme from '../../theme';
import {HEADER_HEIGHT} from '../../components/header';
import {connect} from 'react-redux';
import {load as loadElection} from '../../actions/election';

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
  top: HEADER_HEIGHT
});

const Content = styled.div({
  maxWidth: 720,
  margin: `${theme.spacing.unit * 2}px 0`
});

const Position = styled.div({
  ':not(:last-child)': {
    marginBottom: 200
  }
});

const lang = 'en';
class Election extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    election: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.dispatch(loadElection(this.props.match.params.id));
  }

  render() {
    if (!this.props.election) {
      if (this.props.loading) {
        return <CircularProgress />;
      }
      return <NotFound />;
    }

    const candidate = this.props.election.candidates[0];
    return (
      <Fragment>
        <Hero>
          <Typography color="inherit" variant="headline">
            Election {}
          </Typography>
        </Hero>
        <Container>
          <Sidebar>
            <Typography gutterBottom variant="caption">
              Topics
            </Typography>
            {this.props.election.topics.map(topic => (
              <Typography gutterBottom key={topic.id} variant="subheading">
                {topic.title}
              </Typography>
            ))}
          </Sidebar>
          <Content>
            {this.props.election.topics.map(topic => {
              let position = candidate.positions[topic.id];
              if (!position) {
                return <div key={topic.id}>No position for this topic</div>;
              }

              position = position[lang];
              return (
                <Position key={topic.id}>
                  <Typography gutterBottom variant="title">
                    {topic.title}
                  </Typography>
                  <Typography paragraph variant="subheading">
                    {position.text}
                  </Typography>
                  {position.sources.map((source, index) => (
                    <div key={index}>{source}</div>
                  ))}
                  <Button variant="raised" color="secondary">
                    Share
                  </Button>
                </Position>
              );
            })}
          </Content>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  election: state.election.data,
  loading: state.election.loading
});

export default connect(mapStateToProps)(Election);
