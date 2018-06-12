import Helmet from 'react-helmet';
import React, {Fragment} from 'react';

const NotFound = () => (
  <Fragment>
    <Helmet>
      <title>Not found</title>
    </Helmet>
    <div>Not found</div>
  </Fragment>
);

export default NotFound;
