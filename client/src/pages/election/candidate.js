import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Chip from '@material-ui/core/Chip';
import ElectionHeader from './election-header';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import cropUrl from 'crop-url';
import findIndex from 'lodash/findIndex';
import flatMap from 'lodash/flatMap';
import montreal from '../../assets/images/montreal.jpg';
import styled from 'react-emotion';
import theme from '../../theme';
import withProps from 'recompose/withProps';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const StyledLink = styled(Link)({
  color: 'inherit',
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

const sectionMainContentPadding = theme.spacing.unit * 4;
const SectionMainContent = styled.div({
  maxWidth: 720,
  marginRight: sectionMainContentPadding,
  paddingRight: sectionMainContentPadding,
  borderRight: `1px dashed ${theme.palette.grey[200]}`
});

const sourceSpacing = theme.spacing.unit;
const Source = withProps({
  clickable: true,
  component: 'a'
})(
  styled(Chip)({
    marginBottom: sourceSpacing,
    backgroundColor: theme.palette.grey[100],
    ':hover': {
      backgroundColor: theme.palette.grey[200]
    },
    ':not(:last-child)': {
      marginRight: sourceSpacing
    }
  })
);

const Sources = styled.div({
  marginBottom: -sourceSpacing
});

const Headline = withProps({
  gutterBottom: true,
  variant: 'headline'
})(
  styled(Typography)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  })
);

const Actions = styled.div({
  display: 'flex'
});

const Action = withProps({size: 'small'})(
  styled(Button)({
    ':not(:last-child)': {
      marginRight: theme.spacing.unit
    }
  })
);

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

class Election extends Component {
  static propTypes = {
    candidate: PropTypes.object.isRequired,
    election: PropTypes.object.isRequired
  };

  render() {
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
            {this.props.election.topics.map(topic => {
              const positions = this.props.candidate.positions[topic.slug];
              if (!positions) {
                return <div key={topic.id}>No positions for this topic</div>;
              }

              const sources = flatMap(positions, 'sources');
              return (
                <Fragment key={topic.id}>
                  <Section>
                    <Headline>
                      {topic.title}
                      <Actions>
                        <Action>Compare</Action>
                        <Action>View sources</Action>
                      </Actions>
                    </Headline>
                    <SectionContent>
                      <SectionMainContent>
                        {positions.map(position => (
                          <Typography
                            key={position.id}
                            paragraph
                            variant="subheading"
                          >
                            {position.text}
                            {position.sources.map(source => (
                              <sup key={source.id}>
                                [{findIndex(sources, ['id', source.id]) + 1}]
                              </sup>
                            ))}{' '}
                            <a href="#">Read more...</a>
                          </Typography>
                        ))}
                        <Sources>
                          {sources.map((source, index) => (
                            <Source
                              key={source.id}
                              title={source.url}
                              href={source.url}
                              target="_blank"
                              label={`${index + 1}. ${cropUrl(source.url, 12)}`}
                            />
                          ))}
                        </Sources>
                      </SectionMainContent>
                      <SectionAlternateContent>
                        <Typography>{topic.description}</Typography>
                      </SectionAlternateContent>
                    </SectionContent>
                  </Section>
                  <ImageContainer>
                    <ImageCaption>
                      Photo by Marc-Olivier Jodoin on Unsplash
                    </ImageCaption>
                    <StyledImage src={montreal} />
                  </ImageContainer>
                </Fragment>
              );
            })}
          </Content>
          <Filler />
        </Container>
      </Fragment>
    );
  }
}

export default connect()(Election);
