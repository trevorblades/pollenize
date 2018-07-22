import Candidate from './candidate';
import Candidates from './candidates';
import CircularProgress from '@material-ui/core/CircularProgress';
import Helmet from 'react-helmet';
import NotFound from '../not-found';
import PrintableTable from './printable-table';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import SuccessMessage from './success-message';
import Typography from '@material-ui/core/Typography';
import map from 'lodash/map';
import querystring from 'querystring';
import styled from 'react-emotion';
import theme from '../../theme';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  load as loadElection,
  reset as resetElection
} from '../../actions/election';
import {getCandidates} from '../../selectors';

const Loading = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  color: theme.palette.grey[500],
  backgroundColor: theme.palette.grey[100]
});

const StyledCircularProgress = styled(CircularProgress)({
  marginBottom: theme.spacing.unit * 2
});

class Election extends Component {
  static propTypes = {
    candidates: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    election: PropTypes.object,
    lastSuccess: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    user: PropTypes.object
  };

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prevProps) {
    const hasUser = Boolean(this.props.user);
    const didHaveUser = Boolean(prevProps.user);
    if (hasUser !== didHaveUser) {
      this.load();
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetElection());
  }

  load() {
    this.props.dispatch(loadElection(this.props.match.params.id));
  }

  render() {
    if (!this.props.election) {
      if (this.props.loading) {
        return (
          <Loading>
            <StyledCircularProgress />
            <Typography color="inherit" variant="title">
              Loading election...
            </Typography>
          </Loading>
        );
      }

      return <NotFound page />;
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
              const slugs = map(this.props.candidates, 'slug');
              const found = slugs.includes(props.match.params.id);
              return found ? <Candidate {...props} /> : <NotFound page />;
            }}
          />
          <Route
            render={props => {
              if (props.location.search) {
                const query = props.location.search.slice(1);
                const {printable} = querystring.parse(query);
                if (printable === 'true') {
                  return <PrintableTable />;
                }
              }

              return <Candidates {...props} />;
            }}
          />
        </Switch>
        {this.props.lastSuccess && (
          <SuccessMessage key={this.props.lastSuccess} />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  candidates: getCandidates(state),
  election: state.election.data,
  lastSuccess: state.election.lastSuccess,
  loading: state.election.loading,
  user: state.user.data
});

export default connect(mapStateToProps)(Election);
