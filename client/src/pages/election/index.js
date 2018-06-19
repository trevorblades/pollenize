import Candidate from './candidate';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from './grid';
import Helmet from 'react-helmet';
import NotFound from '../not-found';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import map from 'lodash/map';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  load as loadElection,
  reset as resetElection
} from '../../actions/election';

class Election extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    election: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.dispatch(loadElection(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.dispatch(resetElection());
  }

  render() {
    if (!this.props.election) {
      if (this.props.loading) {
        return <CircularProgress />;
      }
      return <NotFound />;
    }

    return (
      <Fragment>
        <Helmet>
          <title>{this.props.election.title}</title>
        </Helmet>
        <Switch>
          <Route
            path="/elections/:election/:id"
            render={props => {
              const candidates = map(this.props.election.candidates, 'slug');
              const found = candidates.includes(props.match.params.id);
              return found ? <Candidate {...props} /> : <NotFound />;
            }}
          />
          <Route
            render={props => <Grid {...props} election={this.props.election} />}
          />
        </Switch>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  election: state.election.data,
  loading: state.election.loading
});

export default connect(mapStateToProps)(Election);
