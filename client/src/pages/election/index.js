import Candidate from './candidate';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from './grid';
import NotFound from '../not-found';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import find from 'lodash/find';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {load as loadElection} from '../../actions/election';

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

  render() {
    if (!this.props.election) {
      if (this.props.loading) {
        return <CircularProgress />;
      }
      return <NotFound />;
    }

    return (
      <Fragment>
        <Switch>
          <Route
            path="/elections/:election/:id"
            render={props => {
              const candidate = find(this.props.election.candidates, [
                'slug',
                props.match.params.id
              ]);

              if (!candidate) {
                return <NotFound />;
              }

              return (
                <Candidate
                  {...props}
                  candidate={candidate}
                  election={this.props.election}
                />
              );
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
