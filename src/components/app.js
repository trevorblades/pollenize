import CssBaseline from '@material-ui/core/CssBaseline';
import Election from '../pages/election';
import Helmet from 'react-helmet';
import Pages from '../pages';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import compose from 'recompose/compose';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {hot} from 'react-hot-loader';
import {renewToken} from '../actions/user';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  componentDidMount() {
    if (this.props.user) {
      this.props.dispatch(renewToken(this.props.user.token));
    }
  }

  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Helmet defaultTitle={APP_TITLE} titleTemplate={`%s · ${APP_TITLE}`} />
        <Switch>
          <Route path="/elections/:id" component={Election} />
          <Route component={Pages} />
        </Switch>
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
