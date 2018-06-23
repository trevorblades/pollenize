import NewPositionButton from './new-position-button';
import Position from './position';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
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
                <Position key={position.id} position={position} />
              ))}
            {this.props.editMode && (
              <NewPositionButton
                candidate={this.props.candidate}
                topic={this.props.topic}
              />
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
