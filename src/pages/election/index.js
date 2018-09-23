import Candidate from './candidate';
import Candidates from './candidates';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CircularProgress from '@material-ui/core/CircularProgress';
import ElectionHeader from './election-header';
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
import {Link, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCandidates} from '../../selectors';
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

const StyledLink = styled(Link)({
  textDecoration: 'none'
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
            path={`${this.props.match.url}/:id`}
            render={props => {
              const slugs = map(this.props.candidates, 'slug');
              if (slugs.includes(props.match.params.id)) {
                return (
                  <Candidate
                    {...props}
                    renderHeader={title => (
                      <ElectionHeader basePath={this.props.match.url}>
                        <StyledLink to={this.props.match.url}>
                          {this.props.election.title}
                        </StyledLink>
                        <ChevronRightIcon />
                        {title}
                      </ElectionHeader>
                    )}
                  />
                );
              }

              return <NotFound page />;
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

              return (
                <Candidates
                  {...props}
                  basePath={this.props.match.url}
                  renderHeader={() => (
                    <ElectionHeader basePath={this.props.match.url}>
                      {this.props.election.title}
                    </ElectionHeader>
                  )}
                />
              );
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
