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
        return (
          <Loading>
            <StyledCircularProgress />
            <Typography color="inherit" variant="title">
              Loading election...
            </Typography>
          </Loading>
        );
      }

      return (
        <Fragment>
          <Header centered />
          <NotFound />
          <Footer />
        </Fragment>
      );
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
  lastSuccess: state.election.lastSuccess
});

export default connect(mapStateToProps)(Election);
