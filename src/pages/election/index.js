import Candidate from './candidate';
import Candidates from './candidates';
import CircularProgress from '@material-ui/core/CircularProgress';
import Helmet from 'react-helmet';
import NotFound from '../not-found';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import SuccessMessage from './success-message';
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
    match: PropTypes.object.isRequired,
    lastSuccess: PropTypes.string
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
              const slugs = map(this.props.election.candidates, 'slug');
              const found = slugs.includes(props.match.params.id);
              return found ? <Candidate {...props} /> : <NotFound />;
            }}
          />
          <Route component={Candidates} />
        </Switch>
        {this.props.lastSuccess && (
          <SuccessMessage key={this.props.lastSuccess} />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  election: state.election.data,
  loading: state.election.loading,
  lastSuccess: state.lastSuccess
});

export default connect(mapStateToProps)(Election);
