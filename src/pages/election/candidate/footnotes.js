import PropTypes from 'prop-types';
import React from 'react';
import Section from '../../../components/section';
import Typography from '@material-ui/core/Typography';
import styled from 'react-emotion';
import theme from '../../../theme';
import withProps from 'recompose/withProps';

const Container = styled.section({
  color: theme.palette.grey[500],
  backgroundColor: theme.palette.grey[100]
});

const InnerContainer = withProps({
  small: true,
  centered: true
})(Section);

const Sources = styled.ol({
  margin: 0,
  padding: 0,
  listStyle: 'inside decimal',
  columnCount: 2,
  columnGap: theme.spacing.unit * 2
});

const Source = withProps({
  color: 'inherit',
  gutterBottom: true,
  component: 'li'
})(
  styled(Typography)({
    display: 'list-item',
    wordBreak: 'break-word'
  })
);

const Footnotes = props => (
  <Container>
    <InnerContainer>
      <Typography gutterBottom variant="display1" color="inherit">
        Sources
      </Typography>
      <Sources>
        {props.sources.map(source => (
          <Source key={source.id}>
            <a href={source.url} rel="noopener noreferrer" target="_blank">
              {source.url}
            </a>
          </Source>
        ))}
      </Sources>
    </InnerContainer>
  </Container>
);

Footnotes.propTypes = {
  sources: PropTypes.array.isRequired
};

export default Footnotes;
