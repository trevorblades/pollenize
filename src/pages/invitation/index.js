import CreateUserForm from './create-user-form';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Section from '../../components/section';
import Typography from '@material-ui/core/Typography';
import jwtDecode from 'jwt-decode';
import querystring from 'querystring';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const title = 'Create your account';
class Invitation extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    user: PropTypes.object
  };

  constructor(props) {
    super(props);

    let invitation;
    const {token} = querystring.parse(props.location.search.slice(1));
    if (token) {
      try {
        invitation = jwtDecode(token);
        invitation.token = token;
      } catch (error) {
        // pass through
      }
    }

    this.state = {
      invitation
    };
  }

  render() {
    if (this.props.user) {
      return <Redirect replace to="/" />;
    }

    return (
      <Section centered narrow>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Typography gutterBottom variant="display3">
          {title}
        </Typography>
        {this.state.invitation ? (
          <CreateUserForm invitation={this.state.invitation} />
        ) : (
          <Typography variant="subheading">Invalid token</Typography>
        )}
      </Section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data
});

export default connect(mapStateToProps)(Invitation);
