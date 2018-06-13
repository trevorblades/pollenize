import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import styled from 'react-emotion';
import {BASEMAP_URL} from '../config';
import {Map, TileLayer} from '@planet/layers';
import {connect} from 'react-redux';
import {position} from 'polished';
import {setView} from '../actions/map';

const Container = styled.div({
  flexGrow: 1,
  position: 'relative'
});

const StyledMap = styled(Map)(position('absolute', 0));

class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    view: PropTypes.object.isRequired
  };

  onViewChange = view => this.props.dispatch(setView(view));

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Informing voters</title>
        </Helmet>
        <Container>
          <StyledMap view={this.props.view} onViewChange={this.onViewChange}>
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
