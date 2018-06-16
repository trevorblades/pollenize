import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Header, {logoSize} from '../../components/header';
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

const Container = styled.div({
  display: 'flex',
  flexGrow: 1,
  position: 'relative'
});

const Sidebar = styled.aside({
  width: 200,
  padding: theme.spacing.unit * 3
});

const SidebarContainer = styled.div({
  display: 'flex',
  alignSelf: 'flex-start',
  justifyContent: 'flex-end',
  flexGrow: 1,
  marginTop: theme.spacing.unit * 2,
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

const Filler = styled.div({
  flexGrow: 1,
  backgroundColor: theme.palette.background.paper
});

const Section = styled.div({
  padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 6}px`
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
        <Header dark simple>
          <Title>
            {this.props.election.title}
            <ChevronRightIcon />
            {candidate.name}
          </Title>
          <MenuButton />
        </Header>
        <Container>
          <SidebarContainer>
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
          </SidebarContainer>
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
          <Filler />
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
