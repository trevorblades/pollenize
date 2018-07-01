import ButtonBase from '@material-ui/core/ButtonBase';
import EditButton from '../../../../components/edit-button';
import FormDialogTrigger from '../../../../components/form-dialog-trigger';
import PropTypes from 'prop-types';
import React from 'react';
import TopicForm from './topic-form';
import Typography from '@material-ui/core/Typography';
import defaultProps from 'recompose/defaultProps';
import styled, {css} from 'react-emotion';
import theme from '../../../../theme';
import mapProps from 'recompose/mapProps';
import withProps from 'recompose/withProps';
import {SECTION_PADDING_SMALL} from '../../../../components/section';
import {SIDEBAR_WIDTH} from '../common';
import {connect} from 'react-redux';

const padding = theme.spacing.unit * 4;
const Container = styled.aside({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flexShrink: 0,
  width: SIDEBAR_WIDTH,
  marginTop: SECTION_PADDING_SMALL - padding,
  padding,
  paddingRight: 0,
  position: 'sticky',
  top: theme.mixins.toolbar.height
});

const TopicsHeading = withProps({
  gutterBottom: true,
  variant: 'caption'
})(
  styled(Typography)({
    marginTop: theme.spacing.unit * 2
  })
);

const StyledEditButton = styled(EditButton)({
  marginLeft: 'auto'
});

const notLastBottomMargin = css({
  ':not(:last-child)': {
    marginBottom: theme.spacing.unit
  }
});

const SidebarTopics = styled.div(notLastBottomMargin, {width: '100%'});
const SidebarTopic = styled.div`
  display: flex;
  padding-right: ${theme.spacing.unit / 2}px;
  border-right-width: 3px;
  border-right-style: solid;
  border-color: ${props => (props.active ? 'inherit' : 'transparent')};
  ${notLastBottomMargin}
  :not(:hover) ${StyledEditButton} {
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

const TopicFormDialogTrigger = mapProps(props => ({
  children: props.children,
  form: <TopicForm topic={props.topic} />
}))(FormDialogTrigger);

const Sidebar = props => (
  <Container>
    <SidebarItem href="#">About {props.candidate.firstName}</SidebarItem>
    <TopicsHeading>Topics</TopicsHeading>
    <SidebarTopics style={{borderColor: props.candidate.color}}>
      {props.election.topics.map((topic, index) => (
        <SidebarTopic key={topic.id} active={index === props.activeTopicIndex}>
          <SidebarItem href={`#${topic.slug}`}>{topic.title}</SidebarItem>
          {props.editMode && (
            <TopicFormDialogTrigger topic={topic}>
              <StyledEditButton />
            </TopicFormDialogTrigger>
          )}
        </SidebarTopic>
      ))}
    </SidebarTopics>
    {props.editMode && (
      <TopicFormDialogTrigger
        topic={{
          title: '',
          slug: '',
          description: '',
          election_id: props.election.id
        }}
      >
        <AddTopicButton>Add topic...</AddTopicButton>
      </TopicFormDialogTrigger>
    )}
  </Container>
);

Sidebar.propTypes = {
  activeTopicIndex: PropTypes.number.isRequired,
  candidate: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  election: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  editMode: state.settings.editMode
});

export default connect(mapStateToProps)(Sidebar);
