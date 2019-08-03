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
import {localize} from '../utils';
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
    flexDirection: 'column',
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
  const [language] = useContext(LanguageContext);
  const {slug, title, partyFirst, candidates} = props.data.pollenize.election;
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Wrapper>
        <HeaderBase link="/elections" title={title}>
          <ElectionMenu
            title={title}
            slug={slug}
            candidates={candidates}
            partyFirst={partyFirst}
            language={language}
          />
        </HeaderBase>
        <StyledGrid container>
          {candidates.map(candidate => {
            const party = localize(
              candidate.partyEn,
              candidate.partyFr,
              language
            );

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
                  <Typography variant="subtitle1">{subtitle}</Typography>
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
