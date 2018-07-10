import Button from '@material-ui/core/Button';
import EditButton from '../../../../components/edit-button';
import DialogTrigger from '../../../../components/dialog-trigger';
import PositionForm from './position-form';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import ScrollableAnchor from 'react-scrollable-anchor';
import Section from '../../../../components/section';
import Typography from '@material-ui/core/Typography';
import mapProps from 'recompose/mapProps';
import styled from 'react-emotion';
import theme from '../../../../theme';
import withProps from 'recompose/withProps';
import {TOPIC_MAX_WIDTH, TOPIC_IMAGE_ASPECT_RATIO} from '../common';
import {connect} from 'react-redux';
import {getLocalize} from '../../../../selectors';

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

const alternateContentWidth = 250;
const alternateContentPadding = theme.spacing.unit * 4;
const AlternateContent = styled.div({
  flexShrink: 0,
  width: alternateContentWidth,
  marginLeft: alternateContentPadding,
  paddingLeft: alternateContentPadding,
  borderLeft: `1px solid ${theme.palette.grey[100]}`
});

const actionsMargin = theme.spacing.unit * 2;
const Actions = styled.div({
  marginTop: actionsMargin,
  marginLeft: -actionsMargin
});

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

class Topic extends Component {
  static propTypes = {
    candidate: PropTypes.object.isRequired,
    editMode: PropTypes.bool.isRequired,
    election: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    localize: PropTypes.func.isRequired,
    positions: PropTypes.array,
    topic: PropTypes.object.isRequired
  };

  static defaultProps = {
    positions: []
  };

  state = {
    more: false
  };

  onMoreClick = () =>
    this.setState(prevState => ({
      more: !prevState.more
    }));

  renderTitle(gutterBottom) {
    return (
      <Typography gutterBottom={gutterBottom} variant="display1">
        {this.props.topic.title}
      </Typography>
    );
  }

  renderPositions() {
    if (!this.props.positions.length) {
      return <Text>No official stance has been taken on this topic.</Text>;
    }

    const positions =
      this.state.more || this.props.editMode
        ? this.props.positions
        : [this.props.positions[0]];
    return positions.map((position, index, array) => {
      let needsTranslation = false;
      let message = position.messages[this.props.language];
      if (!message) {
        needsTranslation = true;

        const {languages} = this.props.election;
        for (let i = 0; i < languages.length; i++) {
          message = position.messages[languages[i].code];
          if (message) {
            break;
          }
        }
      }

      return (
        <Text paragraph={index < array.length - 1} key={position.id}>
          <TextInner needsTranslation={needsTranslation}>
            {message ? (
              <Fragment>
                {message.text}
                {position.sources.map(source => (
                  <Superscript key={source.id}>
                    [<a href="#sources">{source.index + 1}</a>]
                  </Superscript>
                ))}
              </Fragment>
            ) : (
              this.props.localize('Translation needed')
            )}
          </TextInner>
          {this.props.editMode && (
            <PositionFormDialogTrigger position={position}>
              <StyledEditButton />
            </PositionFormDialogTrigger>
          )}
        </Text>
      );
    });
  }

  renderActions() {
    const actions = [];
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
          <Action>Add a position</Action>
        </PositionFormDialogTrigger>
      );
    } else if (this.props.positions.length > 1) {
      actions.push(
        <Action key="more" onClick={this.onMoreClick}>
          {this.state.more
            ? 'Show less'
            : `See more (${this.props.positions.length - 1})`}
        </Action>
      );
    }

    return actions.length ? <Actions>{actions}</Actions> : null;
  }

  render() {
    const {slug, image, description} = this.props.topic;
    return (
      <ScrollableAnchor id={slug}>
        <div data-topic={slug}>
          {image && (
            <Banner style={{backgroundImage: `url(${image})`}}>
              {this.renderTitle()}
            </Banner>
          )}
          <Container>
            {!image && this.renderTitle(true)}
            <InnerContainer>
              <MainContent>
                {this.renderPositions()}
                {this.renderActions()}
              </MainContent>
              {description && (
                <AlternateContent>
                  <Typography>{description}</Typography>
                </AlternateContent>
              )}
            </InnerContainer>
          </Container>
        </div>
      </ScrollableAnchor>
    );
  }
}

const mapStateToProps = state => ({
  editMode: state.settings.editMode,
  election: state.election.data,
  language: state.settings.language,
  localize: getLocalize(state)
});

export default connect(mapStateToProps)(Topic);
