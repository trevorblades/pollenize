import PropTypes from 'prop-types';
import React from 'react';
import Section from '../../../components/section';
import Typography from '@material-ui/core/Typography';
import defaultProps from 'recompose/withProps';
import differenceInYears from 'date-fns/differenceInYears';

const Text = defaultProps({
  component: 'p',
  variant: 'subheading',
  gutterBottom: true
})(Typography);

const now = Date.now();
const unknown = 'Unknown';
const Bio = props => (
  <Section small>
    <Typography gutterBottom variant="display1">
      About {props.candidate.firstName}
    </Typography>
    <Text>
      Age:{' '}
      {props.candidate.birth_date
        ? `${differenceInYears(now, props.candidate.birth_date)} years`
        : unknown}
    </Text>
    <Text>Hometown: {props.candidate.hometown || unknown}</Text>
    {props.candidate.bio && (
      <Text gutterBottom={false}>{props.candidate.bio}</Text>
    )}
  </Section>
);

Bio.propTypes = {
  candidate: PropTypes.object.isRequired
};

export default Bio;
