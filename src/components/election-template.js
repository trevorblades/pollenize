import ElectionMenu from './election-menu';
import HeaderBase from './header-base';
import Layout from './layout';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Avatar,
  Box,
  Grid,
  Typography,
  makeStyles,
  useTheme
} from '@material-ui/core';
import {CardActionArea} from 'gatsby-theme-material-ui';
import {Helmet} from 'react-helmet';
import {LanguageProvider} from '../utils/language';
import {graphql} from 'gatsby';
import {size} from 'polished';

const useStyles = makeStyles(theme => ({
  grid: {
    flexGrow: 1
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(3),
    textAlign: 'center'
  },
  avatar: {
    ...size(96),
    marginBottom: theme.spacing(2)
  }
}));

export default function ElectionTemplate(props) {
  const {button, avatar, grid} = useStyles();
  const {palette} = useTheme();

  const {
    slug,
    title,
    intro,
    partyFirst,
    candidates
  } = props.data.pollenize.election;
  const {lang, languages} = props.pageContext;

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{title}</title>
      </Helmet>
      <LanguageProvider lang={lang} languages={languages} path={props.path}>
        <Box
          position="absolute"
          top={0}
          left={0}
          bottom={0}
          right={0}
          display="flex"
          flexDirection="column"
          bgcolor="grey.900"
        >
          <HeaderBase link="/elections" title={title}>
            <ElectionMenu
              title={title}
              electionSlug={slug}
              candidates={candidates}
              partyFirst={partyFirst}
              intro={intro}
              active="grid"
            />
          </HeaderBase>
          <Grid container className={grid}>
            {candidates.map(candidate => {
              const [title, subtitle] = partyFirst
                ? [candidate.party, candidate.name]
                : [candidate.name, candidate.party];

              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={
                    12 /
                    (candidates.length > 3
                      ? Math.ceil(candidates.length / 2)
                      : candidates.length)
                  }
                  key={candidate.id}
                >
                  <CardActionArea
                    className={button}
                    to={`${props.path}/${candidate.slug}`}
                    style={{
                      backgroundColor: candidate.color,
                      color: palette.getContrastText(candidate.color)
                    }}
                  >
                    <Avatar className={avatar} src={candidate.portrait} />
                    <Typography variant="h5">{title}</Typography>
                    <Typography variant="subtitle1">{subtitle}</Typography>
                  </CardActionArea>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </LanguageProvider>
    </Layout>
  );
}

ElectionTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired
};

export const pageQuery = graphql`
  query ElectionQuery($id: ID!, $languageId: ID!) {
    pollenize {
      election(id: $id) {
        slug
        title
        intro(languageId: $languageId)
        partyFirst
        candidates(active: true) {
          id
          slug
          name
          party(languageId: $languageId)
          color
          portrait
        }
      }
    }
  }
`;
