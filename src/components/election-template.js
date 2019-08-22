import ElectionMenu from './election-menu';
import HeaderBase from './header-base';
import Layout from './layout';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Avatar,
  Grid,
  Typography,
  makeStyles,
  styled,
  useTheme
} from '@material-ui/core';
import {CardActionArea} from 'gatsby-theme-material-ui';
import {Helmet} from 'react-helmet';
import {LanguageProvider} from '../utils/language';
import {cover, size} from 'polished';
import {graphql} from 'gatsby';

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
  const {button, avatar} = useStyles();
  const {palette} = useTheme();

  const {
    slug,
    title,
    intro,
    partyFirst,
    candidates
  } = props.data.pollenize.election;
  const {id, lang, languages} = props.pageContext;

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{title}</title>
      </Helmet>
      <LanguageProvider lang={lang} languages={languages} path={props.path}>
        <Wrapper>
          <HeaderBase link="/elections" title={title}>
            <ElectionMenu
              title={title}
              electionId={id}
              electionSlug={slug}
              candidates={candidates}
              partyFirst={partyFirst}
              intro={intro}
              active="grid"
            />
          </HeaderBase>
          <StyledGrid container>
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
          </StyledGrid>
        </Wrapper>
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
  query ElectionQuery($id: ID!, $lang: String!) {
    pollenize {
      election(id: $id) {
        slug
        title
        intro(lang: $lang)
        partyFirst
        candidates(active: true) {
          id
          slug
          name
          party(lang: $lang)
          color
          portrait
        }
      }
    }
  }
`;
