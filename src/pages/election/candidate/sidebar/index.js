import ButtonBase from '@material-ui/core/ButtonBase';
import EditButton from '../../../../components/edit-button';
import DialogTrigger from '../../../../components/dialog-trigger';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import TopicForm from './topic-form';
import Typography from '@material-ui/core/Typography';
import defaultProps from 'recompose/defaultProps';
import styled, {css} from 'react-emotion';
import theme from '../../../../theme';
import mapProps from 'recompose/mapProps';
import withProps from 'recompose/withProps';
import {
  SECTION_PADDING_SMALL,
  SECTION_PADDING_SMALLER,
  breakpoint as sectionBreakpoint
} from '../../../../components/section';
import {SIDEBAR_WIDTH} from '../common';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {connect} from 'react-redux';
import {scrollToTop} from '../../../../util';
import {size} from 'polished';

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
  top: theme.mixins.toolbar.height,
  [theme.breakpoints.down(sectionBreakpoint)]: {
    marginTop: SECTION_PADDING_SMALLER - padding
  }
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
  position: relative;
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

const SidebarButton = defaultProps({component: ButtonBase})(SidebarItem);
const AddTopicButton = styled(SidebarButton)({
  color: theme.palette.text.secondary
});

const DragHandle = styled.div({
  position: 'absolute',
  right: '100%',
  top: '50%',
  transform: 'translateY(-50%)',
  svg: css(size(theme.spacing.unit * 2.5), {
    display: 'block',
    fill: theme.palette.grey[300]
  })
});

const TopicFormDialogTrigger = mapProps(props => ({
  children: props.children,
  renderContent: mapProps(closeDialog => ({
    topic: props.topic,
    onCancel: closeDialog,
    onSuccess: closeDialog
  }))(TopicForm)
}))(DialogTrigger);

class Sidebar extends Component {
  static propTypes = {
    activeTopicIndex: PropTypes.number.isRequired,
    candidate: PropTypes.object.isRequired,
    editMode: PropTypes.bool.isRequired,
    election: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      topics: Array.from(props.election.topics)
    };
  }

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    this.setState(prevState => {
      const topics = Array.from(prevState.topics);
      const [removed] = topics.splice(result.source.index, 1);
      topics.splice(result.destination.index, 0, removed);
      return {topics};
    });
  };

  render() {
    return (
      <Container>
        <SidebarButton onClick={scrollToTop}>
          About {this.props.candidate.firstName}
        </SidebarButton>
        <TopicsHeading>Topics</TopicsHeading>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="topics">
            {(provided, {isDraggingOver}) => (
              <SidebarTopics
                innerRef={provided.innerRef}
                style={{borderColor: this.props.candidate.color}}
              >
                {this.state.topics.map((topic, index) => (
                  <Draggable
                    key={topic.id}
                    draggableId={topic.id}
                    index={index}
                    isDragDisabled={!this.props.editMode}
                  >
                    {(provided, snapshot) => (
                      <SidebarTopic
                        {...provided.draggableProps}
                        innerRef={provided.innerRef}
                        active={
                          !snapshot.isDragging &&
                          index === this.props.activeTopicIndex
                        }
                      >
                        {this.props.editMode && (
                          <DragHandle {...provided.dragHandleProps}>
                            <DragHandleIcon />
                          </DragHandle>
                        )}
                        <SidebarItem href={`#${topic.slug}`}>
                          {topic.title}
                        </SidebarItem>
                        {!isDraggingOver &&
                          this.props.editMode && (
                            <TopicFormDialogTrigger topic={topic}>
                              <StyledEditButton />
                            </TopicFormDialogTrigger>
                          )}
                      </SidebarTopic>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </SidebarTopics>
            )}
          </Droppable>
        </DragDropContext>
        {this.props.editMode && (
          <TopicFormDialogTrigger
            topic={{
              title: '',
              slug: '',
              description: '',
              election_id: this.props.election.id
            }}
          >
            <AddTopicButton>Add topic...</AddTopicButton>
          </TopicFormDialogTrigger>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  editMode: state.settings.editMode
});

export default connect(mapStateToProps)(Sidebar);
