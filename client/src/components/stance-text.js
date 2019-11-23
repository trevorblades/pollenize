import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {Link} from '@material-ui/core';

export default function StanceText(props) {
  return (
    <Fragment>
      {props.stance.text}
      {props.stance.sources.map(source => {
        const number = props.sources.indexOf(source.url) + 1;
        return (
          <sup key={source.id}>
            [
            <Link
              color="inherit"
              href={`#source-${number}`}
              onClick={props.onSourceClick}
            >
              {number}
            </Link>
            ]
          </sup>
        );
      })}
    </Fragment>
  );
}

StanceText.propTypes = {
  stance: PropTypes.object.isRequired,
  sources: PropTypes.array.isRequired,
  onSourceClick: PropTypes.func.isRequired
};
