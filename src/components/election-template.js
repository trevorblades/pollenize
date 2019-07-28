import ElectionMenu from './election-menu';
import HeaderBase from './header-base';
import Layout from './layout';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {Avatar, ButtonBase, Grid, Typography} from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {LanguageContext} from '../utils/language';
import {Link, graphql} from 'gatsby';
import {cover, size} from 'polished';
import {getParty} from '../utils';
import {makeStyles, styled, useTheme} from '@material-ui/styles';

const Wrapper = styled('div')({
  ...cover(),
  display: 'flex',
  flexDirection: 'column'
});

const StyledGrid = styled(Grid)({
  flexGrow: 1
});

const useStyles = makeStyles(theme => ({
  button: {
    ...size('100%'),
    flexDirection: 'column'
  },
  avatar: {
    ...size(96),
    marginBottom: theme.spacing(2)
  }
}));

export default function ElectionTemplate(props) {
  const {button, avatar} = useStyles();
  const {palette} = useTheme();
  const [language] = useContext(LanguageContext);
  const {slug, title, partyFirst, candidates} = props.data.pollenize.election;
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Wrapper>
        <HeaderBase link="/elections" title={title}>
          <ElectionMenu />
        </HeaderBase>
        <StyledGrid container>
          {candidates.map(candidate => {
            const party = getParty(candidate, language);
            const [title, subtitle] = partyFirst
              ? [party, candidate.name]
              : [candidate.name, party];

            return (
              <Grid
                item
                xs={
                  12 /
                  (candidates.length > 3
                    ? Math.ceil(candidates.length / 2)
                    : candidates.length)
                }
                key={candidate.id}
              >
                <ButtonBase
                  className={button}
                  component={Link}
                  to={`/elections/${slug}/${candidate.slug}`}
                  style={{
                    backgroundColor: candidate.color,
                    color: palette.getContrastText(candidate.color)
                  }}
                >
                  <Avatar className={avatar} src={candidate.portrait} />
                  <Typography variant="h5">{title}</Typography>
                  <Typography variant="subtitle2">{subtitle}</Typography>
                </ButtonBase>
              </Grid>
            );
          })}
        </StyledGrid>
      </Wrapper>
    </Layout>
  );
}

ElectionTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query ElectionQuery($id: ID!) {
    pollenize {
      election(id: $id) {
        slug
        title
        partyFirst
        candidates {
          id
          slug
          name
          color
          portrait
          partyEn
          partyFr
        }
      }
    }
  }
`;