import Button from '@material-ui/core/Button';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'react-emotion';
import theme from '../theme';
import {BASEMAP_URL} from '../config';
import {Link} from 'react-router-dom';
import {Map, TileLayer} from '@planet/layers';
import {connect} from 'react-redux';

const Container = styled.div({
  display: 'flex',
  flexGrow: 1,
  position: 'relative'
});

const Sidebar = styled.div({
  width: 420,
  padding: theme.spacing.unit * 3
});

const StyledMap = styled(Map)({
  flexGrow: 1,
  backgroundColor: theme.palette.grey[100]
});

class Home extends Component {
  static propTypes = {
    view: PropTypes.object.isRequired
  };

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Informing voters</title>
        </Helmet>
        <Container>
          <Sidebar>
            <Typography>Select an election</Typography>
            <Button component={Link} to="/elections/quebec-2018">
              Quebec
            </Button>
          </Sidebar>
          <StyledMap animation={{duration: 300}} view={this.props.view}>
            <TileLayer url={BASEMAP_URL} />
          </StyledMap>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  view: state.map
});

export default connect(mapStateToProps)(Home);
