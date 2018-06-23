import ButtonBase from '@material-ui/core/ButtonBase';
import EditIcon from '@material-ui/icons/Edit';
import EditTopicButton from './edit-topic-button';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import defaultProps from 'recompose/defaultProps';
import styled from 'react-emotion';
import theme from '../../../../theme';
import withProps from 'recompose/withProps';
import {SECTION_VERTICAL_PADDING} from '../common';
import {connect} from 'react-redux';
import {size} from 'polished';

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
  padding: `${sidebarVerticalPadding}px ${theme.spacing.unit * 4}px`,
  paddingRight: theme.spacing.unit * 2
});

const TopicsHeading = withProps({
  gutterBottom: true,
  variant: 'caption'
})(
  styled(Typography)({
    marginTop: theme.spacing.unit * 2
  })
);

const EditButton = styled(IconButton)(size(theme.spacing.unit * 3));
const StyledEditIcon = styled(EditIcon)(size(theme.spacing.unit * 2));
const SidebarTopic = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${theme.spacing.unit}px;
  :not(:hover) ${EditButton} {
    display: none;
  }
`;

const SidebarItem = defaultProps({
  component: 'a',
  variant: 'subheading'
})(
  styled(Typography)({
    textDecoration: 'none',
    ':hover': {
      opacity: 0.75
    }
  })
);

const AddTopicButton = withProps({component: ButtonBase})(
  styled(SidebarItem)({
    color: theme.palette.text.secondary
  })
);

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
              <EditButton>
                <StyledEditIcon />
              </EditButton>
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
          <AddTopicButton>Add topic...</AddTopicButton>
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
