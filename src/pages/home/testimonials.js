import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Paper from '@material-ui/core/Paper';
import MobileStepper from '@material-ui/core/MobileStepper';
import React, {Component, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import justin from '../../assets/images/justin.jpg';
import styled from 'react-emotion';
import theme from '../../theme';

const padding = theme.spacing.unit * 3;
const Testimonial = styled(Paper)({
  padding,
  position: 'relative',
  '*': {
    position: 'relative'
  },
  '::before': {
    content: "'“'",
    ...theme.typography.display3,
    color: theme.palette.grey[100],
    position: 'absolute',
    top: 0,
    left: padding / 2
  }
});

const Source = styled.div({
  display: 'flex'
});

const SourceText = styled.div({
  marginLeft: theme.spacing.unit
});

const testimonials = [
  {
    text:
      'Pollenize is doing great work getting young people engaged & letting everyone know where the parties stand.',
    source: 'Justin Trudeau',
    title: 'Prime Minister of Canada',
    avatar: justin
  },
  {
    text:
      "You'd be forgiven if you can't remember where each [candidate] stands on the big issues. Pollenize is a site that is trying to make it easier for voters.",
    source: 'Matt Galloway',
    title: 'Metro Morning: Where Do They Stand?',
    avatar: justin
  },
  {
    text:
      "Sifting through a pool of political information on the internet can be overwhelming. But now, there's an app for that.",
    source: 'Leena Latafat',
    title: 'New political app targets the apathetic and confused',
    avatar: justin
  },
  {
    text:
      "The Pollenize app has presented the candidates' platforms in a readable, friendly, and visually appealing format.",
    source: "Patricia D'Cunha",
    title:
      'Toronto municipal election primer websites aim to improve voter engagement',
    avatar: justin
  }
];

class Testimonials extends Component {
  state = {
    activeStep: 0
  };

  step = direction =>
    this.setState(prevState => ({
      activeStep: prevState.activeStep + direction
    }));

  renderButton(next) {
    return (
      <IconButton
        disabled={
          next
            ? this.state.activeStep === testimonials.length - 1
            : !this.state.activeStep
        }
        onClick={() => this.step(next ? 1 : -1)}
      >
        {next ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
    );
  }

  render() {
    const testimonial = testimonials[this.state.activeStep];
    return (
      <Fragment>
        <MobileStepper
          activeStep={this.state.activeStep}
          steps={testimonials.length}
          position="static"
          nextButton={this.renderButton(true)}
          backButton={this.renderButton()}
        />
        <Testimonial>
          <Typography paragraph variant="subheading">
            {testimonial.text}
          </Typography>
          <Source>
            <Avatar src={testimonial.avatar} />
            <SourceText>
              <Typography variant="body2">{testimonial.source}</Typography>
              <Typography variant="caption">{testimonial.title}</Typography>
            </SourceText>
          </Source>
        </Testimonial>
      </Fragment>
    );
  }
}

export default Testimonials;
