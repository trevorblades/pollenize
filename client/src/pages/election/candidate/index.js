import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ElectionHeader from '../election-header';
import MainContent from './main-content';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import flatMap from 'lodash/flatMap';
import montreal from '../../../assets/images/montreal.jpg';
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

const sectionVerticalPadding = theme.spacing.unit * 5;
const sectionHorizontalPadding = theme.spacing.unit * 6;
const Section = styled.div({
  padding: `${sectionVerticalPadding}px ${sectionHorizontalPadding}px`
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

const SectionContent = styled.div({
  display: 'flex'
});

const alternateContentWidth = 200;
const SectionAlternateContent = styled.div({
  flexShrink: 0,
  width: alternateContentWidth
});

const ImageContainer = styled.div({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  padding: `0 ${sectionHorizontalPadding}px`,
  '::after': {
    content: "''",
    flexGrow: 1,
    maxWidth: alternateContentWidth / 2
  }
});

const ImageCaption = withProps({variant: 'caption'})(
  styled(Typography)({
    maxWidth: 150,
    marginRight: theme.spacing.unit * 1.5,
    textAlign: 'right'
  })
);

const StyledImage = styled.img({
  maxWidth: 480
});

class Candidate extends Component {
  static propTypes = {
    candidate: PropTypes.object.isRequired,
    election: PropTypes.object.isRequired
  };

  render() {
    const allSources = flatMap(this.props.election.topics, topic => {
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
            {this.props.election.topics.map((topic, index, array) => (
              <Fragment key={topic.id}>
                <Section>
                  <Typography gutterBottom variant="headline">
                    {topic.title}
                  </Typography>
                  <SectionContent>
                    <MainContent
                      positions={this.props.candidate.positions[topic.slug]}
                      sources={allSources}
                    />
                    <SectionAlternateContent>
                      <Typography>{topic.description}</Typography>
                    </SectionAlternateContent>
                  </SectionContent>
                </Section>
                {index < array.length - 1 && (
                  <ImageContainer>
                    <ImageCaption>
                      Photo by Marc-Olivier Jodoin on Unsplash
                    </ImageCaption>
                    <StyledImage src={montreal} />
                  </ImageContainer>
                )}
              </Fragment>
            ))}
          </Content>
          <Filler />
        </Container>
      </Fragment>
    );
  }
}

export default Candidate;
