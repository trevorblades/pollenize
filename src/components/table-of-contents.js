import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {Box, Link as MuiLink, Typography} from '@material-ui/core';
import {HEADER_HEIGHT} from './header-base';
import {LanguageContext} from '../utils/language';
import {localize} from '../utils';

export function SidebarLink(props) {
  return (
    <Typography paragraph variant="body2">
      <MuiLink {...props} color="inherit" />
    </Typography>
  );
}

export default function TableOfContents(props) {
  const [language] = useContext(LanguageContext);
  return (
    <Box
      component="aside"
      position="sticky"
      top={HEADER_HEIGHT}
      display={{
        xs: 'none',
        md: 'block'
      }}
      mt={{
        md: 3,
        lg: 5
      }}
      pt={2}
      pl={{
        md: 5,
        lg: 8
      }}
      pr={3}
      pb={{
        md: 4,
        lg: 6
      }}
    >
      <Typography paragraph variant="overline" noWrap>
        {localize('Table of contents', 'Table des matières', language)}
      </Typography>
      {props.children}
      {props.topics.map(topic => (
        <SidebarLink key={topic.id} href={`#${topic.slug}`}>
          {localize(topic.titleEn, topic.titleFr, language)}
        </SidebarLink>
      ))}
    </Box>
  );
}

TableOfContents.propTypes = {
  children: PropTypes.node,
  topics: PropTypes.array.isRequired
};
