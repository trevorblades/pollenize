import ButtonBase from '@material-ui/core/ButtonBase';
import EditButton from '../../../../components/edit-button';
import DialogTrigger from '../../../../components/dialog-trigger';
import DragInteractionIcon from '../../../../assets/icons/drag-interaction.svg';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
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
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove
} from 'react-sortable-hoc';
import {connect} from 'react-redux';
import {getLocalize} from '../../../../selectors';
import {reorder as reorderTopics} from '../../../../actions/topics';
import {scrollToTop} from '../../../../util';
import {size} from 'polished';
import {getMessageOrUntranslated} from '../../../../util/messages';

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

const NotLastBottomMargin = styled.div({
  ':not(:last-child)': {
    marginBottom: theme.spacing.unit
  }
});

const SidebarTopics = SortableContainer(
  styled(NotLastBottomMargin)({width: '100%'})
);

const StyledEditButton = styled(EditButton)({
  marginLeft: 'auto'
});

const SidebarTopic = SortableElement(
  styled(NotLastBottomMargin)(props => ({
    display: 'flex',
    alignItems: 'flex-start',
    paddingRight: theme.spacing.unit / 2,
    borderRightWidth: 3,
    borderRightStyle: 'solid',
    borderColor: props.active ? 'inherit' : 'transparent',
    position: 'relative',
    [`:not(:hover) ${StyledEditButton}`]: {
      display: 'none'
    }
  }))
);

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

const DragHandle = SortableHandle(
  styled.div({
    position: 'absolute',
    right: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    svg: css(size(theme.spacing.unit * 2), {
      display: 'block',
      fill: theme.palette.grey[300]
    })
  })
);

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
    dispatch: PropTypes.func.isRequired,
    editMode: PropTypes.bool.isRequired,
    election: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    localize: PropTypes.func.isRequired
  };

  state = {
    sorting: false
  };

  onSortStart = () => this.setState({sorting: true});

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({sorting: false});

    const topics = arrayMove(this.props.election.topics, oldIndex, newIndex);
    this.props.dispatch(reorderTopics(topics));
  };

  render() {
    return (
      <Container>
        <SidebarButton onClick={scrollToTop}>
          {this.props.localize('About')} {this.props.candidate.firstName}
        </SidebarButton>
        <TopicsHeading>{this.props.localize('Topics')}</TopicsHeading>
        <SidebarTopics
          useDragHandle
          onSortStart={this.onSortStart}
          onSortEnd={this.onSortEnd}
          style={{borderColor: this.props.candidate.color}}
        >
          {this.props.election.topics.map((topic, index) => {
            const {message} = getMessageOrUntranslated(
              topic.titles,
              this.props.language,
              this.props.election.languages
            );
            return (
              <SidebarTopic
                key={topic.id}
                index={index}
                active={
                  !this.state.sorting && index === this.props.activeTopicIndex
                }
              >
                <SidebarItem href={`#${topic.slug}`}>
                  {message.text}
                </SidebarItem>
                {this.props.editMode && (
                  <Fragment>
                    <DragHandle>
                      <DragInteractionIcon />
                    </DragHandle>
                    {!this.state.sorting && (
                      <TopicFormDialogTrigger topic={topic}>
                        <StyledEditButton />
                      </TopicFormDialogTrigger>
                    )}
                  </Fragment>
                )}
              </SidebarTopic>
            );
          })}
        </SidebarTopics>
        {this.props.editMode && (
          <TopicFormDialogTrigger
            topic={{
              title: '',
              slug: '',
              description: '',
              election_id: this.props.election.id
            }}
          >
            <AddTopicButton>
              {this.props.localize('Add topic...')}
            </AddTopicButton>
          </TopicFormDialogTrigger>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  editMode: state.settings.editMode,
  language: state.settings.language,
  localize: getLocalize(state)
});

export default connect(mapStateToProps)(Sidebar);
