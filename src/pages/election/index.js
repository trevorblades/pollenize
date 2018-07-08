import Candidate from './candidate';
import Candidates from './candidates';
import CircularProgress from '@material-ui/core/CircularProgress';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Helmet from 'react-helmet';
import NotFound from '../not-found';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import SuccessMessage from './success-message';
import Typography from '@material-ui/core/Typography';
import map from 'lodash/map';
import styled from 'react-emotion';
import theme from '../../theme';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  load as loadElection,
  reset as resetElection
} from '../../actions/election';

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

const NotFoundPage = () => (
  <Fragment>
    <Header centered />
    <NotFound />
    <Footer />
  </Fragment>
);

class Election extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    election: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    lastSuccess: PropTypes.string,
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

      return <NotFoundPage />;
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
              return found ? <Candidate {...props} /> : <NotFoundPage />;
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
  lastSuccess: state.election.lastSuccess,
  user: state.user.data
});

export default connect(mapStateToProps)(Election);
