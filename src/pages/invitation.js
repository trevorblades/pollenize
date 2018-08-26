import Button from '@material-ui/core/Button';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import Section from '../components/section';
import Typography from '@material-ui/core/Typography';
import jwtDecode from 'jwt-decode';
import querystring from 'querystring';
import withProps from 'recompose/withProps';
import {FormField} from '../components/form';

const ReadOnlyField = withProps({
  disabled: true,
  readOnly: true
})(FormField);

const title = 'Create your account';
class Invitation extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    let invitation;
    const {token} = querystring.parse(props.location.search.slice(1));
    if (token) {
      try {
        invitation = jwtDecode(token);
      } catch (error) {
        // pass through
      }
    }

    this.state = {
      invitation
    };
  }

  onSubmit = event => {
    event.preventDefault();
  };

  renderContent() {
    if (!this.state.invitation) {
      <Typography variant="subheading">Invalid token</Typography>;
    }

    const {email, name, organization} = this.state.invitation;
    return (
      <form onSubmit={this.onSubmit}>
        <ReadOnlyField label="Email" value={email} />
        <ReadOnlyField label="Name" value={name} />
        <ReadOnlyField label="Organization" value={organization.name} />
        <FormField name="password" label="Choose a password" />
        <FormField name="password_confirm" label="Confirm your password" />
        <Button color="primary" variant="raised" size="large" type="submit">
          Create account
        </Button>
      </form>
    );
  }

  render() {
    return (
      <Fragment>
        <Section centered>
          <Helmet>
            <title>{title}</title>
          </Helmet>
          <Typography gutterBottom variant="display3">
            {title}
          </Typography>
          {this.renderContent()}
        </Section>
      </Fragment>
    );
  }
}

export default Invitation;
