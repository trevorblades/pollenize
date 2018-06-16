import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import NotFound from '../not-found';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'react-emotion';
import theme from '../../theme';
import withProps from 'recompose/withProps';
import {connect} from 'react-redux';
import {load as loadElection} from '../../actions/election';

const Container = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  position: 'relative'
});

const Sidebar = styled.aside({
  flexShrink: 0,
  width: 200,
  marginLeft: 'auto',
  padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  position: 'sticky',
  top: theme.mixins.toolbar.height
});

const Content = withProps({
  elevation: 0,
  square: true
})(
  styled(Paper)({
    maxWidth: 720,
    marginRight: 'auto',
    borderLeft: `1px solid ${theme.palette.grey[100]}`
  })
);

const Section = styled.div({
  padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 6}px`
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
        <Container>
          <Sidebar>
            <div>
              <Typography gutterBottom variant="caption">
                Topics
              </Typography>
              {this.props.election.topics.map(topic => (
                <Typography gutterBottom key={topic.id} variant="subheading">
                  {topic.title}
                </Typography>
              ))}
            </div>
          </Sidebar>
          <Content>
            {this.props.election.topics.map(topic => {
              const position = candidate.positions[topic.id];
              if (!position) {
                return <div key={topic.id}>No position for this topic</div>;
              }

              return (
                <Section key={topic.id}>
                  <Typography gutterBottom variant="title">
                    {topic.title}
                  </Typography>
                  <Typography paragraph variant="subheading">
                    {position[lang].text}
                  </Typography>
                  {position[lang].sources.map((source, index) => (
                    <div key={index}>{source}</div>
                  ))}
                  <Button size="small">View sources</Button>
                </Section>
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
