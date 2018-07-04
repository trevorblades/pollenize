import Helmet from 'react-helmet';
import React, {Fragment} from 'react';
import Section from '../components/section';
import Typography from '@material-ui/core/Typography';
import theme from '../theme';
import {Link} from 'react-router-dom';

const title = 'Page not found';
const NotFound = () => (
  <Fragment>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <Section centered>
      <Typography gutterBottom variant="display3">
        {title} 🤦‍
      </Typography>
      <Typography
        variant="headline"
        style={{maxWidth: theme.breakpoints.values.sm}}
      >
        Oops! We couldn&apos;t find the page you&apos;re looking for. Try
        starting over <Link to="/">from home</Link>.
      </Typography>
    </Section>
  </Fragment>
);

export default NotFound;
