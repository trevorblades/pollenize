import PropTypes from 'prop-types';
import React from 'react';
import ScrollableAnchor from 'react-scrollable-anchor';
import Section from '../../../components/section';
import Typography from '@material-ui/core/Typography';
import styled from 'react-emotion';
import theme from '../../../theme';
import {connect} from 'react-redux';
import {footerClassName} from '../../../components/footer';
import {getLocalize} from '../../../selectors';

const Container = styled.section(footerClassName, {
  borderBottom: `1px solid ${theme.palette.grey[200]}`
});

const Sources = styled.ol({
  margin: 0,
  padding: 0,
  listStyle: 'inside decimal',
  [theme.breakpoints.up('md')]: {
    columnCount: 2,
    columnGap: theme.spacing.unit * 2
  },
  [theme.breakpoints.up('lg')]: {
    columnCount: 3
  }
});

const Source = styled(Typography)({
  display: 'list-item',
  wordBreak: 'break-word'
});

const Footnotes = props => (
  <ScrollableAnchor id="sources">
    <Container>
      <Section centered>
        <Typography gutterBottom variant="display1" color="inherit">
          {props.localize('Sources')}
        </Typography>
        <Sources>
          {props.sources.map(source => (
            <Source key={source.id} color="inherit" gutterBottom component="li">
              <a href={source.url} rel="noopener noreferrer" target="_blank">
                {source.url}
              </a>
            </Source>
          ))}
        </Sources>
      </Section>
    </Container>
  </ScrollableAnchor>
);

Footnotes.propTypes = {
  localize: PropTypes.func.isRequired,
  sources: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  localize: getLocalize(state)
});

export default connect(mapStateToProps)(Footnotes);
