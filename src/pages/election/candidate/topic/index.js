import Button from '@material-ui/core/Button';
import EditButton from '../../../../components/edit-button';
import FormDialogTrigger from '../../../../components/form-dialog-trigger';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import PositionForm from './position-form';
import Typography from '@material-ui/core/Typography';
import mapProps from 'recompose/mapProps';
import styled from 'react-emotion';
import theme from '../../../../theme';
import withProps from 'recompose/withProps';
import {connect} from 'react-redux';
import {
  SECTION_MAX_WIDTH,
  TOPIC_IMAGE_ASPECT_RATIO,
  sectionClassName
} from '../common';

const Banner = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: SECTION_MAX_WIDTH / TOPIC_IMAGE_ASPECT_RATIO,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  h1: {
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 2}px`,
    backgroundColor: theme.palette.common.white
  }
});

const Container = styled.section(sectionClassName);
const InnerContainer = styled.div({display: 'flex'});
const MainContent = styled.div({
  flexGrow: 1
});

const Text = withProps({
  component: 'p',
  variant: 'subheading'
})(Typography);

const Superscript = styled.sup({lineHeight: 1});
const StyledEditButton = styled(EditButton)({
  marginLeft: theme.spacing.unit / 2,
  verticalAlign: 'top'
});

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
  form: <PositionForm position={props.position} />
}))(FormDialogTrigger);

class Topic extends Component {
  static propTypes = {
    candidate: PropTypes.object.isRequired,
    editMode: PropTypes.bool.isRequired,
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
      <Typography gutterBottom={gutterBottom} variant="headline">
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
    return positions.map((position, index, array) => (
      <Text paragraph={index < array.length - 1} key={position.id}>
        {position.text}
        {position.sources.map(source => (
          <Superscript key={source.id}>
            [<a href="#sources">{source.index + 1}</a>]
          </Superscript>
        ))}
        {this.props.editMode && (
          <PositionFormDialogTrigger position={position}>
            <StyledEditButton />
          </PositionFormDialogTrigger>
        )}
      </Text>
    ));
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
            : `Read more (${this.props.positions.length - 1})`}
        </Action>
      );
    }

    return actions.length ? <Actions>{actions}</Actions> : null;
  }

  render() {
    return (
      <Fragment>
        {this.props.topic.image && (
          <Banner style={{backgroundImage: `url(${this.props.topic.image})`}}>
            {this.renderTitle()}
          </Banner>
        )}
        <Container>
          {!this.props.topic.image && this.renderTitle(true)}
          <InnerContainer>
            <MainContent>
              {this.renderPositions()}
              {this.renderActions()}
            </MainContent>
            {this.props.topic.description && (
              <AlternateContent>
                <Typography>{this.props.topic.description}</Typography>
              </AlternateContent>
            )}
          </InnerContainer>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  editMode: state.settings.editMode
});

export default connect(mapStateToProps)(Topic);
