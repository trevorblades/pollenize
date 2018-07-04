import CircularProgress from '@material-ui/core/CircularProgress';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Section from '../components/section';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {load as loadElections} from '../actions/elections';

const title = 'Elections';
class Elections extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    elections: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.dispatch(loadElections());
  }

  renderContent() {
    if (!this.props.elections.length) {
      if (this.props.loading) {
        return <CircularProgress />;
      }
      return <Typography variant="headline">No elections found</Typography>;
    }

    return this.props.elections.map(election => (
      <Link key={election.id} to={`/elections/${election.slug}`}>
        {election.title}
      </Link>
    ));
  }

  render() {
    return (
      <Section centered>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Typography gutterBottom variant="display3">
          {title}
        </Typography>
        {this.renderContent()}
      </Section>
    );
  }
}

const mapStateToProps = state => ({
  elections: state.elections.data,
  loading: state.elections.loading
});

export default connect(mapStateToProps)(Elections);
