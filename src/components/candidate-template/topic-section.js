import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import TopicWrapper from '../topic-wrapper';
import useToggle from 'react-use/lib/useToggle';
import {
  Button,
  IconButton,
  Link as MuiLink,
  Typography
} from '@material-ui/core';
import {FaRegStar, FaStar} from 'react-icons/fa';
import {FiLink} from 'react-icons/fi';
import {localize} from '../../utils';

export default function TopicSection(props) {
  const [expanded, toggleExpanded] = useToggle(false);
  return (
    <TopicWrapper topic={props.topic} language={props.language}>
      {props.stances ? (
        <Fragment>
          {props.stances.slice(0, expanded ? undefined : 1).map(stance => (
            <Typography key={stance.id} paragraph>
              {localize(stance.textEn, stance.textFr, props.language)}
              {stance.sources.map(source => {
                const number = props.sources.indexOf(source.url) + 1;
                return (
                  <sup key={source.id}>
                    [
                    <MuiLink
                      color="inherit"
                      href={`#source-${number}`}
                      onClick={props.onSourceClick}
                    >
                      {number}
                    </MuiLink>
                    ]
                  </sup>
                );
              })}
            </Typography>
          ))}
          <IconButton
            onClick={props.onStarClick}
            color="inherit"
            style={{
              marginLeft: -8,
              marginRight: 8
            }}
          >
            {props.starred ? <FaStar /> : <FaRegStar />}
          </IconButton>
          <IconButton
            component="a"
            href={`#${props.topic.slug}`}
            style={{marginRight: 8}}
            color="inherit"
          >
            <FiLink />
          </IconButton>
          {props.stances.length > 1 && (
            <Button onClick={toggleExpanded}>
              {expanded
                ? localize('Show less', 'Montre moins', props.language)
                : `${localize(
                    'Show more',
                    'Montre plus',
                    props.language
                  )} (${props.stances.length - 1})`}
            </Button>
          )}
        </Fragment>
      ) : (
        <Typography paragraph>
          {localize(
            'No official stance has been taken on this topic.',
            "Aucune position officielle n'a été prise sur ce sujet.",
            props.language
          )}
        </Typography>
      )}
    </TopicWrapper>
  );
}

TopicSection.propTypes = {
  topic: PropTypes.object.isRequired,
  onStarClick: PropTypes.func.isRequired,
  starred: PropTypes.bool.isRequired,
  sources: PropTypes.array.isRequired,
  onSourceClick: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  stances: PropTypes.array
};
