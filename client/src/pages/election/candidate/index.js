import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ElectionHeader from '../election-header';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import Topic, {sectionVerticalPadding} from './topic';
import Typography from '@material-ui/core/Typography';
import flatMap from 'lodash/flatMap';
import styled from 'react-emotion';
import theme from '../../../theme';
import withProps from 'recompose/withProps';
import {Link} from 'react-router-dom';

const StyledLink = styled(Link)({
  textDecoration: 'none'
});

const Container = styled.div({
  display: 'flex',
  flexGrow: 1,
  position: 'relative'
});

const sidebarVerticalPadding = theme.spacing.unit * 3;
const Sidebar = styled.aside({
  width: 200,
  padding: `${sidebarVerticalPadding}px ${theme.spacing.unit * 4}px`
});

const SidebarContainer = styled.div({
  display: 'flex',
  alignSelf: 'flex-start',
  justifyContent: 'flex-end',
  flexGrow: 1,
  marginTop: sectionVerticalPadding - sidebarVerticalPadding,
  position: 'sticky',
  top: theme.mixins.toolbar.height
});

const Content = withProps({
  elevation: 0,
  square: true
})(
  styled(Paper)({
    borderLeft: `1px solid ${theme.palette.grey[100]}`
  })
);

const Filler = styled.div({
  flexGrow: 1,
  backgroundColor: theme.palette.background.paper
});

class Candidate extends Component {
  static propTypes = {
    candidate: PropTypes.object.isRequired,
    election: PropTypes.object.isRequired
  };

  render() {
    const sources = flatMap(this.props.election.topics, topic => {
      const positions = this.props.candidate.positions[topic.slug];
      return positions ? flatMap(positions, 'sources') : [];
    });
    return (
      <Fragment>
        <ElectionHeader>
          <StyledLink to={`/elections/${this.props.election.slug}`}>
            {this.props.election.title}
          </StyledLink>
          <ChevronRightIcon />
          {this.props.candidate.name}
        </ElectionHeader>
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
            {this.props.election.topics.map(topic => (
              <Topic
                key={topic.id}
                title={topic.title}
                description={topic.description}
                positions={this.props.candidate.positions[topic.slug]}
                sources={sources}
              />
            ))}
          </Content>
          <Filler />
        </Container>
      </Fragment>
    );
  }
}

export default Candidate;
