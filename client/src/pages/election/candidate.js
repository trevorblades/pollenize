import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ElectionHeader from './election-header';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
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

const Sources = styled.div({
  display: 'none'
});

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

const lang = 'en';
class Election extends Component {
  static propTypes = {
    candidate: PropTypes.object.isRequired,
    election: PropTypes.object.isRequired
  };

  render() {
    return (
      <Fragment>
        <ElectionHeader>
          <StyledLink to={`/elections/${this.props.election.id}`}>
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
              const position = this.props.candidate.positions[topic.id];
              if (!position) {
                return <div key={topic.id}>No position for this topic</div>;
              }

              const {text, sources} = position[lang];
              return (
                <Fragment key={topic.id}>
                  <Section>
                    <Typography gutterBottom variant="headline">
                      {topic.title}
                    </Typography>
                    <SectionContent>
                      <SectionMainContent>
                        <Typography paragraph variant="subheading">
                          {text}
                        </Typography>
                        <Sources>
                          {sources.map((source, index) => (
                            <div key={index}>{source}</div>
                          ))}
                        </Sources>
                        <Actions>
                          <Action>Compare</Action>
                          <Action>View sources</Action>
                        </Actions>
                      </SectionMainContent>
                      <SectionAlternateContent>
                        <Typography>{text}</Typography>
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
