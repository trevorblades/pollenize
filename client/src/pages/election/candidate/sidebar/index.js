import ButtonBase from '@material-ui/core/ButtonBase';
import EditTopicButton from './edit-topic-button';
import SidebarItem from './sidebar-item';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'react-emotion';
import theme from '../../../../theme';
import withProps from 'recompose/withProps';
import {SECTION_VERTICAL_PADDING} from '../common';
import {connect} from 'react-redux';

const sidebarVerticalPadding = theme.spacing.unit * 3;
const Container = styled.div({
  display: 'flex',
  alignSelf: 'flex-start',
  justifyContent: 'flex-end',
  flexGrow: 1,
  marginTop: SECTION_VERTICAL_PADDING - sidebarVerticalPadding,
  position: 'sticky',
  top: theme.mixins.toolbar.height
});

const InnerContainer = styled.aside({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: 200,
  padding: `${sidebarVerticalPadding}px ${theme.spacing.unit * 4}px`
});

const TopicsHeading = withProps({
  gutterBottom: true,
  variant: 'caption'
})(
  styled(Typography)({
    marginTop: theme.spacing.unit * 2
  })
);

const SidebarTopic = styled.div({
  display: 'flex',
  marginBottom: theme.spacing.unit
});

const Sidebar = props => (
  <Container>
    <InnerContainer>
      <SidebarItem href="#">
        About {props.candidate.name.replace(/\s+/, ' ').split(' ')[0]}
      </SidebarItem>
      <TopicsHeading>Topics</TopicsHeading>
      {props.election.topics.map(topic => (
        <SidebarTopic key={topic.id}>
          <SidebarItem href={`#${topic.slug}`}>{topic.title}</SidebarItem>
          {props.editMode && (
            <EditTopicButton topic={topic}>
              <div>Edit</div>
            </EditTopicButton>
          )}
        </SidebarTopic>
      ))}
      {props.editMode && (
        <EditTopicButton
          topic={{
            title: '',
            slug: '',
            description: '',
            election_id: props.election.id
          }}
        >
          <SidebarItem color="textSecondary" component={ButtonBase}>
            Add topic...
          </SidebarItem>
        </EditTopicButton>
      )}
    </InnerContainer>
  </Container>
);

Sidebar.propTypes = {
  candidate: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  election: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  editMode: state.settings.editMode
});

export default connect(mapStateToProps)(Sidebar);
