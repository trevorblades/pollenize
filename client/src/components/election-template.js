import ElectionMenu from './election-menu';
import HeaderBase from './header-base';
import Layout from './layout';
import PropTypes from 'prop-types';
import React from 'react';
import SEO from './seo';
import {
  Avatar,
  Box,
  Grid,
  Typography,
  makeStyles,
  useTheme
} from '@material-ui/core';
import {CardActionArea} from 'gatsby-theme-material-ui';
import {FaRegComments} from 'react-icons/fa';
import {LanguageProvider, useLanguage} from '../utils/language';
import {StarsProvider} from '../utils/stars';
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

function TopicExplorer() {
  const {localize} = useLanguage();
  const {avatar} = useStyles();
  return (
    <>
      <Box className={avatar} bgcolor="grey.300" borderRadius="50%">
        <Box component={FaRegComments} size={32} my={4} />
      </Box>
      <Typography gutterBottom variant="h5">
        {localize('Topic explorer')}
      </Typography>
      <Typography>
        {localize("View candidates' main stances organized by topic")}
      </Typography>
    </>
  );
}

export default function ElectionTemplate(props) {
  const {button, avatar, grid} = useStyles();
  const {palette} = useTheme();

  const {slug, title, intro, partyFirst, candidates} =
    props.data.pollenize.election;
  const {lang, languages} = props.pageContext;

  const numCandidates = candidates.length;
  const gridItemProps = {
    sm: 6,
    md: 12 / (numCandidates > 3 ? Math.ceil(numCandidates / 2) : numCandidates)
  };

  return (
    <Layout>
      <SEO title={title} lang={lang} />
      <StarsProvider>
        <LanguageProvider lang={lang} languages={languages} path={props.path}>
          <Box
            position="absolute"
            top={0}
            left={0}
            bottom={0}
            right={0}
            display="flex"
            flexDirection="column"
            bgcolor="grey.200"
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
                  <Grid item xs={12} {...gridItemProps} key={candidate.id}>
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
              {numCandidates > 3 && numCandidates % 2 > 0 && (
                <Grid item {...gridItemProps}>
                  <CardActionArea
                    className={button}
                    to={`${props.path}/topics`}
                  >
                    <TopicExplorer />
                  </CardActionArea>
                </Grid>
              )}
            </Grid>
          </Box>
        </LanguageProvider>
      </StarsProvider>
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
