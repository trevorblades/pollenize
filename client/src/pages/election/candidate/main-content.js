import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import cropUrl from 'crop-url';
import findIndex from 'lodash/findIndex';
import flatMap from 'lodash/flatMap';
import prependHttp from 'prepend-http';
import styled from 'react-emotion';
import theme from '../../../theme';
import withProps from 'recompose/withProps';

const sourceSpacing = theme.spacing.unit;
const Source = withProps({
  clickable: true,
  component: 'a'
})(
  styled(Chip)({
    marginBottom: sourceSpacing,
    backgroundColor: theme.palette.grey[50],
    ':hover': {
      backgroundColor: theme.palette.grey[100]
    },
    ':not(:last-child)': {
      marginRight: sourceSpacing
    }
  })
);

const Sources = styled.div({
  marginBottom: -sourceSpacing
});

class MainContent extends Component {
  static propTypes = {
    positions: PropTypes.array.isRequired,
    sources: PropTypes.array.isRequired
  };

  onReadMoreClick = event => event.preventDefault();

  findSourceIndex(source) {
    return findIndex(this.props.sources, ['id', source.id]);
  }

  render() {
    const sources = flatMap(this.props.positions, 'sources');
    return (
      <Fragment>
        {this.props.positions.map(position => (
          <Typography key={position.id} paragraph variant="subheading">
            {position.text}
            {position.sources.map(source => {
              const index = this.findSourceIndex(source);
              return <sup key={source.id}>[{index + 1}]</sup>;
            })}{' '}
            <a href="#" onClick={this.onReadMoreClick}>
              Read more...
            </a>
          </Typography>
        ))}
        <Sources>
          {sources.map(source => {
            const index = this.findSourceIndex(source);
            return (
              <Source
                key={source.id}
                title={source.url}
                href={prependHttp(source.url)}
                target="_blank"
                label={`${index + 1}. ${cropUrl(source.url, 12)}`}
              />
            );
          })}
        </Sources>
      </Fragment>
    );
  }
}

export default MainContent;
