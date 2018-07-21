import Footer from '../components/footer';
import Header from '../components/header';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import Section from '../components/section';
import Typography from '@material-ui/core/Typography';
import theme from '../theme';
import {Link} from 'react-router-dom';

const title = 'Page not found';
const NotFound = props => (
  <Fragment>
    {props.page && <Header center />}
    <Section centered>
      <Helmet>
        <title>{title}</title>
      </Helmet>
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
    {props.page && <Footer />}
  </Fragment>
);

NotFound.propTypes = {
  page: PropTypes.bool
};

export default NotFound;
