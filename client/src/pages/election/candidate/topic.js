import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import MainContent from './main-content';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// import montreal from '../../../assets/images/montreal.jpg';
import styled from 'react-emotion';
import theme from '../../../theme';
import withProps from 'recompose/withProps';
import {size} from 'polished';

export const sectionVerticalPadding = theme.spacing.unit * 5;
const sectionHorizontalPadding = theme.spacing.unit * 6;
const Section = styled.div({
  padding: `${sectionVerticalPadding}px ${sectionHorizontalPadding}px`
});

const Headline = withProps({
  gutterBottom: true,
  variant: 'headline'
})(
  styled(Typography)({
    display: 'flex',
    alignItems: 'center'
  })
);

const EditButton = styled(IconButton)(size(theme.spacing.unit * 5), {
  marginLeft: theme.spacing.unit / 2
});

const SectionContent = styled.div({
  display: 'flex'
});

const SectionMainContent = styled.div({
  flexGrow: 1,
  maxWidth: 720
});

const alternateContentWidth = 250;
const alternateContentPadding = theme.spacing.unit * 4;
const SectionAlternateContent = styled.div({
  flexShrink: 0,
  width: alternateContentWidth,
  marginLeft: alternateContentPadding,
  paddingLeft: alternateContentPadding,
  borderLeft: `1px dashed ${theme.palette.grey[200]}`
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

const FullWidthTextField = withProps({
  fullWidth: true,
  margin: 'dense'
})(TextField);

class Topic extends Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    positions: PropTypes.array,
    sources: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
  };

  static defaultProps = {
    positions: []
  };

  state = {
    dialogOpen: false
  };

  onEditClick = () => this.setState({dialogOpen: true});

  closeDialog = () => this.setState({dialogOpen: false});

  render() {
    return (
      <Fragment>
        <Section>
          <Headline>
            <span>{this.props.title}</span>
            <EditButton onClick={this.onEditClick}>
              <EditIcon />
            </EditButton>
          </Headline>
          <SectionContent>
            <SectionMainContent>
              {this.props.positions && (
                <MainContent
                  positions={this.props.positions}
                  sources={this.props.sources}
                />
              )}
            </SectionMainContent>
            <SectionAlternateContent>
              <Typography>{this.props.description}</Typography>
            </SectionAlternateContent>
          </SectionContent>
        </Section>
        {/* <ImageContainer>
          <ImageCaption>Photo by Marc-Olivier Jodoin on Unsplash</ImageCaption>
          <StyledImage src={montreal} />
        </ImageContainer> */}
        <Dialog
          fullWidth
          open={this.state.dialogOpen}
          onClose={this.closeDialog}
        >
          <DialogTitle>Edit positions for topic</DialogTitle>
          <DialogContent>
            <DialogContentText>Test</DialogContentText>
            {this.props.positions.map(position => (
              <Fragment key={position.id}>
                <FullWidthTextField multiline value={position.text} />
                {position.sources.map(source => (
                  <FullWidthTextField key={source.id} value={source.url} />
                ))}
              </Fragment>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog}>Cancel</Button>
            <Button color="primary">Save changes</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default Topic;
