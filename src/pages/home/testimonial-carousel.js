import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Paper from '@material-ui/core/Paper';
import MobileStepper from '@material-ui/core/MobileStepper';
import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import city from '../../assets/images/city.jpg';
import galloway from '../../assets/images/galloway.jpg';
import justin from '../../assets/images/justin.jpg';
import leena from '../../assets/images/leena.jpg';
import styled from 'react-emotion';
import theme from '../../theme';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column'
});

const InnerContainer = styled.div({
  padding: theme.spacing.unit,
  margin: -theme.spacing.unit,
  overflow: 'hidden'
});

const Testimonials = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  transition: theme.transitions.create('transform')
});

const padding = theme.spacing.unit * 3.5;
const spacing = padding / 2;
const Testimonial = styled(Paper)({
  flexShrink: 0,
  width: '100%',
  padding,
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
  '*': {
    position: 'relative'
  },
  ':not(:last-child)': {
    marginRight: spacing
  },
  '::before': {
    content: "'“'",
    ...theme.typography.display3,
    color: theme.palette.grey[100],
    position: 'absolute',
    top: spacing / 2,
    left: spacing
  }
});

const Source = styled.div({
  display: 'flex'
});

const SourceText = styled.div({
  marginLeft: theme.spacing.unit
});

const StyledStepper = styled(MobileStepper)({
  marginTop: theme.spacing.unit,
  padding: 0
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
    avatar: galloway
  },
  {
    text:
      "Sifting through a pool of political information on the internet can be overwhelming. But now, there's an app for that.",
    source: 'Leena Latafat',
    title: 'Global News: New political app targets the apathetic and confused',
    avatar: leena
  },
  {
    text:
      "The Pollenize app has presented the candidates' platforms in a readable, friendly, and visually appealing format.",
    source: "Patricia D'Cunha",
    title:
      'CityNews: Toronto municipal election primer websites aim to improve voter engagement',
    avatar: city
  }
];

const maxStep = testimonials.length - 1;
class TestimonialCarousel extends Component {
  state = {
    activeStep: 0
  };

  step = direction =>
    this.setState(prevState => {
      let activeStep = prevState.activeStep + direction;
      if (activeStep < 0) {
        activeStep = maxStep;
      } else if (activeStep > maxStep) {
        activeStep = 0;
      }

      return {activeStep};
    });

  renderButton(next) {
    return (
      <Button size="small" onClick={() => this.step(next ? 1 : -1)}>
        {next ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
      </Button>
    );
  }

  render() {
    const {activeStep} = this.state;
    return (
      <Container>
        <InnerContainer>
          <Testimonials
            style={{
              transform: `translateX(calc(-${100 * activeStep}% - ${spacing *
                activeStep}px))`
            }}
          >
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index.toString()}>
                <Typography paragraph variant="subheading">
                  {testimonial.text}
                </Typography>
                <Source>
                  <Avatar src={testimonial.avatar} />
                  <SourceText>
                    <Typography variant="body2">
                      {testimonial.source}
                    </Typography>
                    <Typography variant="caption">
                      {testimonial.title}
                    </Typography>
                  </SourceText>
                </Source>
              </Testimonial>
            ))}
          </Testimonials>
        </InnerContainer>
        <StyledStepper
          activeStep={activeStep}
          steps={testimonials.length}
          position="static"
          nextButton={this.renderButton(true)}
          backButton={this.renderButton()}
        />
      </Container>
    );
  }
}

export default TestimonialCarousel;
