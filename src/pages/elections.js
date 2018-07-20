import ButtonBase from '@material-ui/core/ButtonBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Section from '../components/section';
import Typography from '@material-ui/core/Typography';
import defaultProps from 'recompose/defaultProps';
import styled, {css} from 'react-emotion';
import theme from '../theme';
import withProps from 'recompose/withProps';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {load as loadElections} from '../actions/elections';

const ElectionButton = withProps({component: Link})(
  styled(ButtonBase)({
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing.unit * 6,
    color: theme.palette.grey[50],
    backgroundColor: theme.palette.grey[900]
  })
);

const Flag = styled.img({
  display: 'block',
  height: theme.spacing.unit * 5,
  marginBottom: theme.spacing.unit * 2
});

const height = theme.spacing.unit * 2.5;
const Status = defaultProps({
  color: 'inherit',
  variant: 'caption'
})(
  styled(Typography)({
    height,
    padding: `0 ${theme.spacing.unit * 2}px`,
    borderRadius: height / 2,
    lineHeight: `${height}px`,
    backgroundColor: theme.palette.grey[800]
  })
);

const activeStatusClassName = css({
  backgroundColor: theme.palette.primary[500]
});

const title = 'Elections';
const today = new Date();
today.setHours(0, 0, 0, 0);

class Elections extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    elections: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
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

  load() {
    this.props.dispatch(loadElections());
  }

  renderContent() {
    if (!this.props.elections.length) {
      if (this.props.loading) {
        return <CircularProgress />;
      }
      return <Typography variant="headline">No elections found</Typography>;
    }

    return (
      <Grid container spacing={theme.spacing.unit * 3}>
        {this.props.elections.map(election => {
          const active = today.getTime() <= Date.parse(election.ends_at);
          return (
            <Grid item key={election.id} xs={12} sm={6} md={4} lg={3}>
              <ElectionButton to={`/elections/${election.slug}`}>
                <Flag src={election.flag} />
                <Typography gutterBottom color="inherit" variant="title">
                  {election.title}
                </Typography>
                <Status className={active && activeStatusClassName}>
                  {active ? 'Active' : 'Concluded'}
                </Status>
              </ElectionButton>
            </Grid>
          );
        })}
      </Grid>
    );
  }

  render() {
    return (
      <Section centered>
        <Helmet>
          <title>Elections</title>
        </Helmet>
        <Typography gutterBottom variant="display3">
          Election guides
        </Typography>
        {this.renderContent()}
      </Section>
    );
  }
}

const mapStateToProps = state => ({
  elections: state.elections.data,
  loading: state.elections.loading,
  user: state.user.data
});

export default connect(mapStateToProps)(Elections);
