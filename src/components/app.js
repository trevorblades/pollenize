import CssBaseline from '@material-ui/core/CssBaseline';
import Election from '../pages/election';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import ReactGA from 'react-ga';
import compose from 'recompose/compose';
import {connect} from 'react-redux';
import {hot} from 'react-hot-loader';
import {renew as renewUser} from '../actions/user';
import {withRouter} from 'react-router-dom';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    user: PropTypes.object
  };

  componentDidMount() {
    const {pathname, search} = this.props.location;
    ReactGA.pageview(pathname + search);
    if (this.props.user) {
      this.props.dispatch(renewUser(this.props.user));
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      ReactGA.pageview(this.props.location.pathname);
    }
  }

  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Helmet defaultTitle={TITLE} titleTemplate={`%s · ${TITLE}`} />
        <Election
          match={{
            url: '',
            params: {
              id: 'quebec-2018'
            }
          }}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data
});

export default compose(
  hot(module),
  withRouter,
  connect(mapStateToProps)
)(App);
