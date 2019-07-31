import PropTypes from 'prop-types';
import React, {Fragment, useContext, useState} from 'react';
import {Box, Button, Divider, IconButton, Typography} from '@material-ui/core';
import {ContentBox, PageAnchor} from '../common';
import {FaRegStar} from 'react-icons/fa';
import {LanguageContext} from '../../utils/language';
import {localize} from '../../utils';

export default function TopicSection(props) {
  const [language] = useContext(LanguageContext);
  const [expanded, setExpanded] = useState(false);

  function handleMoreClick() {
    setExpanded(prevExpanded => !prevExpanded);
  }

  return (
    <Fragment>
      <PageAnchor name={props.topic.slug} />
      {props.topic.image ? (
        <Box
          py={{
            xs: 12,
            lg: 15
          }}
          display="flex"
          justifyContent="center"
          style={{
            backgroundImage: `url(${props.topic.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <Box bgcolor="background.paper" py={1} px={2}>
            <Typography variant="h4">{props.topic.titleEn}</Typography>
          </Box>
        </Box>
      ) : (
        <Divider />
      )}
      <ContentBox>
        {!props.topic.image && (
          <Typography gutterBottom variant="h4">
            {props.topic.titleEn}
          </Typography>
        )}
        {props.stances ? (
          <Fragment>
            {props.stances.slice(0, expanded ? undefined : 1).map(stance => (
              <Typography key={stance.id} paragraph>
                {localize(stance.textEn, stance.textFr, language)}
              </Typography>
            ))}
            {/* TODO: wire up stars */}
            <IconButton
              color="inherit"
              style={{
                marginLeft: -8,
                marginRight: 8
              }}
            >
              <FaRegStar />
            </IconButton>
            {props.stances.length > 1 && (
              <Button onClick={handleMoreClick}>
                {expanded
                  ? localize('Show less', 'Montre moins', language)
                  : `${localize('Show more', 'Montre plus', language)} (${props
                      .stances.length - 1})`}
              </Button>
            )}
          </Fragment>
        ) : (
          <Typography paragraph>
            {localize(
              'No official stance has been taken on this topic.',
              "Aucune position officielle n'a été prise sur ce sujet.",
              language
            )}
          </Typography>
        )}
      </ContentBox>
    </Fragment>
  );
}

TopicSection.propTypes = {
  topic: PropTypes.object.isRequired,
  stances: PropTypes.array
};
