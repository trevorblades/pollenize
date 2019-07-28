import PropTypes from 'prop-types';
import React, {useContext, useState} from 'react';
import {Box, Button, Divider, IconButton, Typography} from '@material-ui/core';
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
    <div id={props.topic.slug}>
      {props.topic.image ? (
        <Box
          py={15}
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
      <Box py={7} pr={8}>
        {!props.topic.image && (
          <Typography gutterBottom variant="h4">
            {props.topic.titleEn}
          </Typography>
        )}
        {props.stances.slice(0, expanded ? undefined : 1).map(stance => (
          <Typography key={stance.id} paragraph>
            {localize(stance.textEn, stance.textFr, language)}
          </Typography>
        ))}
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
              : `${localize('See more', 'Voir plus', language)} (${props.stances
                  .length - 1})`}
          </Button>
        )}
      </Box>
    </div>
  );
}

TopicSection.propTypes = {
  topic: PropTypes.object.isRequired,
  stances: PropTypes.array.isRequired
};
