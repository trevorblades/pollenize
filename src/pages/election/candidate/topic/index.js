import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ChangeButton from './change-button';
import DialogTrigger from '../../../../components/dialog-trigger';
import Divider from '@material-ui/core/Divider';
import EditButton from '../../../../components/edit-button';
import IconButton from '@material-ui/core/IconButton';
import PositionForm from './position-form';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ReplyIcon from '@material-ui/icons/Reply';
import ScrollableAnchor from 'react-scrollable-anchor';
import Section from '../../../../components/section';
import ShareDialog from './share-dialog';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import mapProps from 'recompose/mapProps';
import styled from 'react-emotion';
import theme from '../../../../theme';
import withProps from 'recompose/withProps';
import {STAR_ID_DELIMITER, EMPTY_MESSAGE} from '../../../../constants';
import {TOPIC_MAX_WIDTH, TOPIC_IMAGE_ASPECT_RATIO} from '../common';
import {add as addStar, remove as removeStar} from '../../../../actions/stars';
import {connect} from 'react-redux';
import {getLocalize, getMatchMessage} from '../../../../selectors';
import {size} from 'polished';

const Banner = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: TOPIC_MAX_WIDTH / TOPIC_IMAGE_ASPECT_RATIO,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  h1: {
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 2}px`,
    backgroundColor: theme.palette.common.white
  }
});

const Container = withProps({small: true})(Section);
const InnerContainer = styled.div({display: 'flex'});
const MainContent = styled.div({
  flexGrow: 1
});

const Text = withProps({
  component: 'p',
  variant: 'subheading'
})(Typography);

const TextInner = styled.span(props => ({
  marginRight: theme.spacing.unit / 2,
  color: props.needsTranslation && theme.palette.text.secondary
}));

const Superscript = styled.sup({lineHeight: 1});
const StyledEditButton = styled(EditButton)({verticalAlign: 'top'});

const AlternateContent = styled.div(props => {
  const spacing = theme.spacing.unit * (props.compare ? 5 : 4);
  return {
    flexShrink: 0,
    width: props.compare ? '50%' : 250,
    marginLeft: spacing,
    paddingLeft: spacing,
    borderLeft: `1px solid ${theme.palette.grey[100]}`
  };
});

const Comparate = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing.unit
});

const ComparateAvatar = styled(Avatar)(size(theme.spacing.unit * 3), {
  marginRight: theme.spacing.unit
});

const ComparateName = withProps({variant: 'body2'})(
  styled(Typography)({
    marginRight: 'auto'
  })
);

const Actions = styled.div({
  marginTop: theme.spacing.unit,
  marginLeft: theme.spacing.unit * -1.5,
  color: theme.palette.text.primary
});

const StyledIconButton = withProps({color: 'inherit'})(IconButton);
const Action = styled(Button)({
  marginRight: theme.spacing.unit
});

const PositionFormDialogTrigger = mapProps(props => ({
  children: props.children,
  renderContent: mapProps(closeDialog => ({
    position: props.position,
    onCancel: closeDialog,
    onSuccess: closeDialog
  }))(PositionForm)
}))(DialogTrigger);

const DelayedTooltip = withProps({enterDelay: 500})(Tooltip);

class Topic extends Component {
  static propTypes = {
    candidate: PropTypes.object.isRequired,
    comparates: PropTypes.array.isRequired,
    compareMode: PropTypes.bool.isRequired,
    compareIndex: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    editMode: PropTypes.bool.isRequired,
    localize: PropTypes.func.isRequired,
    matchMessage: PropTypes.func.isRequired,
    stars: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired
  };

  state = {
    more: false,
    shareDialogOpen: false
  };

  get id() {
    return [this.props.candidate.id, this.props.topic.id].join(
      STAR_ID_DELIMITER
    );
  }

  onMoreClick = () =>
    this.setState(prevState => ({
      more: !prevState.more
    }));

  onStarClick = () => {
    const actionCreator = this.props.stars[this.id] ? removeStar : addStar;
    this.props.dispatch(actionCreator(this.id));
  };

  onShareClick = () => this.setState({shareDialogOpen: true});

  closeShareDialog = () => this.setState({shareDialogOpen: false});

  renderTitle(gutterBottom) {
    const {message: title} = this.props.matchMessage(this.props.topic.titles);
    return (
      <Typography gutterBottom={gutterBottom} variant="display1">
        {title.text}
      </Typography>
    );
  }

  renderPosition = (position, index = 0, array = []) => {
    const {message, match} = this.props.matchMessage(position.messages);
    return (
      <Text paragraph={index < array.length - 1} key={position.id}>
        <TextInner needsTranslation={!match}>
          {message.text}
          {position.sources.map(source => (
            <Superscript key={source.id}>
              [<a href="#sources">{source.index + 1}</a>]
            </Superscript>
          ))}
        </TextInner>
        {this.props.editMode && (
          <PositionFormDialogTrigger position={position}>
            <StyledEditButton />
          </PositionFormDialogTrigger>
        )}
      </Text>
    );
  };

  renderPositions(positions) {
    if (!positions.length) {
      return <Text>{this.props.localize(EMPTY_MESSAGE)}</Text>;
    }

    return this.state.more || this.props.editMode
      ? positions.map(this.renderPosition)
      : this.renderPosition(positions[0]);
  }

  renderAlternateContent() {
    if (this.props.compareMode) {
      const comparate = this.props.comparates[this.props.compareIndex];
      const positions = comparate.positions[this.props.topic.id] || [];
      return (
        <AlternateContent compare>
          <Comparate>
            <ComparateAvatar src={comparate.avatar} />
            <ComparateName>{comparate.name}</ComparateName>
            <ChangeButton comparates={this.props.comparates} />
          </Comparate>
          {this.renderPositions(positions)}
        </AlternateContent>
      );
    }

    const {descriptions} = this.props.topic;
    const {message: description} = this.props.matchMessage(descriptions);
    return (
      description && (
        <AlternateContent>
          <Typography>{description.text}</Typography>
        </AlternateContent>
      )
    );
  }

  renderActions(positions) {
    const actions = [];
    if (positions.length) {
      actions.push(
        <DelayedTooltip key="star" title={this.props.localize('I like this')}>
          <StyledIconButton onClick={this.onStarClick}>
            {this.props.stars[this.id] ? <StarIcon /> : <StarBorderIcon />}
          </StyledIconButton>
        </DelayedTooltip>,
        <DelayedTooltip
          key="share"
          title={this.props.localize('Share this position')}
        >
          <StyledIconButton onClick={this.onShareClick}>
            <ReplyIcon />
          </StyledIconButton>
        </DelayedTooltip>
      );
    }

    if (this.props.editMode) {
      actions.push(
        <PositionFormDialogTrigger
          key="add"
          position={{
            text: '',
            sources: [{url: ''}],
            candidate_id: this.props.candidate.id,
            topic_id: this.props.topic.id
          }}
        >
          <Action>{this.props.localize('Add a position')}</Action>
        </PositionFormDialogTrigger>
      );
    } else if (positions.length > 1) {
      const count = positions.length - 1;
      actions.push(
        <Action key="more" onClick={this.onMoreClick}>
          {this.state.more
            ? this.props.localize('Show less')
            : this.props.localize('See more ({{count}})', {count})}
        </Action>
      );
    }

    return actions.length ? <Actions>{actions}</Actions> : null;
  }

  render() {
    const {slug, image} = this.props.topic;
    const positions = this.props.candidate.positions[this.props.topic.id] || [];
    return (
      <ScrollableAnchor id={slug}>
        <div data-topic={slug}>
          {image ? (
            <Banner style={{backgroundImage: `url(${image})`}}>
              {this.renderTitle()}
            </Banner>
          ) : (
            <Divider />
          )}
          <Container>
            {!image && this.renderTitle(true)}
            <InnerContainer>
              <MainContent>
                {this.renderPositions(positions)}
                {this.renderActions(positions)}
              </MainContent>
              {this.renderAlternateContent()}
            </InnerContainer>
          </Container>
          <ShareDialog
            open={this.state.shareDialogOpen}
            onClose={this.closeShareDialog}
            candidate={this.props.candidate}
            topic={this.props.topic}
          />
        </div>
      </ScrollableAnchor>
    );
  }
}

const mapStateToProps = state => ({
  compareMode: state.settings.compareMode.active,
  compareIndex: state.settings.compareMode.index,
  editMode: state.settings.editMode,
  localize: getLocalize(state),
  matchMessage: getMatchMessage(state),
  stars: state.stars
});

export default connect(mapStateToProps)(Topic);
