import Button from '@material-ui/core/Button';
import DialogButton from '../../../../components/dialog-button';
import EditButton from '../../../../components/edit-button';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import PositionForm from './position-form';
import Typography from '@material-ui/core/Typography';
import mapProps from 'recompose/mapProps';
// import montreal from '../../../assets/images/montreal.jpg';
import styled from 'react-emotion';
import theme from '../../../../theme';
import {connect} from 'react-redux';

const SectionContent = styled.div({
  display: 'flex'
});

const SectionMainContent = styled.div({
  flexGrow: 1
});

const StyledSup = styled.sup({lineHeight: 1});
const StyledEditButton = styled(EditButton)({
  marginLeft: theme.spacing.unit / 2,
  verticalAlign: 'top'
});

const alternateContentWidth = 250;
const alternateContentPadding = theme.spacing.unit * 4;
const SectionAlternateContent = styled.div({
  flexShrink: 0,
  width: alternateContentWidth,
  marginLeft: alternateContentPadding,
  paddingLeft: alternateContentPadding,
  borderLeft: `1px solid ${theme.palette.grey[100]}`
});

// const ImageContainer = styled.div({
//   display: 'flex',
//   alignItems: 'flex-end',
//   justifyContent: 'flex-end',
//   padding: `0 ${sectionHorizontalPadding}px`,
//   '::after': {
//     content: "''",
//     flexGrow: 1,
//     maxWidth: alternateContentWidth / 2
//   }
// });

// const ImageCaption = withProps({variant: 'caption'})(
//   styled(Typography)({
//     maxWidth: 150,
//     marginRight: theme.spacing.unit * 1.5,
//     textAlign: 'right'
//   })
// );

// const StyledImage = styled.img({
//   maxWidth: 480
// });

const PositionDialogButton = mapProps(props => ({
  children: props.children,
  form: React.createElement(PositionForm, {position: props.position})
}))(DialogButton);

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

  render() {
    return (
      <Fragment>
        <Typography gutterBottom variant="headline">
          {this.props.topic.title}
        </Typography>
        <SectionContent>
          <SectionMainContent>
            {this.props.positions &&
              this.props.positions.map(position => (
                <Typography paragraph key={position.id} variant="subheading">
                  {position.text}
                  {position.sources.map(source => (
                    <StyledSup key={source.id}>
                      [<a href="#sources">{source.index + 1}</a>]
                    </StyledSup>
                  ))}
                  {this.props.editMode && (
                    <PositionDialogButton position={position}>
                      <StyledEditButton />
                    </PositionDialogButton>
                  )}
                </Typography>
              ))}
            {this.props.editMode && (
              <PositionDialogButton
                position={{
                  text: '',
                  sources: [{url: ''}],
                  candidate_id: this.props.candidate.id,
                  topic_id: this.props.topic.id
                }}
              >
                <Button>Add a position</Button>
              </PositionDialogButton>
            )}
          </SectionMainContent>
          <SectionAlternateContent>
            <Typography>{this.props.topic.description}</Typography>
          </SectionAlternateContent>
        </SectionContent>
        {/* <ImageContainer>
          <ImageCaption>Photo by Marc-Olivier Jodoin on Unsplash</ImageCaption>
          <StyledImage src={montreal} />
        </ImageContainer> */}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  editMode: state.settings.editMode
});

export default connect(mapStateToProps)(Topic);
